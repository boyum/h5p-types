import type { H5PFieldClass } from "./H5PFieldClass";

export declare class H5PDefinitionList {
  constructor();

  /**
   * Add field to the list
   *
   * @param field
   */
  add(field: H5PFieldClass): void;

  /**
   * Get number of fields
   */
  size(): number;

  /**
   * Get field at given index
   *
   * @param index
   */
  get(index: number): H5PFieldClass | undefined;

  /**
   * Print definition list as HTML
   */
  toString(): string;
}
