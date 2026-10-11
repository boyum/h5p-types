import { findDuplicates } from "./array.utils.js";

describe("findDuplicates", () => {
  it("returns an empty array when no value is repeated", () => {
    expect(findDuplicates(["open", "close", "submit"])).toEqual([]);
  });

  it("returns a single entry for a value repeated exactly twice", () => {
    expect(findDuplicates(["open", "open", "close"])).toEqual(["open"]);
  });

  it("de-duplicates the duplicate list itself", () => {
    expect(findDuplicates(["open", "open", "open", "close", "close"])).toEqual([
      "open",
      "close",
    ]);
  });

  it("returns one entry when every value is identical", () => {
    expect(findDuplicates(["same", "same", "same", "same"])).toEqual(["same"]);
  });

  it("returns an empty array for an empty input", () => {
    expect(findDuplicates([])).toEqual([]);
  });

  it("returns an empty array for a single element", () => {
    expect(findDuplicates(["only"])).toEqual([]);
  });

  it("preserves the order in which values are first repeated", () => {
    expect(findDuplicates(["beta", "alpha", "beta", "alpha"])).toEqual([
      "beta",
      "alpha",
    ]);
  });

  it("reports every distinct duplicated value", () => {
    const duplicates = findDuplicates(["a", "b", "c", "a", "b", "c", "d"]);

    expect(duplicates).toEqual(["a", "b", "c"]);
    expect(new Set(duplicates).size).toBe(duplicates.length);
  });

  it("finds duplicate numbers", () => {
    expect(findDuplicates([1, 2, 3, 1, 2])).toEqual([1, 2]);
  });

  it("finds duplicate booleans", () => {
    expect(findDuplicates([true, false, true, false])).toEqual([true, false]);
  });

  it("treats 0 and false as distinct values", () => {
    expect(findDuplicates([0, false, 0, false])).toEqual([0, false]);
  });
});
