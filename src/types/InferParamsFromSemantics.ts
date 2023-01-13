import type { Expect, AreEqual, DeepReadonly } from "../utility-types";
import type { H5PBehaviour } from "./H5PBehaviour";
import type {
  H5PField,
  H5PFieldGroup,
  H5PFieldList,
  H5PFieldText,
} from "./H5PField";
import type { H5PL10n } from "./H5PL10n";
import type { ParamTypeInferredFromFieldType } from "./ParamTypeInferredFromFieldType";

type InferGroupParams<TField extends DeepReadonly<H5PFieldGroup>> =
  TField["fields"]["length"] extends 0
    ? Record<string, never>
    : TField["fields"]["length"] extends 1
    ? TField["fields"][0] extends H5PFieldGroup
      ? InferGroupParams<TField["fields"][0]>
      : ParamTypeInferredFromFieldType<TField["fields"][0]>
    : Record<
        TField["fields"][number]["name"],
        TField["fields"][number] extends H5PFieldGroup
          ? InferGroupParams<TField["fields"][number]>
          : ParamTypeInferredFromFieldType<TField["fields"][number]>
      >;

type InferParamsType<TField extends DeepReadonly<H5PField>> =
  TField extends DeepReadonly<H5PBehaviour>
    ? never
    : TField extends DeepReadonly<H5PFieldGroup>
    ? InferGroupParams<TField>
    : TField extends DeepReadonly<H5PFieldList>
    ? Array<InferParamsType<TField["field"]>>
    : ParamTypeInferredFromFieldType<TField>;

export type InferParamsFromSemantics<
  TSemantics extends ReadonlyArray<DeepReadonly<H5PField>>,
> = Record<TSemantics[number]["name"], InferParamsType<TSemantics[number]>>;

// #region Test H5PFieldGroup with single field
const semantics1 = [
  {
    label: "Group",
    name: "groupName",
    type: "group",
    fields: [
      {
        label: "Field",
        name: "fieldName",
        type: "text",
      },
    ],
  },
] as const;

type ExpectedParams1 = {
  groupName: string;
};

type ActualParams1 = InferParamsFromSemantics<typeof semantics1>;

type Test1 = Expect<AreEqual<ActualParams1, ExpectedParams1>>;
// #endregion

// #region Test H5PFieldText
const semantics2 = [
  {
    label: "Field",
    name: "field",
    type: "text",
  },
] as const;

type ExpectedParams2 = {
  field: string;
};

type ActualParams2 = InferParamsFromSemantics<typeof semantics2>;

type Test2 = Expect<AreEqual<ActualParams2, ExpectedParams2>>;
// #endregion

// #region Test H5PFieldList
const listField = {
  label: "List",
  name: "list",
  type: "list",
  entity: "Entity",
  field: {
    type: "text",
    name: "textField",
    label: "Label",
  },
} as const;

const semantics3 = [listField] as const;

type ExpectedParams3 = {
  list: Array<string>;
};

type ActualParams3 = InferParamsFromSemantics<typeof semantics3>;

type Test3 = Expect<AreEqual<ActualParams3, ExpectedParams3>>;
// #endregion

// #region Advanced test

const l10nField = {
  name: "l10n",
  type: "group",
  common: true,
  label: "Localize",
  fields: [
    {
      label: "Language code",
      name: "htmlLanguageCode",
      description:
        "Two character language code, used for setting language in code (English: en, Norwegian Bokmål: nb)",
      default: "en",
      type: "text",
    },
    {
      label: "Page is loading",
      name: "pageIsLoading",
      default: "Loading…",
      type: "text",
    },
    {
      label: "Skip to main content label",
      name: "mainContentLink",
      default: "Skip to main content",
      type: "text",
    },
    {
      label: "Show written words label",
      name: "showWrittenWordsLabel",
      default: "Show written words",
      type: "text",
    },
    {
      label: "Print label",
      name: "printLabel",
      default: "Print",
      type: "text",
    },
    {
      label: "Print img label",
      name: "printImgLabel",
      default: "images in width",
      type: "text",
    },
    {
      label: "Play audio",
      name: "playAudio",
      default: "Play audio",
      type: "text",
    },
    {
      label: "Pause audio",
      name: "pauseAudio",
      default: "Pause audio",
      type: "text",
    },
    {
      label: "Footer contact info label",
      name: "footerContactInfoLabel",
      default: "Contact us",
      type: "text",
    },
    {
      label: "Footer contact info URL",
      name: "footerContactInfoHref",
      default: "mailto:support@lexindrift.atlassian.net",
      type: "text",
    },
    {
      label: "Footer link 1 label",
      name: "footerLink1Label",
      default: "NAFO - National Centre of Multicultural Education",
      type: "text",
    },
    {
      label: "Footer link 1 URL",
      name: "footerLink1Href",
      default: "https://nafo.oslomet.no/",
      type: "text",
    },
    {
      label: "Footer link 2 label",
      name: "footerLink2Label",
      default: "OsloMet",
      type: "text",
    },
    {
      label: "Footer link 2 URL",
      name: "footerLink2Href",
      default: "https://oslomet.no/",
      type: "text",
    },
    {
      label: "Footer link 3 label",
      name: "footerLink3Label",
      default: "LEXIN",
      type: "text",
    },
    {
      label: "Footer link 3 URL",
      name: "footerLink3Href",
      default: "https://lexin.oslomet.no/",
      type: "text",
    },
    {
      label: "Breadcrumbs 'Topic' label",
      name: "breadcrumbsTopic",
      default: "Choose a topic",
      type: "text",
    },
    {
      label: "Breadcrumbs 'Home' label",
      name: "breadcrumbsHome",
      default: "Home",
      type: "text",
    },
    {
      label: "Language selection label",
      name: "selectLanguage",
      default: "Language",
      type: "text",
    },
    {
      label: "Copyright",
      name: "footerCopyright",
      default: "Copyright © 2022 · All Rights Reserved",
      type: "text",
    },
    {
      label: "Header title",
      name: "headerTitle",
      default: "Bildetema",
      type: "text",
    },
    {
      label: "Header subtitle",
      name: "headerSubtitle",
      default: "Multi-lingual image dictionary",
      type: "text",
    },
    {
      label: "Topic size big",
      name: "bigTopics",
      default: "Show topics in grid view",
      type: "text",
    },
    {
      label: "Topic size compact",
      name: "compactTopics",
      default: "Show topics in list view",
      type: "text",
    },
    {
      label: "Previous image label",
      name: "prevImageLabel",
      default: "Previous image",
      type: "text",
    },
    {
      label: "Next image label",
      name: "nextImageLabel",
      default: "Next image",
      type: "text",
    },
    {
      label: "No topic selected",
      name: "noTopicSelected",
      default: "No topic selected.",
      type: "text",
    },
    {
      label: "Arabic",
      name: "lang_ara",
      default: "Arabic",
      type: "text",
    },
    {
      label: "Sorani",
      name: "lang_ckb",
      default: "Sorani",
      type: "text",
    },
    {
      label: "Danish",
      name: "lang_dan",
      default: "Danish",
      type: "text",
    },
    {
      label: "English",
      name: "lang_eng",
      default: "English",
      type: "text",
    },
    {
      label: "Persian",
      name: "lang_fas",
      default: "Persian",
      type: "text",
    },
    {
      label: "French",
      name: "lang_fra",
      default: "French",
      type: "text",
    },
    {
      label: "Icelandic",
      name: "lang_isl",
      default: "Icelandic",
      type: "text",
    },
    {
      label: "Kurmanji",
      name: "lang_kmr",
      default: "Kurmanji",
      type: "text",
    },
    {
      label: "Lithuanian",
      name: "lang_lit",
      default: "Lithuanian",
      type: "text",
    },
    {
      label: "Norwegian (nynorsk)",
      name: "lang_nno",
      default: "Norwegian (nynorsk)",
      type: "text",
    },
    {
      label: "Norwegian (bokmål)",
      name: "lang_nob",
      default: "Norwegian (bokmål)",
      type: "text",
    },
    {
      label: "Polish",
      name: "lang_pol",
      default: "Polish",
      type: "text",
    },
    {
      label: "Dari",
      name: "lang_prs",
      default: "Dari",
      type: "text",
    },
    {
      label: "Pashto",
      name: "lang_pus",
      default: "Pashto",
      type: "text",
    },
    {
      label: "Russian",
      name: "lang_rus",
      default: "Russian",
      type: "text",
    },
    {
      label: "Northern Sami",
      name: "lang_sme",
      default: "Northern Sami",
      type: "text",
    },
    {
      label: "Somali",
      name: "lang_som",
      default: "Somali",
      type: "text",
    },
    {
      label: "Spanish",
      name: "lang_spa",
      default: "Spanish",
      type: "text",
    },
    {
      label: "Swedish",
      name: "lang_swe",
      default: "Swedish",
      type: "text",
    },
    {
      label: "Tagalog",
      name: "lang_tgl",
      default: "Tagalog",
      type: "text",
    },
    {
      label: "Thai",
      name: "lang_tha",
      default: "Thai",
      type: "text",
    },
    {
      label: "Tigrinya",
      name: "lang_tir",
      default: "Tigrinya",
      type: "text",
    },
    {
      label: "Ukrainian",
      name: "lang_ukr",
      default: "Ukrainian",
      type: "text",
    },
    {
      label: "Vietnamese",
      name: "lang_vie",
      default: "Vietnamese",
      type: "text",
    },
  ],
} as const;

const semantics4 = [
  l10nField,
  {
    label: "Default languages",
    description:
      "There should be up to three default languages. These are defaults for the current site language. We recommend adding three of them",
    name: "defaultLanguages",
    type: "list",
    entity: "Language",
    field: {
      label: "Language",
      name: "languageCode",
      type: "select",
      default: "nob",
      options: [
        {
          label: "Arabic",
          value: "ara",
        },
        {
          label: "Sorani",
          value: "ckb",
        },
        {
          label: "Danish",
          value: "dan",
        },
        {
          label: "English",
          value: "eng",
        },
        {
          label: "Persian",
          value: "fas",
        },
        {
          label: "French",
          value: "fra",
        },
        {
          label: "Icelandic",
          value: "isl",
        },
        {
          label: "Kurmanji",
          value: "kmr",
        },
        {
          label: "Lithuanian",
          value: "lit",
        },
        {
          label: "Norwegian (nynorsk)",
          value: "nno",
        },
        {
          label: "Norwegian (bokmål)",
          value: "nob",
        },
        {
          label: "Polish",
          value: "pol",
        },
        {
          label: "Dari",
          value: "prs",
        },
        {
          label: "Pashto",
          value: "pus",
        },
        {
          label: "Russian",
          value: "rus",
        },
        {
          label: "Northern Sami",
          value: "sme",
        },
        {
          label: "Somali",
          value: "som",
        },
        {
          label: "Spanish",
          value: "spa",
        },
        {
          label: "Swedish",
          value: "swe",
        },
        {
          label: "Tagalog",
          value: "tgl",
        },
        {
          label: "Thai",
          value: "tha",
        },
        {
          label: "Tigrinya",
          value: "tir",
        },
        {
          label: "Ukrainian",
          value: "ukr",
        },
        {
          label: "Vietnamese",
          value: "vie",
        },
      ],
    },
  },
  {
    label: "Backend Url",
    description: "The Url to the json database",
    default: "https://cdn-devbildetema.azureedge.net/data/database.json",
    name: "backendUrl",
    type: "text",
  },
] as const;

type Expected4 = {
  l10n: Record<
    | "htmlLanguageCode"
    | "pageIsLoading"
    | "mainContentLink"
    | "showWrittenWordsLabel"
    | "printLabel"
    | "printImgLabel"
    | "playAudio"
    | "pauseAudio"
    | "footerContactInfoLabel"
    | "footerContactInfoHref"
    | "footerLink1Label"
    | "footerLink1Href"
    | "footerLink2Label"
    | "footerLink2Href"
    | "footerLink3Label"
    | "footerLink3Href"
    | "breadcrumbsTopic"
    | "breadcrumbsHome"
    | "selectLanguage"
    | "footerCopyright"
    | "headerTitle"
    | "headerSubtitle"
    | "bigTopics"
    | "compactTopics"
    | "prevImageLabel"
    | "nextImageLabel"
    | "noTopicSelected"
    | "lang_ara"
    | "lang_ckb"
    | "lang_dan"
    | "lang_eng"
    | "lang_fas"
    | "lang_fra"
    | "lang_isl"
    | "lang_kmr"
    | "lang_lit"
    | "lang_nno"
    | "lang_nob"
    | "lang_pol"
    | "lang_prs"
    | "lang_pus"
    | "lang_rus"
    | "lang_sme"
    | "lang_som"
    | "lang_spa"
    | "lang_swe"
    | "lang_tgl"
    | "lang_tha"
    | "lang_tir"
    | "lang_ukr"
    | "lang_vie",
    string
  >;
  defaultLanguages?: Array<
    | "ara"
    | "ckb"
    | "dan"
    | "eng"
    | "fas"
    | "fra"
    | "isl"
    | "kmr"
    | "lit"
    | "nno"
    | "nob"
    | "pol"
    | "prs"
    | "pus"
    | "rus"
    | "sme"
    | "som"
    | "spa"
    | "swe"
    | "tgl"
    | "tha"
    | "tir"
    | "ukr"
    | "vie"
  >;
  backendUrl?: string;
};

type Actual4 = InferParamsFromSemantics<typeof semantics4>;

type TKeys = typeof l10nField["fields"][number]["name"];

// #endregion
