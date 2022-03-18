import * as React from "react";
import * as ReactDOM from "react-dom";
import { H5PFieldText } from "../src/types/H5PField";
import { H5PWidget } from "../src/types/H5PWidget";
import { IH5PWidget } from "../src/types/IH5PWidget";

type Field = H5PFieldText;

export class MyWidget extends H5PWidget<Field> implements IH5PWidget {
  appendTo($container: JQuery<HTMLElement>): void {
    const containerElement = $container.get(0);
    if (!containerElement) {
      console.error("Found no containing element to attach `MyWidget` to.");
      return;
    }

    const { field, params: name, setValue, wrapper } = this;

    wrapper.classList.add("field", `field-name-${field.name}`);
    containerElement.appendChild(wrapper);

    ReactDOM.render(
      <label>
        Insert name{" "}
        <input
          type="text"
          onChange={(event) => setValue(field, event.target.value)}
          value={name}
        />
      </label>,
      wrapper
    );
  }

  validate(): boolean {
    return true;
  }

  remove(): void {}
}
