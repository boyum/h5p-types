import type { EventDispatcher, H5PEvent, XAPIEvent } from "..";
import type { AreEqual, Expect } from "../src/test-utility-types";

// @ts-ignore Test
namespace Test_OnXAPIEvent {
  declare const contentType: EventDispatcher;

  contentType.on("xAPI", (event) => {
    type Actual = typeof event;
    type Expected = XAPIEvent;

    // @ts-ignore Test
    type Test =
      // biome-ignore format: Avoid `@ts-ignore` from ignoring test assertion
      Expect<AreEqual<Actual, Expected>>;
  });
}

// @ts-ignore Test
namespace Test_OnAnyEvent {
  declare const contentType: EventDispatcher;

  contentType.on("anything-else", (event) => {
    type Actual = typeof event;
    type Expected = H5PEvent;

    // @ts-ignore Test
    type Test =
      // biome-ignore format: Avoid `@ts-ignore` from ignoring test assertion
      Expect<AreEqual<Actual, Expected>>;
  });
}

// @ts-ignore Test
namespace Test_OnceXAPIEvent {
  declare const contentType: EventDispatcher;

  contentType.once("xAPI", (event) => {
    type Actual = typeof event;
    type Expected = XAPIEvent;

    // @ts-ignore Test
    type Test =
      // biome-ignore format: Avoid `@ts-ignore` from ignoring test assertion
      Expect<AreEqual<Actual, Expected>>;
  });
}

// @ts-ignore Test
namespace Test_OnceAnyEvent {
  declare const contentType: EventDispatcher;

  contentType.once("anything-else", (event) => {
    type Actual = typeof event;
    type Expected = H5PEvent;

    // @ts-ignore Test
    type Test =
      // biome-ignore format: Avoid `@ts-ignore` from ignoring test assertion
      Expect<AreEqual<Actual, Expected>>;
  });
}
