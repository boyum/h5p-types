import { getWords } from "h5p-word-typing-game-words";
import { ensureGameStyles } from "./style.js";
import type { ActiveWordSerializable, Params, State } from "./types.js";
import { WordElement } from "./WordElement.js";

type GameOptions = {
  params: Params;
  previousState?: State | undefined;
  onGameOver?: (score: number) => void;
  onStatsChange?: (stats: { score: number; missed: number }) => void;
};

type ActiveWord = {
  text: string;
  x: number;
  y: number;
  element: WordElement;
};

const INITIAL_WORDS = 3;
const DIFFICULTY_GAIN_PER_LETTER = 0.005;
const DIFFICULTY_SPEED_FACTOR = 0.1;
const LETTER_PATTERN = /[\p{L}\p{N}]/u;

function parseCustomWords(customWords: string | undefined): Array<string> {
  if (!customWords) {
    return [];
  }

  const seen = new Set<string>();
  const words: Array<string> = [];

  for (const raw of customWords.split(/[\n,]/)) {
    const word = raw.trim().toLowerCase();
    if (word.length === 0 || seen.has(word)) {
      continue;
    }
    seen.add(word);
    words.push(word);
  }

  return words;
}

export class Game {
  private readonly playArea: HTMLElement;
  private readonly input: HTMLInputElement;
  private readonly overlay: HTMLElement;
  private readonly overlayTitle: HTMLElement;
  private readonly overlayDescription: HTMLElement;
  private readonly scoreElement: HTMLElement;
  private readonly missedElement: HTMLElement;
  private readonly startButton: HTMLButtonElement;
  private readonly restartButton: HTMLButtonElement;

  private readonly wordPool: Array<string>;
  private readonly defaultFallSpeed: number;
  private readonly defaultSpawnInterval: number;
  private readonly maxWordsOnScreen: number;
  private readonly maxMisses: number;
  private readonly increaseDifficulty: boolean;
  private readonly l10n: Params["l10n"];
  private readonly onGameOver: ((score: number) => void) | undefined;
  private readonly onStatsChange:
    | ((stats: { score: number; missed: number }) => void)
    | undefined;

  private pendingRestore: State | undefined;
  private words: Array<ActiveWord> = [];
  private typedBuffer = "";
  private isRunning = false;
  private score = 0;
  private missed = 0;
  private difficulty = 1;
  private bestScore = 0;
  private lastFrameTime = 0;
  private spawnTimer = 0;
  private rafId: number | null = null;

  constructor(
    private readonly host: HTMLElement,
    options: GameOptions,
  ) {
    ensureGameStyles();

    const { params } = options;
    this.pendingRestore = options.previousState;
    this.onGameOver = options.onGameOver;
    this.onStatsChange = options.onStatsChange;
    this.l10n = params.l10n;
    this.defaultFallSpeed = params.behaviour.fallSpeed;
    this.defaultSpawnInterval = params.behaviour.spawnInterval;
    this.maxWordsOnScreen = params.behaviour.maxWordsOnScreen;
    this.maxMisses = params.behaviour.maxMisses;
    this.increaseDifficulty = params.behaviour.increaseDifficulty;

    const customWords = parseCustomWords(params.words.customWords);
    this.wordPool =
      customWords.length > 0 ? customWords : getWords(params.words.language);

    host.classList.add("h5p-word-typing-game");

    this.playArea = document.createElement("div");
    this.playArea.classList.add("h5p-word-typing-game__play-area");
    this.playArea.addEventListener("pointerdown", () => {
      if (this.isRunning) {
        this.input.focus();
      }
    });
    host.appendChild(this.playArea);

    this.input = document.createElement("input");
    this.input.type = "text";
    this.input.classList.add("h5p-word-typing-game__input");
    this.input.setAttribute("autocomplete", "off");
    this.input.setAttribute("autocapitalize", "off");
    this.input.setAttribute("autocorrect", "off");
    this.input.setAttribute("spellcheck", "false");
    this.input.setAttribute("aria-label", this.l10n.instructionText);
    host.appendChild(this.input);

    const hud = document.createElement("div");
    hud.classList.add("h5p-word-typing-game__hud");
    const scoreContainer = document.createElement("span");
    this.scoreElement = document.createElement("span");
    this.scoreElement.classList.add("h5p-word-typing-game__hud-value");
    scoreContainer.append(`${this.l10n.scoreLabel}: `, this.scoreElement);
    const missedContainer = document.createElement("span");
    this.missedElement = document.createElement("span");
    this.missedElement.classList.add("h5p-word-typing-game__hud-value");
    missedContainer.append(`${this.l10n.missedLabel}: `, this.missedElement);
    hud.append(scoreContainer, missedContainer);
    host.appendChild(hud);

    this.overlay = document.createElement("div");
    this.overlay.classList.add("h5p-word-typing-game__overlay");

    this.overlayTitle = document.createElement("h2");
    this.overlayTitle.classList.add("h5p-word-typing-game__overlay-title");
    this.overlayTitle.textContent = this.l10n.instructionText;
    this.overlay.appendChild(this.overlayTitle);

    this.overlayDescription = document.createElement("p");
    this.overlayDescription.classList.add("h5p-word-typing-game__instruction");
    this.overlay.appendChild(this.overlayDescription);

    this.startButton = this.createButton(this.l10n.startButton, () =>
      this.beginRun(),
    );
    this.overlay.appendChild(this.startButton);

    this.restartButton = this.createButton(this.l10n.restartButton, () =>
      this.beginRun(),
    );
    this.restartButton.hidden = true;
    this.overlay.appendChild(this.restartButton);

    host.appendChild(this.overlay);

    window.addEventListener("keydown", this.onKeyDown);
  }

  start(): void {
    this.beginRun();
  }

  getCurrentState(): State {
    return {
      score: this.score,
      missed: this.missed,
      difficulty: this.difficulty,
      bestScore: this.bestScore,
      isRunning: this.isRunning,
      words: this.words.map(
        (active): ActiveWordSerializable => ({
          text: active.text,
          typed: active.element.typed,
          x: active.x,
          y: active.y,
        }),
      ),
    };
  }

  destroy(): void {
    if (this.rafId !== null) {
      window.cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    window.removeEventListener("keydown", this.onKeyDown);
    this.host.remove();
  }

  private readonly animate = (time: number): void => {
    if (!this.isRunning) {
      return;
    }

    const dt =
      this.lastFrameTime === 0
        ? 0
        : Math.min((time - this.lastFrameTime) / 1000, 0.05);
    this.lastFrameTime = time;

    this.updateWords(dt);
    this.updateSpawning(dt);

    this.rafId = window.requestAnimationFrame(this.animate);
  };

  private readonly onKeyDown = (event: KeyboardEvent): void => {
    if (!this.isRunning) {
      return;
    }

    if (event.key === "Backspace") {
      event.preventDefault();
      this.backspace();
      return;
    }

    if (event.key.length !== 1 || !LETTER_PATTERN.test(event.key)) {
      return;
    }

    event.preventDefault();
    this.typeLetter(event.key.toLowerCase());
  };

  private beginRun(): void {
    this.isRunning = false;
    this.clearWords();
    this.typedBuffer = "";

    const restore = this.pendingRestore;
    this.pendingRestore = undefined;

    if (restore) {
      this.score = restore.score;
      this.missed = restore.missed;
      this.difficulty = restore.difficulty;
      this.bestScore = restore.bestScore;
      this.restoreWords(restore.words);
    } else {
      this.score = 0;
      this.missed = 0;
      this.difficulty = 1;
      this.spawnInitialWords();
    }

    this.emitStats();

    this.overlay.hidden = true;
    this.isRunning = true;
    this.lastFrameTime = 0;
    this.spawnTimer = 0;
    this.rafId = window.requestAnimationFrame(this.animate);
    this.input.focus();
  }

  private restoreWords(words: Array<ActiveWordSerializable>): void {
    for (const serialized of words) {
      const element = new WordElement(
        serialized.text,
        serialized.typed,
        serialized.x,
        serialized.y,
      );
      this.playArea.appendChild(element.element);
      this.words.push({
        text: serialized.text,
        x: serialized.x,
        y: serialized.y,
        element,
      });
    }
  }

  private clearWords(): void {
    this.words.forEach((active) => {
      active.element.remove();
    });
    this.words = [];
  }

  private spawnInitialWords(): void {
    const count = Math.min(INITIAL_WORDS, this.maxWordsOnScreen);
    for (let index = 0; index < count; index++) {
      this.spawnWord();
    }
  }

  private updateWords(dt: number): void {
    if (this.words.length === 0) {
      return;
    }

    const step = this.currentFallSpeed * dt;
    const missedWords: Array<ActiveWord> = [];
    const remaining: Array<ActiveWord> = [];
    const bottom = this.playArea.clientHeight;

    for (const active of this.words) {
      const y = active.y + step;
      active.y = y;
      active.element.moveTo(active.x, y);

      if (y - active.element.height > bottom) {
        missedWords.push(active);
      } else {
        remaining.push(active);
      }
    }

    this.words = remaining;
    for (const active of missedWords) {
      this.onWordMissed(active);
    }
  }

  private updateSpawning(dt: number): void {
    this.spawnTimer += dt * 1000;

    if (
      this.spawnTimer < this.currentSpawnInterval ||
      this.words.length >= this.maxWordsOnScreen
    ) {
      return;
    }

    this.spawnTimer = 0;
    this.spawnWord();
  }

  private spawnWord(): void {
    const text = this.pickNextWord();
    if (!text) {
      return;
    }

    const element = new WordElement(text);
    this.playArea.appendChild(element.element);

    const width = element.width > 0 ? element.width : 80;
    const height = element.height > 0 ? element.height : 24;
    const x = Math.max(
      0,
      Math.random() * Math.max(0, this.playArea.clientWidth - width),
    );
    const y = -height - 8;

    element.moveTo(x, y);
    this.words.push({ text, x, y, element });
  }

  private pickNextWord(): string | undefined {
    if (this.wordPool.length === 0) {
      return undefined;
    }

    const activeTexts = new Set(this.words.map((active) => active.text));
    const candidates = this.wordPool.filter((word) => !activeTexts.has(word));
    const pool = candidates.length > 0 ? candidates : this.wordPool;
    const index = Math.floor(Math.random() * pool.length);
    const word = pool[index];

    return word;
  }

  private onWordMissed(active: ActiveWord): void {
    if (!this.isRunning) {
      return;
    }

    this.missed += 1;
    active.element.addClass("h5p-word-typing-game__falling-word--missed");
    window.setTimeout(() => active.element.remove(), 300);
    this.emitStats();

    if (this.maxMisses > 0 && this.missed >= this.maxMisses) {
      this.endGame();
    }
  }

  private completeWord(active: ActiveWord): void {
    active.element.setTyped(active.text);
    active.element.addClass("h5p-word-typing-game__falling-word--complete");
    window.setTimeout(() => active.element.remove(), 250);

    this.words = this.words.filter((word) => word !== active);
    this.score += active.text.length;

    if (this.increaseDifficulty) {
      this.difficulty += active.text.length * DIFFICULTY_GAIN_PER_LETTER;
    }

    this.emitStats();
  }

  private typeLetter(letter: string): void {
    if (this.words.length === 0) {
      return;
    }

    const nextBuffer = this.typedBuffer + letter;
    const completed = this.words.filter((active) => active.text === nextBuffer);

    if (completed.length > 0) {
      this.typedBuffer = "";
      this.clearTypedIndicators();
      completed.forEach((active) => {
        this.completeWord(active);
      });
      return;
    }

    const matching = this.words.filter((active) =>
      active.text.startsWith(nextBuffer),
    );

    if (matching.length > 0) {
      this.typedBuffer = nextBuffer;
      matching.forEach((active) => {
        active.element.setTyped(nextBuffer);
      });
      return;
    }

    this.typedBuffer = "";
    const startingWithLetter = this.words.filter((active) =>
      active.text.startsWith(letter),
    );

    if (startingWithLetter.length > 0) {
      this.typedBuffer = letter;
      startingWithLetter.forEach((active) => {
        active.element.setTyped(letter);
      });
    } else {
      this.clearTypedIndicators();
    }
  }

  private backspace(): void {
    if (this.typedBuffer.length === 0) {
      return;
    }

    this.typedBuffer = this.typedBuffer.slice(0, -1);
    this.clearTypedIndicators();

    if (this.typedBuffer.length === 0) {
      return;
    }

    const matching = this.words.filter((active) =>
      active.text.startsWith(this.typedBuffer),
    );
    matching.forEach((active) => {
      active.element.setTyped(this.typedBuffer);
    });
  }

  private clearTypedIndicators(): void {
    this.words.forEach((active) => {
      active.element.setTyped("");
    });
  }

  private endGame(): void {
    this.isRunning = false;
    if (this.rafId !== null) {
      window.cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.input.blur();
    this.clearWords();

    if (this.score > this.bestScore) {
      this.bestScore = this.score;
    }

    this.showGameOverOverlay();
    this.onGameOver?.(this.score);
  }

  private showGameOverOverlay(): void {
    const description = this.l10n.gameOverDescription.replace(
      "@missed",
      String(this.missed),
    );
    const finalScore = this.l10n.finalScoreDescription.replace(
      "@score",
      String(this.score),
    );

    this.overlayTitle.textContent = this.l10n.gameOverTitle;
    this.overlayDescription.textContent = `${description} ${finalScore}`;
    this.startButton.hidden = true;
    this.restartButton.hidden = false;
    this.overlay.hidden = false;
  }

  private emitStats(): void {
    this.scoreElement.textContent = String(this.score);
    this.missedElement.textContent = String(this.missed);
    this.onStatsChange?.({ score: this.score, missed: this.missed });
  }

  private createButton(label: string, onClick: () => void): HTMLButtonElement {
    const button = document.createElement("button");
    button.type = "button";
    button.classList.add("h5p-word-typing-game__button");
    button.textContent = label;
    button.addEventListener("click", onClick);
    return button;
  }

  private get currentFallSpeed(): number {
    return (
      this.defaultFallSpeed *
      (1 + (this.difficulty - 1) * DIFFICULTY_SPEED_FACTOR)
    );
  }

  private get currentSpawnInterval(): number {
    return (
      this.defaultSpawnInterval /
      (1 + (this.difficulty - 1) * DIFFICULTY_SPEED_FACTOR)
    );
  }
}
