import type { H5PExtras, IH5PResumableType } from "h5p-types";
import { H5PContentType } from "./H5PContentType.js";

type ExtrasWithState<TState> = H5PExtras & { previousState?: TState };

export abstract class H5PResumableContentType<
    TParams = unknown,
    TState = unknown,
  >
  extends H5PContentType<TParams>
  implements IH5PResumableType<TState>
{
  protected override extras: ExtrasWithState<TState> | undefined;
  protected state: TState | undefined;

  constructor(
    params: TParams,
    contentId: string,
    extras?: ExtrasWithState<TState>,
  ) {
    super(params, contentId, extras);
    this.extras = extras;
    this.state = extras?.previousState;
  }

  abstract getCurrentState(): TState | undefined;
}
