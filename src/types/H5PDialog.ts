export declare class H5PDialog {
  /**
   * @param name Used for the Dialog's HTML class
   * @param title Inserted as the title in the Dialog
   * @param content HTML content in the Dialog
   * @param $element Which element to insert the Dialog _after_
   */
  constructor(
    name: string,
    title: string,
    content: string,
    $element: JQuery<HTMLElement>
  );

  /**
   * @param scrollbar
   */
  open(scrollbar: boolean): void;

  close(): void;
}
