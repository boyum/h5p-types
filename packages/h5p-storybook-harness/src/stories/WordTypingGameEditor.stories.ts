import type { Meta, StoryObj } from "@storybook/html-vite";
import semantics from "../../../../examples/h5p-word-typing-game/semantics.json";
import { WordTypingGameEditor } from "../../../../examples/h5p-word-typing-game-editor/src/h5p-word-typing-game-editor.js";
import { renderEditorWidget } from "../index.js";

type StoryArgs = {
  initialLanguage: "en" | "nb";
  initialCustomWords: string;
};

const wordsField = semantics.find((field) => field.name === "words");

if (wordsField === undefined) {
  throw new Error("Could not find the `words` field in the game semantics.");
}

const meta = {
  title: "Examples/Word Typing Game Editor",
  tags: ["autodocs"],
  render: (args: StoryArgs) => {
    const { container, getParams } = renderEditorWidget(WordTypingGameEditor, {
      field: wordsField,
      params: {
        language: args.initialLanguage,
        ...(args.initialCustomWords.length > 0
          ? { customWords: args.initialCustomWords }
          : { customWords: undefined }),
      },
    });

    container.classList.add("h5p-word-typing-game-editor-story");

    const output = document.createElement("pre");
    output.classList.add("h5p-word-typing-game-editor-story__output");
    output.textContent = JSON.stringify(getParams(), null, 2);

    container.append(output);

    container.addEventListener("change", () => {
      output.textContent = JSON.stringify(getParams(), null, 2);
    });

    return container;
  },
  argTypes: {
    initialLanguage: {
      control: "select",
      options: ["en", "nb"],
    },
    initialCustomWords: {
      control: "text",
      description: "One word per line.",
    },
  },
  args: {
    initialLanguage: "en",
    initialCustomWords: "",
  },
} satisfies Meta<StoryArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const EditParams: Story = {};

export const PrefilledCustomWords: Story = {
  args: {
    initialLanguage: "nb",
    initialCustomWords: "eple\ntre\nvann\nkatt\nskog\nfugl",
  },
};
