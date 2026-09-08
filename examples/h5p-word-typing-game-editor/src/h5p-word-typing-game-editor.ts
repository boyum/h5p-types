import type {
  H5PFieldGroup,
  H5PForm,
  H5PSetValue,
  IH5PWidget,
} from "h5p-types";
import { H5PWidget, registerWidget } from "h5p-utils";
import type { Language } from "h5p-word-typing-game-words";
import { wordListSizes } from "h5p-word-typing-game-words";
import library from "../library.json";
import { ensureEditorStyles } from "./style.js";

type Field = H5PFieldGroup;

type Params = {
  language: Language;
  customWords?: string | undefined;
};

const LANGUAGE_OPTIONS: Array<{ value: Language; label: string }> = [
  { value: "en", label: "English" },
  { value: "nb", label: "Norwegian bokmål" },
];

const DEFAULT_PARAMS: Params = {
  language: "en",
  customWords: "",
};

export class WordTypingGameEditor
  extends H5PWidget<Field, Params>
  implements IH5PWidget
{
  private readonly select: HTMLSelectElement;
  private readonly textarea: HTMLTextAreaElement;
  private readonly infoElement: HTMLElement;

  constructor(
    parent: H5PForm<Params>,
    field: Field,
    params: Params | undefined,
    setValue: H5PSetValue<Params>,
  ) {
    super(parent, field, params, setValue);
    ensureEditorStyles();

    this.wrapper.classList.add("h5p-word-typing-game-editor");

    const currentParams: Params = params ?? DEFAULT_PARAMS;

    this.select = document.createElement("select");
    this.select.classList.add("h5p-word-typing-game-editor__select");
    this.select.setAttribute("aria-label", "Language");

    for (const option of LANGUAGE_OPTIONS) {
      const optionElement = document.createElement("option");
      optionElement.value = option.value;
      optionElement.textContent = option.label;
      this.select.appendChild(optionElement);
    }

    this.select.value = currentParams.language;

    this.infoElement = document.createElement("div");
    this.infoElement.classList.add("h5p-word-typing-game-editor__info");

    this.textarea = document.createElement("textarea");
    this.textarea.classList.add("h5p-word-typing-game-editor__textarea");
    this.textarea.placeholder = ["apple", "tree", "waterfall"].join("\n");
    this.textarea.setAttribute("aria-label", "Custom words");
    this.textarea.value = currentParams.customWords ?? "";

    const hint = document.createElement("div");
    hint.classList.add("h5p-word-typing-game-editor__info");
    hint.textContent =
      "If left empty, the prefilled word list for the chosen language is used.";

    this.wrapper.append(this.select, this.infoElement, this.textarea, hint);

    this.select.addEventListener("change", () => {
      this.store();
      this.updateInfo();
    });

    this.textarea.addEventListener("change", () => {
      this.store();
    });

    this.updateInfo();
  }

  override appendTo($container: JQuery<HTMLElement>): void {
    const containerElement = $container.get(0);
    if (!containerElement) {
      console.error(
        "Found no containing element to attach `h5p-word-typing-game-editor` to.",
      );
      return;
    }

    containerElement.appendChild(this.wrapper);
  }

  override validate(): boolean {
    return true;
  }

  override remove(): void {
    this.wrapper.remove();
  }

  private store(): void {
    const language = this.select.value as Language;
    const customWords = this.textarea.value;
    this.setValue(this.field, {
      language,
      customWords: customWords.length > 0 ? customWords : undefined,
    });
  }

  private updateInfo(): void {
    const language = this.select.value as Language;
    const count = wordListSizes[language];
    const languageLabel = LANGUAGE_OPTIONS.find(
      (option) => option.value === language,
    )?.label;
    this.infoElement.textContent = `${count.toLocaleString()} prefilled ${languageLabel} words available.`;
  }
}

const widgetName = library.machineName.replace("H5P.", "");
registerWidget("wordTypingGameEditor", widgetName, WordTypingGameEditor);
