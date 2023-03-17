/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/ban-ts-comment, @typescript-eslint/no-namespace */

import type { AreEqual, Expect } from "../src/test-utility-types";
import type { EventDispatcher } from "../src/types/EventDispatcher";
import type { H5PEvent } from "../src/types/H5PEvent";
import type { XAPIEvent } from "../src/types/XAPI/XAPIEvent";

// @ts-ignore Test
namespace Test_OnXAPIEvent {
  declare const contentType: EventDispatcher;

  contentType.on("xAPI", event => {
    type Actual = typeof event;
    type Expected = XAPIEvent;

    // @ts-ignore Test
    type Test =
      // prettier-ignore
      Expect<AreEqual<Actual, Expected>>;
  });
}

// @ts-ignore Test
namespace Test_OnAnyEvent {
  declare const contentType: EventDispatcher;

  contentType.on("anything-else", event => {
    type Actual = typeof event;
    type Expected = H5PEvent;

    // @ts-ignore Test
    type Test =
      // prettier-ignore
      Expect<AreEqual<Actual, Expected>>;
  });
}

// @ts-ignore Test
namespace Test_OnceXAPIEvent {
  declare const contentType: EventDispatcher;

  contentType.once("xAPI", event => {
    type Actual = typeof event;
    type Expected = XAPIEvent;

    // @ts-ignore Test
    type Test =
      // prettier-ignore
      Expect<AreEqual<Actual, Expected>>;
  });
}

// @ts-ignore Test
namespace Test_OnceAnyEvent {
  declare const contentType: EventDispatcher;

  contentType.once("anything-else", event => {
    type Actual = typeof event;
    type Expected = H5PEvent;

    // @ts-ignore Test
    type Test =
      // prettier-ignore
      Expect<AreEqual<Actual, Expected>>;
  });
}
