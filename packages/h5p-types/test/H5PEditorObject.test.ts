/** biome-ignore-all lint/correctness/noUnusedVariables: Test namespaces */

import type { H5PEditorObject } from "..";

// @ts-expect-error Test
namespace Test_H5PEditorObject_init {
  declare const H5PEditor: H5PEditorObject;

  H5PEditor.init(
    $("form"),
    $("input[type='radio']"),
    $("#upload"),
    $("#create"),
    $("#editor"),
    $("#library"),
    $("#params"),
    $("#maxScore"),
    $("#title"),
  );
}

// @ts-expect-error Test
namespace Test_H5PEditorObject_getAjaxUrl {
  declare const H5PEditor: H5PEditorObject;

  const result: string = H5PEditor.getAjaxUrl("libraries", {
    language: "en",
  });

  void result;

  // @ts-expect-error Returns a string, not a number
  const wrongType: number = H5PEditor.getAjaxUrl("libraries");
}

// @ts-expect-error Test
namespace Test_H5PEditorObject_attachToastTo {
  declare const H5PEditor: H5PEditorObject;

  H5PEditor.attachToastTo(document.body, "message");
}
