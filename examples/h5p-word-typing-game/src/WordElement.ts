export class WordElement {
  readonly element: HTMLElement;
  private readonly typedPartElement: HTMLElement;
  private readonly untypedPartElement: HTMLElement;

  constructor(
    public text: string,
    public typed = "",
    public x = 0,
    public y = 0,
  ) {
    this.element = document.createElement("div");
    this.element.classList.add("h5p-word-typing-game__falling-word");

    this.typedPartElement = document.createElement("span");
    this.typedPartElement.classList.add("typed-part");

    this.untypedPartElement = document.createElement("span");
    this.untypedPartElement.classList.add("untyped-part");

    this.element.append(this.typedPartElement, this.untypedPartElement);

    this.render();
    this.transform();
  }

  moveTo(x: number, y: number): void {
    this.x = x;
    this.y = y;
    this.transform();
  }

  setTyped(typed: string): void {
    this.typed = typed;
    this.render();
  }

  addClass(className: string): void {
    this.element.classList.add(className);
  }

  remove(): void {
    this.element.remove();
  }

  get width(): number {
    return this.element.offsetWidth;
  }

  get height(): number {
    return this.element.offsetHeight;
  }

  private render(): void {
    this.typedPartElement.textContent = this.typed;
    this.untypedPartElement.textContent = this.text.slice(this.typed.length);
  }

  private transform(): void {
    this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
  }
}
