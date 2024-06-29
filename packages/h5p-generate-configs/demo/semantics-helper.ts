export const getPosition = (direction: string) =>
  ({
    label: direction.toUpperCase(),
    name: direction,
    type: "number",
    min: 0,
    max: 100,
    decimals: 3,
  }) as const;
