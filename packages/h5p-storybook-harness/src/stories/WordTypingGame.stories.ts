import type { Meta, StoryObj } from "@storybook/html-vite";
import type { H5PExtras } from "h5p-types";
import type { Language } from "h5p-word-typing-game-words";
import {
  DEFAULT_STATE,
  WordTypingGame,
} from "../../../../examples/h5p-word-typing-game/src/h5p-word-typing-game.js";
import type {
  Params,
  State,
} from "../../../../examples/h5p-word-typing-game/src/types.js";
import { renderContentType } from "../index.js";

type StoryArgs = {
  language: Language;
  customWords: string;
  fallSpeed: number;
  spawnInterval: number;
  maxWordsOnScreen: number;
  maxMisses: number;
};

function createParams(args: StoryArgs): Params {
  const customWords = args.customWords.trim();
  return {
    words: {
      language: args.language,
      ...(customWords.length > 0
        ? { customWords }
        : { customWords: undefined }),
    },
    behaviour: {
      fallSpeed: args.fallSpeed,
      spawnInterval: args.spawnInterval,
      maxWordsOnScreen: args.maxWordsOnScreen,
      maxMisses: args.maxMisses,
      increaseDifficulty: true,
    },
    l10n: {
      instructionText: "Type the falling words before they reach the bottom!",
      startButton: "Start",
      restartButton: "Restart",
      scoreLabel: "Score",
      missedLabel: "Missed",
      gameOverTitle: "Game over",
      gameOverDescription: "You missed @missed word(s).",
      finalScoreDescription: "Your final score: @score",
    },
  };
}

const meta = {
  title: "Examples/Word Typing Game",
  tags: ["autodocs"],
  render: (args: StoryArgs) => {
    const { container } = renderContentType(WordTypingGame, {
      params: createParams(args),
    });
    return container;
  },
  argTypes: {
    language: {
      control: "select",
      options: ["en", "nb"],
    },
    customWords: {
      control: "text",
      description: "One word per line. Leave empty to use the word list.",
    },
    fallSpeed: { control: { type: "range", min: 10, max: 500, step: 10 } },
    spawnInterval: {
      control: { type: "range", min: 500, max: 10000, step: 100 },
    },
    maxWordsOnScreen: {
      control: { type: "range", min: 1, max: 15, step: 1 },
    },
    maxMisses: {
      control: { type: "range", min: 0, max: 10, step: 1 },
      description: "Set to 0 for endless play.",
    },
  },
  args: {
    language: "en",
    customWords: "",
    fallSpeed: 60,
    spawnInterval: 2000,
    maxWordsOnScreen: 6,
    maxMisses: 3,
  },
} satisfies Meta<StoryArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

type PlayArgs = {
  canvasElement: HTMLElement;
};

function startGame(container: HTMLElement): void {
  const startButton = container.querySelector(".h5p-word-typing-game__button");
  if (startButton instanceof HTMLButtonElement) {
    startButton.click();
  }
}

export const Default: Story = {
  play: async ({ canvasElement }: PlayArgs) => {
    startGame(canvasElement);
  },
};

export const Endless: Story = {
  args: {
    maxMisses: 0,
  },
  play: async ({ canvasElement }: PlayArgs) => {
    startGame(canvasElement);
  },
};

export const CustomWords: Story = {
  args: {
    customWords: "apple\ntree\nwaterfall\ncat\nbear\nelephant\nzebra",
    fallSpeed: 40,
  },
  play: async ({ canvasElement }: PlayArgs) => {
    startGame(canvasElement);
  },
};

export const GameOverQuick: Story = {
  args: {
    fallSpeed: 500,
    maxWordsOnScreen: 1,
    maxMisses: 1,
  },
  play: async ({ canvasElement }: PlayArgs) => {
    startGame(canvasElement);
  },
};

const readsPreviousState: State = {
  ...DEFAULT_STATE,
  score: 12,
  missed: 1,
  difficulty: 1.2,
  words: [
    { text: "waterfall", typed: "wate", x: 20, y: 160 },
    { text: "river", typed: "", x: 300, y: 80 },
  ],
};

export const RestoredSession: Story = {
  args: {
    maxMisses: 3,
  },
  render: (args: StoryArgs) => {
    const extras = {
      previousState: readsPreviousState,
    } as unknown as H5PExtras;
    const { container } = renderContentType(WordTypingGame, {
      params: createParams(args),
      extras,
    });
    return container;
  },
  play: async ({ canvasElement }: PlayArgs) => {
    startGame(canvasElement);
  },
};
