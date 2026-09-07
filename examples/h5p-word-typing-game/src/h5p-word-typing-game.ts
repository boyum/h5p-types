import type { IH5PContentType } from "h5p-types";
import { H5PResumableContentType, registerContentType } from "h5p-utils";
import library from "../library.json";
import semantics from "../semantics.json";
import { Game } from "./Game.js";
import type { Params, State } from "./types.js";

// Force unplugin-json-dts to generate semantics.json.d.ts
semantics;

export const DEFAULT_STATE: State = {
  score: 0,
  missed: 0,
  difficulty: 1,
  bestScore: 0,
  isRunning: false,
  words: [],
};

export class WordTypingGame
  extends H5PResumableContentType<Params, State>
  implements IH5PContentType
{
  private game: Game | undefined;

  attach($container: JQuery<HTMLElement>): void {
    const containerElement = $container.get(0);
    if (!containerElement) {
      console.error(
        "Found no containing element to attach `h5p-word-typing-game` to.",
      );
      return;
    }

    containerElement.appendChild(this.wrapper);

    this.game = new Game(this.wrapper, {
      params: this.params,
      previousState: this.state,
      onGameOver: (score) => {
        this.trigger("gameOver", { score });
      },
    });
  }

  getCurrentState(): State {
    return this.game?.getCurrentState() ?? this.state ?? DEFAULT_STATE;
  }

  start(): void {
    this.game?.start();
  }
}

const contentTypeName = library.machineName.replace("H5P.", "");
registerContentType(contentTypeName, WordTypingGame);
