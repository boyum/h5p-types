/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/ban-ts-comment, @typescript-eslint/no-namespace */

import type { AreEqual, Expect } from "../src/test-utility-types";
import type {
  TranslationHasParams,
  TranslationParams,
} from "../src/types/InferTranslationParams";

// @ts-ignore Test
namespace Test_InferParams_One {
  type Expected = {
    ":count": string;
  };

  type Actual = TranslationParams<":count cats">;

  // @ts-ignore Test
  type Test =
    // prettier-ignore
    Expect<AreEqual<Actual, Expected>>;
}

// @ts-ignore Test
namespace Test_InferParams_Multiple {
  type Expected = {
    ":count": string;
    ":animal": string;
    ":zoo-name": string;
  };

  type Actual = TranslationParams<"We have :count :animal in :zoo-name">;
  // type Actual = TranslationParams<"We have :count :animal in :zoo-name.">;

  // @ts-ignore Test
  type Test =
    // prettier-ignore
    Expect<AreEqual<Actual, Expected>>;
}

// @ts-ignore Test
namespace Test_HasParams_True {
  type Expected = true;

  type Actual = TranslationHasParams<":count cat">;

  // @ts-ignore Test
  type Test =
    // prettier-ignore
    Expect<AreEqual<Actual, Expected>>;
}

// @ts-ignore Test
namespace Test_HasParams_True {
  type Expected = true;

  type Actual = TranslationHasParams<"Our :count cats">;

  // @ts-ignore Test
  type Test =
    // prettier-ignore
    Expect<AreEqual<Actual, Expected>>;
}

// @ts-ignore Test
namespace Test_HasParams_False {
  type Expected = false;

  type Actual = TranslationHasParams<"cat">;

  // @ts-ignore Test
  type Test =
    // prettier-ignore
    Expect<AreEqual<Actual, Expected>>;
}
