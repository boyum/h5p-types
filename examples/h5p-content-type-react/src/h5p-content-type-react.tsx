import type { H5PExtras, IH5PContentType } from "h5p-types";
import { H5PContentType, registerContentType } from "h5p-utils";
import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  ContentIdContext,
  H5PContext,
  LocalizationContext,
  useContentId,
  useH5PInstance,
  useTranslation,
} from "use-h5p";
import library from "../library.json";
import { Params } from "./types/semantics.js";

const DemoApp: React.FC = () => {
  const contentId = useContentId();
  const h5pInstance = useH5PInstance();

  const { t } = useTranslation();

  return (
    <>
      <button type="button" onClick={() => h5pInstance.trigger("my-event")}>
        Click me
      </button>
      <span className="content-id">{contentId}</span>
      <span className="h5p-instance">{JSON.stringify(h5pInstance)}</span>
      <span className="label">{t("answerModeLabel")}</span>
    </>
  );
};

export class ContentType
  extends H5PContentType<Params>
  implements IH5PContentType
{
  constructor(params: Params, contentId: string, extras?: H5PExtras) {
    super(params, contentId, extras);

    const { l10n } = this.params;

    const root = createRoot(this.wrapper);
    root.render(
      <ContentIdContext.Provider value={contentId}>
        <H5PContext.Provider value={this}>
          <LocalizationContext.Provider value={l10n ?? {}}>
            <DemoApp />
          </LocalizationContext.Provider>
        </H5PContext.Provider>
      </ContentIdContext.Provider>,
    );
  }

  attach($container: JQuery<HTMLElement>): void {
    const containerElement = $container.get(0);
    if (!containerElement) {
      console.error(
        "Found no containing element to attach `h5p-content-type` to.",
      );
      return;
    }

    containerElement.appendChild(this.wrapper);
    containerElement.classList.add("h5p-content-type");
  }
}

const contentTypeName = library.machineName.replace("H5P.", "");
registerContentType(contentTypeName, ContentType);
