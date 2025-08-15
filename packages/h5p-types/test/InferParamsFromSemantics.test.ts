/** biome-ignore-all lint/correctness/noUnusedVariables: Test namespaces */

import type { EmptyObject, ReadonlyDeep } from "type-fest";
import type {
  H5PField,
  H5PFieldGroup,
  H5PL10n,
  InferParamsFromSemantics,
} from "..";
import type { AreEqual, Expect } from "../src/test-utility-types";

// @ts-expect-error Test
namespace Test_H5PFieldText {
  const semantics = [
    {
      label: "Field",
      name: "field",
      type: "text",
    },
  ] as const;

  type Expected = {
    field: string;
  };

  type Actual = InferParamsFromSemantics<typeof semantics>;

  // @ts-expect-error Test
  type Test =
    // biome-ignore format: Avoid `@ts-expect-error` from ignoring test assertion
    Expect<AreEqual<Actual, Expected>>;
}

// @ts-expect-error Test
namespace Test_H5PFieldList {
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

  const semantics = [listField] as const;

  type Expected = {
    list: Array<string>;
  };

  type Actual = InferParamsFromSemantics<typeof semantics>;

  // @ts-expect-error Test
  type Test =
    // biome-ignore format: Avoid `@ts-expect-error` from ignoring test assertion
    Expect<AreEqual<Actual, Expected>>;
}

// @ts-expect-error Test
namespace Test_MultipleFields {
  const semantics = [
    {
      label: "Field",
      name: "field1",
      type: "text",
    },
    {
      label: "Field",
      name: "field2",
      type: "boolean",
      default: false,
    },
  ] as const;

  type Expected = {
    field1: string;
    field2: boolean;
  };

  type Actual = InferParamsFromSemantics<typeof semantics>;

  // @ts-expect-error Test
  type Test =
    // biome-ignore format: Avoid `@ts-expect-error` from ignoring test assertion
    Expect<AreEqual<Actual, Expected>>;
}

// @ts-expect-error Test
namespace Test_H5PFieldGroupWithZeroFields {
  const semantics = [
    {
      label: "Field",
      name: "field",
      type: "group",
      fields: [],
    },
  ] as const;

  type Expected = { field: Record<never, never> };
  type Actual = InferParamsFromSemantics<typeof semantics>;

  declare const params: Actual;

  // @ts-expect-error Expect that `field` has no properties
  params.field.a;

  // @ts-expect-error Test
  type Test =
    // biome-ignore format: Avoid `@ts-expect-error` from ignoring test assertion
    Expect<AreEqual<Actual, Expected>>;
}

// @ts-expect-error Test
namespace Test_H5PFieldGroupWithOneField {
  const semantics = [
    {
      label: "Group",
      name: "group",
      type: "group",
      fields: [
        {
          label: "Field",
          name: "field",
          type: "number",
        },
      ],
    },
  ] as const;

  type Expected = { group: number };
  type Actual = InferParamsFromSemantics<typeof semantics>;

  // @ts-expect-error Test
  type Test =
    // biome-ignore format: Avoid `@ts-expect-error` from ignoring test assertion
    Expect<AreEqual<Actual, Expected>>;
}

// @ts-expect-error Test
namespace Test_H5PFieldGroupWithMultipleFields {
  const semantics = [
    {
      label: "Group",
      name: "group",
      type: "group",
      fields: [
        {
          label: "Field",
          name: "field1",
          type: "number",
        },
        {
          label: "Field",
          name: "field2",
          type: "boolean",
          default: false,
        },
      ],
    },
  ] as const satisfies ReadonlyDeep<Array<H5PFieldGroup>>;

  type Expected = { group: { field1: number; field2: boolean } };
  type Actual = InferParamsFromSemantics<typeof semantics>;

  // @ts-expect-error Test
  type Test =
    // biome-ignore format: Avoid `@ts-expect-error` from ignoring test assertion
    Expect<AreEqual<Actual, Expected>>;
}

// @ts-expect-error Test
namespace Test_OptionalFields {
  const semantics = [
    {
      label: "Group",
      name: "group",
      type: "group",
      fields: [
        {
          label: "Field",
          name: "field1",
          type: "number",
          optional: true,
        },
        {
          label: "Field",
          name: "field2",
          type: "group",
          optional: true,
          fields: [
            {
              label: "Field",
              name: "field1",
              type: "number",
            },
            {
              label: "Field",
              name: "field2",
              type: "text",
            },
          ],
        },
        {
          label: "Field",
          name: "field3",
          type: "group",
          optional: true,
          fields: [
            {
              label: "Field",
              name: "field1",
              type: "number",
            },
          ],
        },
        {
          label: "Field",
          name: "field4",
          type: "group",
          fields: [
            {
              label: "Field",
              name: "field1",
              type: "number",
              optional: true,
            },
          ],
        },
        {
          label: "Field",
          name: "field5",
          type: "group",
          fields: [
            {
              label: "Field",
              name: "field1",
              type: "number",
              optional: true,
              default: 3,
            },
          ],
        },
        {
          label: "Field",
          name: "field6",
          type: "number",
          optional: true,
          default: 3,
        },
      ],
    },
  ] as const satisfies ReadonlyDeep<Array<H5PFieldGroup>>;

  type Expected = {
    group: {
      field1?: number | undefined;
      field2?:
        | {
            field1: number;
            field2: string;
          }
        | undefined;
      field3?: number | undefined;
      field4?: number | undefined;
      field5: number;
      field6: number;
    };
  };
  type Actual = InferParamsFromSemantics<typeof semantics>;

  declare const params: Actual;

  // Expect that `group` is not possibly undefined
  params.group.field1;

  // @ts-expect-error Expect that `field1` is possibly undefined
  params.group.field1.toString();

  // @ts-expect-error Expect that `field2` is possibly undefined
  params.group.field2.field1;

  // @ts-expect-error Expect that `field3` is possibly undefined
  params.group.field3.toString();

  // @ts-expect-error Expect that `field4` is possibly undefined
  params.group.field4.toString();

  // Expect that `field5` is not possibly undefined
  params.group.field5.toString();

  // Expect that `field6` is not possibly undefined
  params.group.field6.toString();

  // @ts-expect-error Test
  type Test =
    // biome-ignore format: Avoid `@ts-expect-error` from ignoring test assertion
    Expect<AreEqual<Actual, Expected>>;
}

// @ts-expect-error Test
namespace Test_Bildetema {
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
  } as const satisfies ReadonlyDeep<H5PL10n>;

  const semantics = [
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
      default: "https://example.com",
      name: "backendUrl",
      type: "text",
    },
  ] as const satisfies ReadonlyDeep<Array<H5PField>>;

  type Expected = {
    l10n: {
      htmlLanguageCode: string;
      pageIsLoading: string;
      mainContentLink: string;
      showWrittenWordsLabel: string;
      printLabel: string;
      printImgLabel: string;
      playAudio: string;
      pauseAudio: string;
      footerContactInfoLabel: string;
      footerContactInfoHref: string;
      footerLink1Label: string;
      footerLink1Href: string;
      footerLink2Label: string;
      footerLink2Href: string;
      footerLink3Label: string;
      footerLink3Href: string;
      breadcrumbsTopic: string;
      breadcrumbsHome: string;
      selectLanguage: string;
      footerCopyright: string;
      headerTitle: string;
      headerSubtitle: string;
      bigTopics: string;
      compactTopics: string;
      prevImageLabel: string;
      nextImageLabel: string;
      noTopicSelected: string;
      lang_ara: string;
      lang_ckb: string;
      lang_dan: string;
      lang_eng: string;
      lang_fas: string;
      lang_fra: string;
      lang_isl: string;
      lang_kmr: string;
      lang_lit: string;
      lang_nno: string;
      lang_nob: string;
      lang_pol: string;
      lang_prs: string;
      lang_pus: string;
      lang_rus: string;
      lang_sme: string;
      lang_som: string;
      lang_spa: string;
      lang_swe: string;
      lang_tgl: string;
      lang_tha: string;
      lang_tir: string;
      lang_ukr: string;
      lang_vie: string;
    };
    defaultLanguages: Array<
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
    backendUrl: string;
  };

  type Actual = InferParamsFromSemantics<typeof semantics>;

  // @ts-expect-error Test
  type Test =
    // biome-ignore format: Avoid `@ts-expect-error` from ignoring test assertion
    Expect<AreEqual<Actual, Expected>>;
}

// @ts-expect-error Test
namespace Test_VocabularyDrill {
  type Semantics = [
    {
      label: "Task description";
      name: "description";
      description: "A guide telling the user how to answer this task.";
      type: "text";
      optional: true;
    },
    {
      label: "Source language";
      name: "sourceLanguage";
      description: "Choose the language of the source words.";
      type: "select";
      options: [
        {
          value: "de";
          label: "German";
        },
        {
          value: "en";
          label: "English";
        },
        {
          value: "fr";
          label: "French";
        },
        {
          value: "nb";
          label: "Norwegian bokmål";
        },
        {
          value: "nn";
          label: "Norwegian nynorsk";
        },
        {
          value: "es";
          label: "Spanish";
        },
      ];
      default: "en";
    },
    {
      label: "Target language";
      name: "targetLanguage";
      description: "Choose the language of the target words.";
      type: "select";
      options: [
        {
          value: "de";
          label: "German";
        },
        {
          value: "en";
          label: "English";
        },
        {
          value: "fr";
          label: "French";
        },
        {
          value: "nb";
          label: "Norwegian bokmål";
        },
        {
          value: "nn";
          label: "Norwegian nynorsk";
        },
        {
          value: "es";
          label: "Spanish";
        },
      ];
      default: "nb";
    },
    {
      label: "Words";
      name: "words";
      type: "text";
      optional: true;
      widget: "csv-to-text";
      description: "Add words by uploading a CSV-file or write them in the text field.";
      important: {
        description: "<ul><li>Source and target words are separated with a comma (,).</li><li>Alternative answers are separated with a forward slash (/).</li><li>You may add a textual tip, using a colon (:) in front of the tip.</li></ul>";
        example: "water/sea:w___r,vann/hav:v__n";
      };
    },
    {
      name: "overallFeedback";
      type: "list";
      widgets: [
        {
          name: "RangeList";
          label: "Default";
        },
      ];
      importance: "high";
      label: "Define custom feedback for any score range";
      description: 'Click the "Add range" button to add as many ranges as you need. Example: 0-20% Bad score, 21-91% Average Score, 91-100% Great Score!';
      entity: "range";
      min: 1;
      defaultNum: 1;
      field: {
        label: "Overall Feedback";
        name: "overallFeedback";
        type: "group";
        importance: "low";
        fields: [
          {
            name: "from";
            type: "number";
            label: "Score Range";
            min: 0;
            max: 100;
            default: 0;
            unit: "%";
          },
          {
            name: "to";
            type: "number";
            min: 0;
            max: 100;
            default: 100;
            unit: "%";
            label: "To";
          },
          {
            name: "feedback";
            type: "text";
            label: "Feedback for defined score range";
            importance: "low";
            placeholder: "Fill in the feedback";
            optional: true;
          },
        ];
      };
    },
    {
      label: "Localization";
      name: "l10n";
      type: "group";
      fields: [];
    },
    {
      name: "behaviour";
      type: "group";
      label: "Behavioural settings";
      importance: "low";
      description: "These options will let you control how the task behaves.";
      fields: [
        {
          label: 'Enable "Retry"';
          importance: "low";
          name: "enableRetry";
          type: "boolean";
          default: true;
        },
        {
          label: 'Enable "Show solution" button';
          importance: "low";
          name: "enableSolutionsButton";
          type: "boolean";
          default: true;
        },
        {
          label: "Automatically check answers after input";
          importance: "low";
          name: "autoCheck";
          type: "boolean";
          default: false;
        },
        {
          name: "caseSensitive";
          importance: "low";
          type: "boolean";
          default: true;
          label: "Case sensitive";
          description: "Makes sure the user input has to be exactly the same as the answer.";
        },
        {
          label: "Require all fields to be answered before the solution can be viewed";
          importance: "low";
          name: "showSolutionsRequiresInput";
          type: "boolean";
          default: true;
        },
        {
          name: "acceptSpellingErrors";
          type: "boolean";
          label: "Accept minor spelling errors";
          importance: "low";
          description: "If activated, an answer will also count as correct with minor spelling errors (3-9 characters: 1 spelling error, more than 9 characters: 2 spelling errors). This option is only valid if the answer mode is set to Fill in";
          default: false;
        },
        {
          label: "Randomize";
          name: "randomize";
          type: "boolean";
          default: true;
        },
        {
          label: "Show tips";
          name: "showTips";
          type: "boolean";
          default: false;
        },
        {
          label: "Answer mode";
          name: "answerMode";
          type: "select";
          widget: "radioGroup";
          alignment: "horizontal";
          options: [
            {
              label: "Fill in";
              value: "fillIn";
            },
            {
              label: "Drag text";
              value: "dragText";
            },
          ];
          default: "fillIn";
        },
        {
          name: "enableSwitchAnswerModeButton";
          type: "boolean";
          label: 'Enable "Switch answer mode" button';
          importance: "low";
          description: 'Allow the end user to switch between modes "Fill in" and "Drag text".';
          default: false;
        },
        {
          name: "enableSwitchWordsButton";
          type: "boolean";
          label: 'Enable "Switch words" button';
          importance: "low";
          description: "Allow the end user to switch between source and target words.";
          default: false;
        },
      ];
    },
  ];

  type Expected = {
    description?: string | undefined;
    sourceLanguage: "de" | "en" | "fr" | "nb" | "nn" | "es";
    targetLanguage: "de" | "en" | "fr" | "nb" | "nn" | "es";
    words?: string | undefined;
    overallFeedback: Array<{
      from: number;
      to: number;
      feedback?: string | undefined;
    }>;
    l10n: EmptyObject;
    behaviour: {
      enableRetry: boolean;
      enableSolutionsButton: boolean;
      autoCheck: boolean;
      caseSensitive: boolean;
      showSolutionsRequiresInput: boolean;
      acceptSpellingErrors: boolean;
      randomize: boolean;
      showTips: boolean;
      answerMode: "fillIn" | "dragText";
      enableSwitchAnswerModeButton: boolean;
      enableSwitchWordsButton: boolean;
    };
  };
  type Actual = InferParamsFromSemantics<Semantics>;

  // @ts-expect-error Test
  type Test =
    // biome-ignore format: Avoid `@ts-expect-error` from ignoring test assertion
    Expect<AreEqual<Actual, Expected>>;
}

// @ts-expect-error
namespace Test_Type {
  type Semantics = [
    {
      label: "Group";
      name: "group";
      type: "group";
      fields: [
        {
          label: "A";
          name: "a";
          type: "number";
        },
        {
          label: "B";
          name: "b";
          type: "number";
        },
        {
          label: "C";
          name: "c";
          type: "number";
        },
      ];
    },
  ];

  type Expected = {
    group: {
      a: number;
      b: number;
      c: number;
    };
  };
  type Actual = InferParamsFromSemantics<Semantics>;

  // @ts-expect-error Test
  type Test =
    // biome-ignore format: Avoid `@ts-expect-error` from ignoring test assertion
    Expect<AreEqual<Actual, Expected>>;
}
