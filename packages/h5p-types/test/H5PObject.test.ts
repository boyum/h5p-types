/** biome-ignore-all lint/correctness/noUnusedVariables: Test namespaces */

import type { H5PObject } from "..";

// @ts-expect-error Test
namespace Test_H5PObject_ExternalDispatcher {
  declare const H5P: H5PObject;

  H5P.externalDispatcher.on("xAPI", (event) => {
    event.getScore();
  });
}

// @ts-expect-error Test
namespace Test_H5PObject_FullscreenDisabled {
  declare const H5P: H5PObject;

  const fullscreenDisabled: boolean = H5P.fullscreenDisabled;

  // @ts-expect-error Not a string
  const notAString: string = H5P.fullscreenDisabled;

  void fullscreenDisabled;
}

// @ts-expect-error Test
namespace Test_H5PObject_NewClasses {
  declare const H5P: H5PObject;

  const actionBar = new H5P.ActionBar({
    export: true,
    copyright: true,
  });
  actionBar.hasActions();
  actionBar.getDOMElement();

  const requestQueue = new H5P.RequestQueue({ showToast: true });
  requestQueue.add("https://example.com", {});
  requestQueue.resumeQueue();

  new H5P.ContentUpgradeProcess(
    "Foo 1.0",
    new H5P.Version("1.0"),
    new H5P.Version("2.0"),
    "{}",
    1,
    (_name, _version, next) => next(),
    (_error, _result) => {},
  );

  const tooltip = new H5P.Tooltip(document.createElement("div"));
  tooltip.hide();
  tooltip.remove();
  tooltip.setText("text");
  tooltip.getElement();

  const ContentType = H5P.ContentType(true);
  const contentType = new ContentType();
  contentType.isRoot();
  contentType.getLibraryFilePath("/file.js");
}
