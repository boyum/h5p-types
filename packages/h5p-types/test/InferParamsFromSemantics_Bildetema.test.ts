/* eslint-disable @typescript-eslint/ban-ts-comment, @typescript-eslint/no-unused-vars, @typescript-eslint/no-namespace */

import type { InferParamsFromSemantics } from "..";
import type { AreEqual, Expect } from "../src/test-utility-types";

// @ts-ignore Test
namespace Test_InferParamsFromSemantics_Bildetema {
  declare const $defaultExport: [
    {
      name: "l10n";
      type: "group";
      common: true;
      label: "Localize";
      fields: [
        {
          label: "Language code";
          name: "htmlLanguageCode";
          description: "Two character language code, used for setting language in code (English: en, Norwegian Bokmål: nb)";
          default: "en";
          type: "text";
        },
        {
          label: "Page is loading";
          name: "pageIsLoading";
          default: "Loading…";
          type: "text";
        },
        {
          label: "Skip to main content label";
          name: "mainContentLink";
          default: "Skip to main content";
          type: "text";
        },
        {
          label: "Main content aria label";
          name: "mainContentAriaLabel";
          default: "Main content";
          type: "text";
        },
        {
          label: "Show written words label";
          name: "showWrittenWordsLabel";
          default: "Show written words";
          type: "text";
        },
        {
          label: "Show articles label";
          name: "showArticlesLabel";
          default: "Show articles";
          type: "text";
        },
        {
          label: "Print label";
          name: "printLabel";
          default: "Print";
          type: "text";
        },
        {
          label: "Print img label";
          name: "printImgLabel";
          default: "images in width";
          type: "text";
        },
        {
          label: "Play audio";
          name: "playAudio";
          default: "Play audio";
          type: "text";
        },
        {
          label: "Stop audio";
          name: "stopAudio";
          default: "Stop audio";
          type: "text";
        },
        {
          label: "Footer about label";
          name: "footerAboutLabel";
          default: "About Bildetema";
          type: "text";
        },
        {
          label: "Footer about URL";
          name: "footerAboutHref";
          default: "/en/om-bildetema";
          type: "text";
        },
        {
          label: "Footer contact info label";
          name: "footerContactInfoLabel";
          default: "Contact us";
          type: "text";
        },
        {
          label: "Footer contact info URL";
          name: "footerContactInfoHref";
          default: "mailto:bildetema@oslomet.no";
          type: "text";
        },
        {
          label: "Footer previous Bildetema site label";
          name: "footerPrevBildetemaLabel";
          default: "Old Bildetema site";
          type: "text";
        },
        {
          label: "Footer previous Bildetema site URL";
          name: "footerPrevBildetemaHref";
          default: "https://bildetema.oslomet.no/";
          type: "text";
        },
        {
          label: "Footer NAFO label";
          name: "footerNAFOLabel";
          default: "NAFO - National Centre of Multicultural Education";
          type: "text";
        },
        {
          label: "Footer NAFO URL";
          name: "footerNAFOHref";
          default: "https://nafo.oslomet.no/";
          type: "text";
        },
        {
          label: "Footer link 1 label";
          name: "footerLink1Label";
          default: "OsloMet - Oslo Metropolitan University";
          type: "text";
        },
        {
          label: "Footer link 1 URL";
          name: "footerLink1Href";
          default: "https://oslomet.no/";
          type: "text";
        },
        {
          label: "Footer link 2 label";
          name: "footerLink2Label";
          default: "LEXIN";
          type: "text";
        },
        {
          label: "Footer link 2 URL";
          name: "footerLink2Href";
          default: "https://lexin.oslomet.no/";
          type: "text";
        },
        {
          label: "Footer privacy statement label";
          name: "footerPrivacyStatementLabel";
          default: "Privacy statement";
          type: "text";
        },
        {
          label: "Footer privacy statement URL";
          name: "footerPrivacyStatementHref";
          default: "/en/personvernerklaering";
          type: "text";
        },
        {
          label: "Footer accessibility statement label";
          name: "footerAccessibilityStatementLabel";
          default: "Accessibility statement";
          type: "text";
        },
        {
          label: "Footer accessibility statement URL";
          name: "footerAccessibilityStatementHref";
          default: "/en/tilgjengelighetserklaering";
          type: "text";
        },
        {
          label: "Footer creative commons img alt text";
          name: "footerCreativeCommonsImgAlt";
          default: "Creative Commons License";
          type: "text";
        },
        {
          label: "Footer creative commons text";
          name: "footerCreativeCommonsText";
          default: "Licensed under a";
          type: "text";
        },
        {
          label: "Footer creative commons link URL";
          name: "footerCreativeCommonsLinkURL";
          default: "https://creativecommons.org/licenses/by-nc-sa/4.0/";
          type: "text";
        },
        {
          label: "Footer creative commons link text";
          name: "footerCreativeCommonsLinkText";
          default: "Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License";
          type: "text";
        },
        {
          label: "Breadcrumbs aria label";
          name: "breadcrumbsAriaLabel";
          default: "Breadcrumbs";
          type: "text";
        },
        {
          label: "Breadcrumbs 'Topic' label";
          name: "breadcrumbsTopic";
          default: "Choose a topic";
          type: "text";
        },
        {
          label: "Breadcrumbs 'Home' label";
          name: "breadcrumbsHome";
          default: "Home";
          type: "text";
        },
        {
          label: "Favorite languages aria label";
          name: "favoriteLanguagesAriaLabel";
          default: "Favorite languages";
          type: "text";
        },
        {
          label: "Choose favorite language aria label part 1";
          name: "chooseFavoriteLanguageAriaLabelPart1";
          default: "Choose";
          type: "text";
        },
        {
          label: "Choose favorite language aria label part 2";
          name: "chooseFavoriteLanguageAriaLabelPart2";
          default: "as favorite language";
          type: "text";
        },
        {
          label: "Choose language aria label";
          name: "chooseLanguageAriaLabel";
          default: "Choose language";
          type: "text";
        },
        {
          label: "Language selection label";
          name: "selectLanguage";
          default: "Language";
          type: "text";
        },
        {
          label: "Copyright";
          name: "footerCopyright";
          default: "Copyright © 2023 · All Rights Reserved · National Centre of Multicultural Education (NAFO), OsloMet";
          type: "text";
        },
        {
          label: "Header title";
          name: "headerTitle";
          default: "Bildetema";
          type: "text";
        },
        {
          label: "Header subtitle";
          name: "headerSubtitle";
          default: "Multilingual visual dictionary";
          type: "text";
        },
        {
          label: "Header OsloMet logo aria label";
          name: "headerOsloMetlogoAriaLabel";
          default: "OsloMet - Oslo Metropolitan University";
          type: "text";
        },
        {
          label: "Topic size big";
          name: "bigTopics";
          default: "Show topics in grid view";
          type: "text";
        },
        {
          label: "Topic size compact";
          name: "compactTopics";
          default: "Show topics in list view";
          type: "text";
        },
        {
          label: "Previous image label";
          name: "prevImageLabel";
          default: "Previous image";
          type: "text";
        },
        {
          label: "Next image label";
          name: "nextImageLabel";
          default: "Next image";
          type: "text";
        },
        {
          label: "No topic selected";
          name: "noTopicSelected";
          default: "No topic selected.";
          type: "text";
        },
        {
          label: "Topic image label";
          name: "viewTopicImage";
          default: "Overview image";
          type: "text";
        },
        {
          label: "Grid label";
          name: "viewGrid";
          default: "Single photos";
          type: "text";
        },
        {
          label: "Select language link part 1";
          name: "selectLanguageLinkPart1";
          default: "Not the language you are looking for? Go to";
          type: "text";
        },
        {
          label: "Select language link part 2";
          name: "selectLanguageLinkPart2";
          default: "old Bildetema";
          type: "text";
        },
        {
          label: "Arabic";
          name: "lang_ara";
          default: "Arabic";
          type: "text";
        },
        {
          label: "Kurdish (Sorani)";
          name: "lang_ckb";
          default: "Kurdish (Sorani)";
          type: "text";
        },
        {
          label: "Danish";
          name: "lang_dan";
          default: "Danish";
          type: "text";
        },
        {
          label: "English";
          name: "lang_eng";
          default: "English";
          type: "text";
        },
        {
          label: "Persian";
          name: "lang_fas";
          default: "Persian";
          type: "text";
        },
        {
          label: "Filipino";
          name: "lang_fil";
          default: "Filipino";
          type: "text";
        },
        {
          label: "French";
          name: "lang_fra";
          default: "French";
          type: "text";
        },
        {
          label: "Icelandic";
          name: "lang_isl";
          default: "Icelandic";
          type: "text";
        },
        {
          label: "Kurdish (Kurmanji)";
          name: "lang_kmr";
          default: "Kurdish (Kurmanji)";
          type: "text";
        },
        {
          label: "Lithuanian";
          name: "lang_lit";
          default: "Lithuanian";
          type: "text";
        },
        {
          label: "Norwegian (nynorsk)";
          name: "lang_nno";
          default: "Norwegian (nynorsk)";
          type: "text";
        },
        {
          label: "Norwegian (bokmål)";
          name: "lang_nob";
          default: "Norwegian (bokmål)";
          type: "text";
        },
        {
          label: "Polish";
          name: "lang_pol";
          default: "Polish";
          type: "text";
        },
        {
          label: "Dari";
          name: "lang_prs";
          default: "Dari";
          type: "text";
        },
        {
          label: "Pashto";
          name: "lang_pus";
          default: "Pashto";
          type: "text";
        },
        {
          label: "Romanian";
          name: "lang_ron";
          default: "Romanian";
          type: "text";
        },
        {
          label: "Russian";
          name: "lang_rus";
          default: "Russian";
          type: "text";
        },
        {
          label: "Northern Sami";
          name: "lang_sme";
          default: "Northern Sami";
          type: "text";
        },
        {
          label: "Somali";
          name: "lang_som";
          default: "Somali";
          type: "text";
        },
        {
          label: "Spanish";
          name: "lang_spa";
          default: "Spanish";
          type: "text";
        },
        {
          label: "Swahili";
          name: "lang_swa";
          default: "Swahili";
          type: "text";
        },
        {
          label: "Swedish";
          name: "lang_swe";
          default: "Swedish";
          type: "text";
        },
        {
          label: "Thai";
          name: "lang_tha";
          default: "Thai";
          type: "text";
        },
        {
          label: "Tigrinya";
          name: "lang_tir";
          default: "Tigrinya";
          type: "text";
        },
        {
          label: "Turkish";
          name: "lang_tur";
          default: "Turkish";
          type: "text";
        },
        {
          label: "Ukrainian";
          name: "lang_ukr";
          default: "Ukrainian";
          type: "text";
        },
        {
          label: "Urdu";
          name: "lang_urd";
          default: "Urdu";
          type: "text";
        },
        {
          label: "Vietnamese";
          name: "lang_vie";
          default: "Vietnamese";
          type: "text";
        },
      ];
    },
    {
      label: "Default languages";
      description: "There should be up to three default languages. These are defaults for the current site language. We recommend adding three of them";
      name: "defaultLanguages";
      type: "list";
      entity: "Language";
      field: {
        label: "Language";
        name: "languageCode";
        type: "select";
        default: "nob";
        options: [
          {
            label: "Arabic";
            value: "ara";
          },
          {
            label: "Kurdish (Sorani)";
            value: "ckb";
          },
          {
            label: "Danish";
            value: "dan";
          },
          {
            label: "English";
            value: "eng";
          },
          {
            label: "Persian";
            value: "fas";
          },
          {
            label: "Filipino";
            value: "fil";
          },
          {
            label: "French";
            value: "fra";
          },
          {
            label: "Icelandic";
            value: "isl";
          },
          {
            label: "Kurdish (Kurmanji)";
            value: "kmr";
          },
          {
            label: "Lithuanian";
            value: "lit";
          },
          {
            label: "Norwegian (nynorsk)";
            value: "nno";
          },
          {
            label: "Norwegian (bokmål)";
            value: "nob";
          },
          {
            label: "Polish";
            value: "pol";
          },
          {
            label: "Dari";
            value: "prs";
          },
          {
            label: "Pashto";
            value: "pus";
          },
          {
            label: "Romanian";
            value: "ron";
          },
          {
            label: "Russian";
            value: "rus";
          },
          {
            label: "Northern Sami";
            value: "sme";
          },
          {
            label: "Somali";
            value: "som";
          },
          {
            label: "Spanish";
            value: "spa";
          },
          {
            label: "Swahili";
            value: "swa";
          },
          {
            label: "Swedish";
            value: "swe";
          },
          {
            label: "Thai";
            value: "tha";
          },
          {
            label: "Tigrinya";
            value: "tir";
          },
          {
            label: "Turkish";
            value: "tur";
          },
          {
            label: "Ukrainian";
            value: "ukr";
          },
          {
            label: "Urdu";
            value: "urd";
          },
          {
            label: "Vietnamese";
            value: "vie";
          },
        ];
      };
    },
    {
      label: "Backend Url";
      description: "The Url to the json database";
      default: "";
      name: "backendUrl";
      type: "text";
    },
  ];

  type Expected = {
    l10n: {
      htmlLanguageCode: string;
      pageIsLoading: string;
      mainContentLink: string;
      mainContentAriaLabel: string;
      showWrittenWordsLabel: string;
      showArticlesLabel: string;
      printLabel: string;
      printImgLabel: string;
      playAudio: string;
      stopAudio: string;
      footerAboutLabel: string;
      footerAboutHref: string;
      footerContactInfoLabel: string;
      footerContactInfoHref: string;
      footerPrevBildetemaLabel: string;
      footerPrevBildetemaHref: string;
      footerNAFOLabel: string;
      footerNAFOHref: string;
      footerLink1Label: string;
      footerLink1Href: string;
      footerLink2Label: string;
      footerLink2Href: string;
      footerPrivacyStatementLabel: string;
      footerPrivacyStatementHref: string;
      footerAccessibilityStatementLabel: string;
      footerAccessibilityStatementHref: string;
      footerCreativeCommonsImgAlt: string;
      footerCreativeCommonsText: string;
      footerCreativeCommonsLinkURL: string;
      footerCreativeCommonsLinkText: string;
      breadcrumbsAriaLabel: string;
      breadcrumbsTopic: string;
      breadcrumbsHome: string;
      favoriteLanguagesAriaLabel: string;
      chooseFavoriteLanguageAriaLabelPart1: string;
      chooseFavoriteLanguageAriaLabelPart2: string;
      chooseLanguageAriaLabel: string;
      selectLanguage: string;
      footerCopyright: string;
      headerTitle: string;
      headerSubtitle: string;
      headerOsloMetlogoAriaLabel: string;
      bigTopics: string;
      compactTopics: string;
      prevImageLabel: string;
      nextImageLabel: string;
      noTopicSelected: string;
      viewTopicImage: string;
      viewGrid: string;
      selectLanguageLinkPart1: string;
      selectLanguageLinkPart2: string;
      lang_ara: string;
      lang_ckb: string;
      lang_dan: string;
      lang_eng: string;
      lang_fas: string;
      lang_fil: string;
      lang_fra: string;
      lang_isl: string;
      lang_kmr: string;
      lang_lit: string;
      lang_nno: string;
      lang_nob: string;
      lang_pol: string;
      lang_prs: string;
      lang_pus: string;
      lang_ron: string;
      lang_rus: string;
      lang_sme: string;
      lang_som: string;
      lang_spa: string;
      lang_swa: string;
      lang_swe: string;
      lang_tha: string;
      lang_tir: string;
      lang_tur: string;
      lang_ukr: string;
      lang_urd: string;
      lang_vie: string;
    };
    defaultLanguages: Array<
      | "ara"
      | "ckb"
      | "dan"
      | "eng"
      | "fas"
      | "fil"
      | "fra"
      | "isl"
      | "kmr"
      | "lit"
      | "nno"
      | "nob"
      | "pol"
      | "prs"
      | "pus"
      | "ron"
      | "rus"
      | "sme"
      | "som"
      | "spa"
      | "swa"
      | "swe"
      | "tha"
      | "tir"
      | "tur"
      | "ukr"
      | "urd"
      | "vie"
    >;
    backendUrl: string;
  };

  type Actual = InferParamsFromSemantics<typeof $defaultExport>;

  // @ts-ignore Test
  type Test = Expect<AreEqual<Actual, Expected>>;
}
