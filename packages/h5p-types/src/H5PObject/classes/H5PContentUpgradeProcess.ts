import type { H5PUpgradeError } from "../../upgrades/Upgrades";
import type { H5PVersion } from "./H5PVersion";

type LoadLibraryCallback = (
  name: string,
  version: H5PVersion,
  next: (error?: Error, library?: unknown) => void,
) => void;

type UpgradeDone = (error: H5PUpgradeError | null, result?: string) => void;

/**
 * Handle content upgrades. Converts content of an older version to a newer
 * version by running the registered upgrade hooks.
 *
 * @see https://h5p.org/h5p-content-upgrade
 */
export declare class H5PContentUpgradeProcess {
  /**
   * @param name Library name of the content
   * @param oldVersion Version the content is on
   * @param newVersion Version to upgrade the content to
   * @param params Params of the content as a JSON string
   * @param id id of the content that is to be upgraded
   * @param loadLibrary Load library to upgrade
   * @param done Callback with error and result parameters
   */
  constructor(
    name: string,
    oldVersion: H5PVersion,
    newVersion: H5PVersion,
    params: string,
    id: number | string,
    loadLibrary: LoadLibraryCallback,
    done: UpgradeDone,
  );

  /**
   * Run content upgrade.
   */
  upgrade(
    name: string,
    oldVersion: H5PVersion,
    newVersion: H5PVersion,
    params: unknown,
    metadata: unknown,
    done: (
      error: H5PUpgradeError | null,
      params?: unknown,
      metadata?: unknown,
    ) => void,
  ): void;

  /**
   * Run upgrade hooks on params.
   */
  processParams(
    library: unknown,
    oldVersion: H5PVersion,
    newVersion: H5PVersion,
    params: unknown,
    metadata: unknown,
    next: (
      error: H5PUpgradeError | null,
      params?: unknown,
      metadata?: unknown,
    ) => void,
  ): void;

  /**
   * Check if params needs to be upgraded for the given field.
   */
  processField(
    field: unknown,
    params: unknown,
    done: (error?: H5PUpgradeError | null) => void,
  ): void;
}
