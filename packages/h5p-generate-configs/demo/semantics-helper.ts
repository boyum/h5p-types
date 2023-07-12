import type { H5PFieldNumber } from "h5p-types";

export const getPosition = (direction: string): H5PFieldNumber => ({
  label: direction.toUpperCase(),
  name: direction,
  type: "number",
  min: 0,
  max: 100,
  decimals: 3,
});
