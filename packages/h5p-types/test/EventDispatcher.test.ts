/** biome-ignore-all lint/correctness/noUnusedVariables: Test namespaces */

import type { EventDispatcher, H5PEvent, XAPIEvent } from "..";
import type { AreEqual, Expect } from "../src/test-utility-types";

// @ts-expect-error Test
namespace Test_OnXAPIEvent {
  declare const contentType: EventDispatcher;

  // biome-ignore lint/correctness/noUnusedFunctionParameters: Used for type testing
  contentType.on("xAPI", (event) => {
    type Actual = typeof event;
    type Expected = XAPIEvent;

    // @ts-expect-error Test
    type Test =
      // biome-ignore format: Avoid `@ts-expect-error` from ignoring test assertion
      Expect<AreEqual<Actual, Expected>>;
  });
}

// @ts-expect-error Test
namespace Test_OnAnyEvent {
  declare const contentType: EventDispatcher;

  // biome-ignore lint/correctness/noUnusedFunctionParameters: Used for type testing
  contentType.on("anything-else", (event) => {
    type Actual = typeof event;
    type Expected = H5PEvent;

    // @ts-expect-error Test
    type Test =
      // biome-ignore format: Avoid `@ts-expect-error` from ignoring test assertion
      Expect<AreEqual<Actual, Expected>>;
  });
}

// @ts-expect-error Test
namespace Test_OnceXAPIEvent {
  declare const contentType: EventDispatcher;

  // biome-ignore lint/correctness/noUnusedFunctionParameters: Used for type testing
  contentType.once("xAPI", (event) => {
    type Actual = typeof event;
    type Expected = XAPIEvent;

    // @ts-expect-error Test
    type Test =
      // biome-ignore format: Avoid `@ts-expect-error` from ignoring test assertion
      Expect<AreEqual<Actual, Expected>>;
  });
}

// @ts-expect-error Test
namespace Test_OnceAnyEvent {
  declare const contentType: EventDispatcher;

  // biome-ignore lint/correctness/noUnusedFunctionParameters: Used for type testing
  contentType.once("anything-else", (event) => {
    type Actual = typeof event;
    type Expected = H5PEvent;

    // @ts-expect-error Test
    type Test =
      // biome-ignore format: Avoid `@ts-expect-error` from ignoring test assertion
      Expect<AreEqual<Actual, Expected>>;
  });
}

// @ts-expect-error Test
namespace Test_TriggerXAPIScored {
  declare const contentType: EventDispatcher;

  contentType.triggerXAPIScored(3, 4, "answered", true, true);

  // @ts-expect-error Verb must be a known xAPI verb
  contentType.triggerXAPIScored(3, 4, "not-a-verb", true, true);
}

// @ts-expect-error Test
namespace Test_TriggerXAPICompleted {
  declare const contentType: EventDispatcher;

  contentType.triggerXAPICompleted(3, 4, true);
}

// @ts-expect-error Test
namespace Test_SetActivityStarted {
  declare const contentType: EventDispatcher;

  contentType.setActivityStarted();
}
