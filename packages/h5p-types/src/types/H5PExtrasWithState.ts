import type { H5PExtras } from "./H5PExtras";

export type H5PExtrasWithState<TState> = H5PExtras & { previousState?: TState };
