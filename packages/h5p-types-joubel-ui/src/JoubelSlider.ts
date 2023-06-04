import { EventDispatcher } from "h5p-types";

export declare class JoubelSlider extends EventDispatcher {
  constructor(params?: { class?: string });

  $slides: JQuery<HTMLElement>[];
  currentIndex: number;
  numSlides: number;

  addSlide($slide: JQuery<HTMLElement>): void;

  attach($container: JQuery<HTMLElement>): void;

  move(index: number): void;

  /**
   * Remove slider from DOM
   */
  remove(): void;

  /**
   * Move to next slide. Will not move if already at last slide
   */
  next(): void;

  /**
   * Move to previous slide
   */
  previous(): void;

  /**
   * Move to first slide
   */
  first(): void;

  /**
   * Move to last slide
   */
  last(): void;
}
