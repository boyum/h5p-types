/** biome-ignore-all lint/correctness/noUnusedVariables: Test namespaces */

import type { H5PIntegrationObject } from "..";

// @ts-expect-error Test
namespace Test_H5PIntegrationObject_FullShape {
  const integration: H5PIntegrationObject = {
    baseUrl: "https://example.com",
    url: "https://example.com",
    postUserStatistics: true,
    ajax: {
      setFinished: "/setFinished",
      contentUserData: "/contentUserData",
    },
    saveFreq: 30,
    reportingIsEnabled: true,
    l10n: {
      H5P: {
        Fullscreen: "Fullscreen",
      },
    },
    hubIsEnabled: false,
    crossorigin: "",
    crossoriginCacheBuster: "?buster",
    libraryConfig: {},
    pluginCacheBuster: "?cache",
    libraryUrl: "/libraries",
    contents: {
      "cid-1": {
        library: "H5P.Foo 1.0",
        jsonContent: "{}",
      },
    },
    core: {
      scripts: ["/core.js"],
      styles: ["/core.css"],
    },
  };

  void integration;
}

// @ts-expect-error Test
namespace Test_H5PIntegrationObject_EnrichedFields {
  declare const integration: H5PIntegrationObject;

  const siteUrl: string | undefined = integration.siteUrl;
  const fullscreenDisabled: boolean | undefined =
    integration.fullscreenDisabled;
  const themeDensity: "large" | "medium" | "small" | undefined =
    integration.theme?.density;

  const user = integration.user;
  const userId: number | undefined = user?.id;
  const userName: string | undefined = user?.name;

  const content = integration.contents["cid-1"];
  const library: string | undefined = content?.library;
  const jsonContent: string | undefined = content?.jsonContent;
  const displayOptions = content?.displayOptions;
  const embedCode: string | undefined = content?.embedCode;

  const editor = integration.editor;
  const ajaxPath: string | undefined = editor?.ajaxPath;
  const language: string | undefined = editor?.language;
  const assetsCss: Array<string> | undefined = editor?.assets.css;
  const hubUrl: string | undefined = editor?.hub?.contentSearchUrl;
  const nodeVersionId: number | undefined = editor?.nodeVersionId;

  void siteUrl;
  void fullscreenDisabled;
  void themeDensity;
  void userId;
  void userName;
  void library;
  void jsonContent;
  void displayOptions;
  void embedCode;
  void ajaxPath;
  void language;
  void assetsCss;
  void hubUrl;
  void nodeVersionId;
}

// @ts-expect-error Test
namespace Test_H5PIntegrationObject_ContentsIsKeyedByContentId {
  declare const integration: H5PIntegrationObject;

  // @ts-expect-error Invalid format, must be `cid-<contentId>`
  integration.contents["1"];
}
