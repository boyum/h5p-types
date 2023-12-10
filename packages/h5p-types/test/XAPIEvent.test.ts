/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/ban-ts-comment, @typescript-eslint/no-namespace */
import type { XAPIEvent } from "..";

// @ts-ignore Test
namespace Test_XAPIEvent_getVerb_True {
  declare const event: XAPIEvent;
  const verb = event.getVerb(true);

  verb?.id;

  // @ts-expect-error
  verb?.length;
}

// @ts-ignore Test
namespace Test_XAPIEvent_getVerb_False {
  declare const event: XAPIEvent;
  const verb = event.getVerb(false);

  // @ts-expect-error
  verb?.id;

  verb?.length;
}

// @ts-ignore Test
namespace Test_XAPIEvent_getVerb_Undefined {
  declare const event: XAPIEvent;
  const verb = event.getVerb();

  // @ts-expect-error
  verb?.id;

  verb?.length;
}
