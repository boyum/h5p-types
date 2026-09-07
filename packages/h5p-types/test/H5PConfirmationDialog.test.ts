/** biome-ignore-all lint/correctness/noUnusedVariables: Test namespaces */

import { H5PConfirmationDialog } from "..";

// @ts-expect-error Test
namespace Test_H5PConfirmationDialog_Options {
  const dialog = new H5PConfirmationDialog({
    headerText: "Header",
    theme: true,
    classes: ["custom-class"],
    skipRestoreFocus: true,
  });

  void dialog;
}

// @ts-expect-error Test
namespace Test_H5PConfirmationDialog_Methods {
  declare const dialog: H5PConfirmationDialog;

  const afterAppend: H5PConfirmationDialog = dialog.appendTo(document.body);
  const afterShow: H5PConfirmationDialog = dialog.show(10);
  const afterHide: H5PConfirmationDialog = dialog.hide();

  const element: HTMLElement = dialog.getElement();
  const previouslyFocused: HTMLElement = dialog.getPreviouslyFocused();

  dialog.setViewPortMinimumHeight(500);
  dialog.setViewPortMinimumHeight(null);

  void afterAppend;
  void afterShow;
  void afterHide;
  void element;
  void previouslyFocused;
}
