/** biome-ignore-all lint/correctness/noUnusedVariables: Test namespaces */

import type { XAPIEvent } from "..";

// @ts-expect-error Test
namespace Test_XAPIEvent_getVerb_True {
  declare const event: XAPIEvent;
  const verb = event.getVerb(true);

  verb?.id;

  // @ts-expect-error
  verb?.length;
}

// @ts-expect-error Test
namespace Test_XAPIEvent_getVerb_False {
  declare const event: XAPIEvent;
  const verb = event.getVerb(false);

  // @ts-expect-error
  verb?.id;

  verb?.length;
}

// @ts-expect-error Test
namespace Test_XAPIEvent_getVerb_Undefined {
  declare const event: XAPIEvent;
  const verb = event.getVerb();

  // @ts-expect-error
  verb?.id;

  verb?.length;
}

// @ts-expect-error Test
namespace Test_XAPIEvent_getMaxScore {
  declare const event: XAPIEvent;

  const maxScore: number | null = event.getMaxScore();

  void maxScore;
}

// @ts-expect-error Test
namespace Test_XAPIEvent_getScore {
  declare const event: XAPIEvent;

  const score: number | null = event.getScore();

  void score;
}
