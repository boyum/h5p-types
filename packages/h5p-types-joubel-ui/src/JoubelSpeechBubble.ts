export declare class JoubelSpeechBubble {
  /**
   * @param $container The speaking object
   * @param text The text to display
   * @param maxWidth The maximum width of the bubble. Default: 400
   */
  constructor($container: JQuery<HTMLElement>, text: string, maxWidth?: number);

  isCurrent(): boolean;

  remove(): void;
}
