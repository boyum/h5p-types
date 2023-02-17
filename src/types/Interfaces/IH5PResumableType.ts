export interface IH5PResumableType<TState = unknown> {
  getCurrentState(): TState;
}
