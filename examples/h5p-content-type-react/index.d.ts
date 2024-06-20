import type { TranslationKey } from "./src/types/semantics";

declare module "use-h5p" {
  interface CustomTypeOptions {
    translationKeys: TranslationKey;
  }
}
