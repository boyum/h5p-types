import type { OptionType } from "../types/OptionType";
import { getOption } from "./cli.utils";

describe("CLI Utils", () => {
  describe(getOption.name, () => {
    it("should return the named option if it exists", () => {
      const name = "name";
      const value = "value";

      const options = {
        [name]: value,
      };

      const optionType: OptionType = {
        name,
      };

      const expected = value;
      const actual = getOption(options, optionType);

      expect(actual).toBe(expected);
    });

    it("should return undefined if no values exists for the given option", () => {
      const name = "name";

      const options = {};

      const optionType: OptionType = {
        name,
      };

      const expected = undefined;
      const actual = getOption(options, optionType);

      expect(actual).toBe(expected);
    });

    it("should return the aliased option if it exists", () => {
      const alias = "a";
      const value = "value";

      const options = {
        [alias]: value,
      };

      const optionType: OptionType = {
        name: "",
        alias,
      };

      const expected = value;
      const actual = getOption(options, optionType);

      expect(actual).toBe(expected);
    });

    it("should return the aliased option if it exists", () => {
      const alias = "a";
      const value = "value";

      const options = {
        [alias]: value,
      };

      const optionType: OptionType = {
        name: "",
        alias,
      };

      const expected = value;
      const actual = getOption(options, optionType);

      expect(actual).toBe(expected);
    });

    it("should prefer named options before aliased options", () => {
      const name = "name";
      const alias = "a";
      const nameValue = "nameValue";
      const aliasValue = "aliasValue";

      const options = {
        [name]: nameValue,
        [alias]: aliasValue,
      };

      const optionType: OptionType = {
        name,
        alias,
      };

      const expected = nameValue;
      const actual = getOption(options, optionType);

      expect(actual).toBe(expected);
    });
  });
});
