/** biome-ignore-all lint/correctness/noUnusedVariables: Test namespaces */

import { H5PTooltip } from "..";

// @ts-expect-error Test
namespace Test_H5PTooltip_Constructor {
  const tooltip = new H5PTooltip(document.createElement("div"), {
    text: "Hello",
    position: "top",
    classes: ["my-class"],
    ariaHidden: false,
    tooltipSource: "aria-label",
  });

  tooltip.setText("New text");
  tooltip.hide();
  tooltip.getElement();
  tooltip.remove();

  // @ts-expect-error Position must be a valid position
  const invalidPosition: "top" | "left" | "bottom" | "right" = "center";
}
