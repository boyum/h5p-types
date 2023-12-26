import type { H5PExtras } from "../../types/H5PExtras";

export type H5PExtrasWithState<TState> = H5PExtras & { previousState?: TState };
