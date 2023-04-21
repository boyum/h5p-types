import type { H5PEvent } from "../H5PEvent";
import type { IH5PContentType } from "../Interfaces/IH5PContentType";
import type { XAPIData } from "./XAPIData";
import type { XAPIVerb } from "./XAPIVerb";

export declare class XAPIEvent extends H5PEvent<XAPIData> {
  type: "xAPI";

  constructor();

  /**
   * Set scored result statements.
   */
  setScoredResult(
    score: number,
    maxScore: number,
    instance: IH5PContentType,
    completion: boolean,
    success: boolean,
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
   *   Verb or null if no verb with an id has been defined.
   *   If the parameter `full` is `true`, the return type is
   *   an object with an `id` property (the verb with full url)
   *   and a `display` property (a record of translated labels,
   *   for instance `{ "en-US: "Answered" }`).
   */
  getVerb(full: true): {
    id: `http://adlnet.gov/expapi/verbs/${XAPIVerb}`;
    display: Record<string, string>;
  } | null;
  getVerb(full: false): XAPIVerb | null;
  getVerb(full?: undefined): XAPIVerb | null;

  /**
   * Set the object part of the statement.
   *
   * The id is found automatically (the url to the content)
   *
   * @param instance
   *   The H5P instance
   */
  setObject(instance: IH5PContentType): void;

  /**
   * Set the context part of the statement.
   *
   * @param instance
   *   The H5P instance
   */
  setContext(instance: IH5PContentType): void;

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
