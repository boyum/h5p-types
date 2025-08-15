import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { L10nContext } from "../contexts/LocalizationContext";
import type { Translations } from "../types/Translations";

import { useTranslation } from "./useTranslation";

describe(useTranslation.name, () => {
  describe("t", () => {
    it("should translate strings based on given context", () => {
      const translations = { title: "Title" } satisfies Translations;

      const Component = () => {
        const { t } = useTranslation<keyof typeof translations>();

        // biome-ignore lint/correctness/useUniqueElementIds: It's safe to use a static ID here for testing purposes.
        return <span id="test">{t("title")}</span>;
      };

      const { container } = render(
        <L10nContext.Provider value={translations}>
          <Component />
        </L10nContext.Provider>,
      );

      const expected = translations.title;
      const actual = container.querySelector("#test")?.innerHTML;

      expect(actual).toBe(expected);
    });

    it("should show an error if the queried translation key does not exist in the translation set", () => {
      const translations: Translations = { title: "Title" };

      const Component = () => {
        const { t } = useTranslation();

        // biome-ignore lint/correctness/useUniqueElementIds: It's safe to use a static ID here for testing purposes.
        return <span id="test">{t("missingTranslation")}</span>;
      };

      const { container } = render(
        <L10nContext.Provider value={translations}>
          <Component />
        </L10nContext.Provider>,
      );

      const expected = "[Missing translation: missingTranslation]";
      const actual = container.querySelector("#test")?.innerHTML;

      expect(actual).toBe(expected);
    });
  });

  describe("tOpts", () => {
    it("should interpolate strings based on given context", () => {
      const translations = { title: "Hello, {name}!" } satisfies Translations;

      const Component = () => {
        const { tOpts } = useTranslation<keyof typeof translations>();

        // biome-ignore lint/correctness/useUniqueElementIds: It's safe to use a static ID here for testing purposes.
        return <span id="test">{tOpts("title", { "{name}": "World" })}</span>;
      };

      const { container } = render(
        <L10nContext.Provider value={translations}>
          <Component />
        </L10nContext.Provider>,
      );

      const expected = "Hello, World!";
      const actual = container.querySelector("#test")?.innerHTML;

      expect(actual).toBe(expected);
    });
  });
});
