import type { H5PEvent } from "./H5PEvent";
import type { XAPIEvent } from "./XAPIEvent";
import type { XAPIVerb } from "./XAPIVerb";

export declare class EventDispatcher {
  /**
   * Add new event listener.
   *
   * @throws {TypeError}
   *   listener must be a function
   * @param type
   *   Event type
   * @param listener
   *   Event listener
   * @param [thisArg]
   *   Optionally specify the this value when calling listener.
   */
  on: <TData = unknown>(
    type: string,
    listener: (event: H5PEvent<TData>) => void,
    thisArg?: ThisType<unknown>
  ) => void;

  /**
   * Add new event listener that will be fired only once.
   *
   * @throws {TypeError}
   *   listener must be a function
   * @param type
   *   Event type
   * @param listener
   *   Event listener
   * @param thisArg
   *   Optionally specify the this value when calling listener.
   */
  once: <TData = unknown>(
    type: string,
    listener: (event: H5PEvent<TData>) => void,
    thisArg?: ThisType<unknown>
  ) => void;

  /**
   * Remove event listener.
   * If no listener is specified, all listeners will be removed.
   *
   * @throws {TypeError}
   *   listener must be a function
   * @param  type
   *   Event type
   * @param listener
   *   Event listener
   */
  off: <TData = unknown>(
    type: string,
    listener: (event: TData) => void
  ) => void;

  /**
   * Dispatch event.
   *
   * @param event
   *   Event object or event type as string
   * @param [eventData]
   *   Custom event data(used when event type as string is used as first
   *   argument).
   * @param [extras]
   */
  trigger: <TData = unknown>(
    event: string | unknown,
    eventData?: TData,
    extras?: {
      bubbles?: boolean;
      external?: boolean;
    }
  ) => void;

  triggerXAPI: (verb: XAPIVerb, extra: unknown) => void;

  createXAPIEventTemplate<TVerb extends XAPIVerb>(
    verb: TVerb,
    extra: unknown
  ): XAPIEvent;
}
