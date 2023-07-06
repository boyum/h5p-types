# use-h5p

React Hooks to be used with H5P.

## Install

`npm i use-h5p`

## API

### `ContentIdContext` / `useContentId`

A few functions on the global H5P object (such as `H5P.getPath`) takes a content id as input.
In those cases, it's nice to have the content id readily available.
Add the content id to the `ContentIdContext` and use `useContentId` in child components to get the current content id.

`index.ts`:

```tsx
import type { IH5PContentType } from "h5p-types";
import { H5PContentType, registerContentType } from "h5p-utils";
import { createRoot } from "react-dom/client";
import { ContentIdContext } from "use-h5p";
import { MyComponent } from "./my-component";

class MyContentType extends H5PContentType implements IH5PContentType {
  attach($container: JQuery<HTMLElement>) {
    const containerElement = $container.get(0)!;

    const { contentId } = this;

    const root = createRoot(containerElement);
    root.render(
      <ContentIdContext.Provider value={contentId}>
        <MyComponent />
      </ContentIdContext.Provider>,
    );
  }
}

registerContentType("MyContentType", MyContentType);
```

`my-component.ts`:

```tsx
import { H5P } from "h5p-utils";
import * as React from "react";
import { useContentId } from "use-h5p";

export const MyComponent: React.FC = () => {
  const contentId = useContentId();
  const absoluteImageUrl = H5P.getPath("relative/image/path", contentId);

  return <img src={absoluteImageUrl} alt="" />;
};
```

### `H5PContext` / `useH5PInstance`

By adding the H5P instance to context, we're able to access it when we want to use functions such as `H5P.fullscreen` which takes the instance as a parameter.

`index.ts`:

```tsx
import type { IH5PContentType } from "h5p-types";
import { H5PContentType, registerContentType } from "h5p-utils";
import { createRoot } from "react-dom/client";
import { H5PContext } from "use-h5p";
import { MyComponent } from "./my-component";

class MyContentType extends H5PContentType implements IH5PContentType {
  attach($container: JQuery<HTMLElement>) {
    const containerElement = $container.get(0)!;

    const root = createRoot(containerElement);
    root.render(
      <H5PContext.Provider value={this}>
        <MyComponent />
      </H5PContext.Provider>,
    );
  }
}

registerContentType("MyContentType", MyContentType);
```

`my-component.ts`:

```tsx
import { H5P } from "h5p-utils";
import * as React from "react";
import { useH5PInstance } from "use-h5p";

export const MyComponent: React.FC = () => {
  const elementRef = React.useRef<HTMLDivElement>(null);
  const contentType = useH5PInstance();

  const triggerFullscreen = () => {
    const $fullscreenElement = H5P.jQuery(elementRef.current!);
    H5P.fullscreen($fullscreenElement, contentType);
  };

  return (
    <div ref={elementRef}>
      <button type="button" onClick={triggerFullscreen}>
        Fullscreen
      </button>
    </div>
  );
};
```

### `L10nContext` / `useTranslation`

The `useTranslation` hook exposes a `t` function that lets you get translations from semantics.

`index.ts`:

```tsx
import type { IH5PContentType } from "h5p-types";
import { H5PContentType, registerContentType } from "h5p-utils";
import { createRoot } from "react-dom/client";
import { L10nContext } from "use-h5p";
import { MyComponent } from "./my-component";

type Params = {
  l10n: Record<"title" | "description", string>;
};

class MyContentType
  extends H5PContentType<Params>
  implements IH5PContentType<Params>
{
  attach($container: JQuery<HTMLElement>) {
    const containerElement = $container.get(0)!;

    const root = createRoot(containerElement);
    root.render(
      <L10nContext.Provider value={this.params.l10n}>
        <MyComponent />
      </L10nContext.Provider>,
    );
  }
}

registerContentType("MyContentType", MyContentType);
```

`my-component.ts`:

```tsx
import { H5P } from "h5p-utils";
import * as React from "react";
import { useTranslation } from "use-h5p";

export const MyComponent: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>
    </>
  );
};
```
