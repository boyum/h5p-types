export interface IH5PWidget {
  // TODO: Add constructor interface
  appendTo($container: JQuery<HTMLElement>): void;
  validate(): boolean;
  remove(): void;
}
