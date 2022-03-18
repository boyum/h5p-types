import { H5PContentType } from "./src/types/H5PContentType";
import { H5PField } from "./src/types/H5PField";
import { H5PForm } from "./src/types/H5PForm";
import { XAPIVerb } from "./src/types/XAPIVerb";

declare type H5PObject = {
  EventDispatcher: typeof EventDispatcher;
  getPath: (path: string, contentId: string) => string;
  createUUID: () => string;
};

declare type H5PEditorObject = {
  // TODO: Improve typing of H5P.widgets.X
  widgets: Record<string, typeof Function>;
  $: typeof jQuery;
  contentId: string;

  /**
   * Translate text strings.
   *
   * @param library The library name(machineName), or "core".
   * @param key Translation string identifier.
   * @param vars Placeholders and values to replace in the text.
   *
   * @returns Translated string, or a default text if the translation is missing.
   */
  t: (
    library: `H5PEditor.${string}` | "core",
    key: string,
    vars?: Record<string, string>
  ) => string;

  /**
   * Recursive processing of the semantics chunks.
   *
   * @param semanticsChunk Array of semantics
   * @param params
   * @param $wrapper
   * @param parent
   */
  processSemanticsChunk: (
    semanticsChunk: H5PField | Array<H5PField>,
    params: unknown,
    $wrapper: JQuery<HTMLElement>,
    parent: H5PForm
  ) => void;

  /**
   * Search for a field or a set of fields. Returns `null` if the field isn't found.
   *
   * @param fieldName
   * @param semanticsStructure
   */
  findSemanticsField: (
    fieldName: string,
    semanticsStructure: H5PField | Array<H5PField>
  ) => H5PField | Array<H5PField> | null;
} & Record<string, typeof Function>;

declare class H5PEvent {
  type: string;

  data: {
    statement: any;
  };

  extras?: {
    bubbles?: boolean;
    external?: boolean;
  };

  constructor(
    type: string,
    data: unknown,
    extras?: {
      bubbles?: boolean;
      external?: boolean;
    }
  );

  /**
   * Prevent this event from bubbling up to parent
   */
  preventBubbling(): void;

  /**
   * Get bubbling status
   *
   * @returns
   *   true if bubbling false otherwise
   */
  getBubbles(): boolean;

  /**
   * Try to schedule an event for externalDispatcher
   *
   * @returns
   *   true if external and not already scheduled, otherwise false
   */
  scheduleForExternal(): boolean;
}

declare class XAPIEvent extends H5PEvent {
  type: "xAPI";

  constructor();

  /**
   * Set scored result statements.
   *
   * @param {number} score
   * @param {number} maxScore
   * @param {object} instance
   * @param {boolean} completion
   * @param {boolean} success
   */
  setScoredResult(
    score: number,
    maxScore: number,
    instance: H5PObject,
    completion: number,
    success: number
  ): void;

  /**
   * Set a verb.
   *
   * @param verb
   *   Verb in short form, one of the verbs defined at
   *   {@link https://help.csod.com/help/csod_0/Content/Catalog/xAPI_Package_Support/xAPI_Appendix.htm?TocPath=Learning%7CContent%7CxAPI%7C_____6}
   *
   */
  setVerb(verb: XAPIVerb): void;

  /**
   * Get the statements verb id.
   *
   * @param full
   *   if true the full verb id prefixed by http://adlnet.gov/expapi/verbs/
   *   will be returned
   * @returns
   *   Verb or null if no verb with an id has been defined
   */
  getVerb(full: boolean): `http://adlnet.gov/expapi/verbs/${XAPIVerb}` | null;

  /**
   * Set the object part of the statement.
   *
   * The id is found automatically (the url to the content)
   *
   * @param instance
   *   The H5P instance
   */
  setObject(instance: H5PContentType): void;

  /**
   * Set the context part of the statement.
   *
   * @param instance
   *   The H5P instance
   */
  setContext(instance: H5PContentType): void;

  /**
   * Set the actor. Email and name will be added automatically.
   */
  setActor(): void;

  /**
   * Figure out if a property exists in the statement and return it
   *
   * @param keys
   *   List describing the property we're looking for. For instance
   *   ['result', 'score', 'raw'] for result.score.raw
   * @returns
   *   The value of the property if it is set, null otherwise.
   */
  getVerifiedStatementValue(keys: Array<string>): unknown;
}

declare class EventDispatcher {
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
  on: (
    type: string,
    listener: (event: unknown) => void,
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
  once: (
    type: string,
    listener: (event: unknown) => void,
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
  off: (type: string, listener: (event: unknown) => void) => void;

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
  trigger: (
    event: string | unknown,
    eventData?: unknown,
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
