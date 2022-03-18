import { H5PGroup } from "./H5PGroup";
import { H5PMetadata } from "./H5PMetadata";
import { H5PMetadataForm } from "./H5PMetadataForm";
import { H5PSetValue } from "./H5PSetValue";

type UberName = `H5P.${string} ${number}.${number}`;

export type H5PForm = {
  parent: H5PForm | null;
  $common: JQuery<HTMLElement> | null;
  $commonButton: JQuery<HTMLElement> | null;
  $form: JQuery<HTMLElement> | null;
  /**
   * Add new languages for content type.
   *
   * @param {string} libraryName
   * @param {Array} langs
   */
  addLanguages: (
    libraryName: string,
    languageCodes: Array<string | undefined>,
  ) => void;
  children: Array<H5PGroup>;

  commonFields: Record<
    UberName,
    {
      l10n: {
        instance: H5PGroup;
        params: unknown;
        parents: H5PForm;
        setValues: H5PSetValue<unknown>;
      };
    }
  >;
  currentLibrary: UberName;
  metadata: H5PMetadata;
  metadataForm: H5PMetadataForm | null;
  offset: { top: number; left: number };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: any;
  passReadies: boolean;
  readies: Array<unknown>;
  removeLanguages: (
    libraryName: string,
    languageCodes: Array<string | undefined>,
  ) => void;
  zebra: "odd" | "even";
  ready: (callback: () => void) => void;
};
