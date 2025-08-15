/** biome-ignore-all lint/correctness/noUnusedVariables: Test namespaces */

import type { TranslationHasParams, TranslationParams } from "..";
import type { AreEqual, Expect } from "../src/test-utility-types";

// @ts-expect-error Test
namespace Test_InferParams_One {
  type Expected = {
    ":count": string;
  };

  type Actual = TranslationParams<":count cats">;

  // @ts-expect-error Test
  type Test =
    // biome-ignore format: Avoid `@ts-expect-error` from ignoring test assertion
    Expect<AreEqual<Actual, Expected>>;
}

// @ts-expect-error Test
namespace Test_InferParams_Multiple {
  type Expected = {
    ":count": string;
    ":animal": string;
    ":zoo-name": string;
    ":adjective": string;
  };

  type Actual =
    TranslationParams<"We have :count :animal in :zoo-name. They are :adjective!">;

  // @ts-expect-error Test
  type Test =
    // biome-ignore format: Avoid `@ts-expect-error` from ignoring test assertion
    Expect<AreEqual<Actual, Expected>>;
}

// @ts-expect-error Test
namespace Test_InferParams_MultiLine {
  type Expected = {
    ":count": string;
    ":animal": string;
    ":zoo-name": string;
    ":adjective": string;
  };

  type Actual = TranslationParams<`We have :count :animal in :zoo-name.
  They are :adjective!`>;

  // @ts-expect-error Test
  type Test =
    // biome-ignore format: Avoid `@ts-expect-error` from ignoring test assertion
    Expect<AreEqual<Actual, Expected>>;
}

// @ts-expect-error Test
namespace Test_HasParams_True {
  type Expected = true;

  type Actual = TranslationHasParams<":count cat">;

  // @ts-expect-error Test
  type Test =
    // biome-ignore format: Avoid `@ts-expect-error` from ignoring test assertion
    Expect<AreEqual<Actual, Expected>>;
}

// @ts-expect-error Test
namespace Test_HasParams_True {
  type Expected = true;

  type Actual = TranslationHasParams<"Our :count cats">;

  // @ts-expect-error Test
  type Test =
    // biome-ignore format: Avoid `@ts-expect-error` from ignoring test assertion
    Expect<AreEqual<Actual, Expected>>;
}

// @ts-expect-error Test
namespace Test_HasParams_False {
  type Expected = false;

  type Actual = TranslationHasParams<"cat">;

  // @ts-expect-error Test
  type Test =
    // biome-ignore format: Avoid `@ts-expect-error` from ignoring test assertion
    Expect<AreEqual<Actual, Expected>>;
}

// @ts-expect-error Test
namespace Test_HasParams_SpecifiedPrefix {
  type Expected = true;

  type Actual = TranslationHasParams<"Our @count cats", "@">;

  // @ts-expect-error Test
  type Test =
    // biome-ignore format: Avoid `@ts-expect-error` from ignoring test assertion
    Expect<AreEqual<Actual, Expected>>;
}

// @ts-expect-error Test
namespace Test_InferParams_SpecifiedPrefix {
  type Expected = {
    "@count": string;
    "@animal": string;
    "@zoo-name": string;
    "@adjective": string;
  };

  type Actual = TranslationParams<
    `We have @count @animal in @zoo-name.
  They are @adjective!`,
    "@"
  >;

  // @ts-expect-error Test
  type Test =
    // biome-ignore format: Avoid `@ts-expect-error` from ignoring test assertion
    Expect<AreEqual<Actual, Expected>>;
}
