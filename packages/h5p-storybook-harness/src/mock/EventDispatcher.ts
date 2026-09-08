type Listener = (event: unknown) => void;

type Entry = {
  fn: Listener;
  once: boolean;
};

/**
 * A minimal runtime implementation of H5P's `H5P.EventDispatcher`, used to
 * instantiate content types and widgets in the Storybook harness.
 *
 * Only the methods the H5P base classes actually rely on are functional
 * (`on`, `once`, `off` and `trigger`). The xAPI helpers are no-ops.
 */
export class EventDispatcher {
  private readonly listeners = new Map<string, Array<Entry>>();

  on(type: string, listener: Listener): void {
    this.addListener(type, listener, false);
  }

  once(type: string, listener: Listener): void {
    this.addListener(type, listener, true);
  }

  off(type: string, listener?: Listener): void {
    if (listener === undefined) {
      this.listeners.delete(type);
      return;
    }

    const entries = this.listeners.get(type);
    if (entries === undefined) {
      return;
    }

    const index = entries.findIndex((entry) => entry.fn === listener);
    if (index !== -1) {
      entries.splice(index, 1);
    }
  }

  trigger(type: string | unknown, eventData?: unknown): void {
    if (typeof type !== "string") {
      throw new Error(
        "Passing event objects to `trigger` is not implemented in the H5P Storybook harness mock.",
      );
    }

    const entries = this.listeners.get(type);
    if (entries === undefined) {
      return;
    }

    for (const entry of [...entries]) {
      if (entry.once) {
        this.off(type, entry.fn);
      }

      entry.fn({ type, data: eventData });
    }
  }

  triggerXAPI(): void {
    // No-op in the harness mock.
  }

  triggerXAPICompleted(): void {
    // No-op in the harness mock.
  }

  triggerXAPIScored(): void {
    // No-op in the harness mock.
  }

  createXAPIEventTemplate(): unknown {
    return { type: "xAPI" };
  }

  setActivityStarted(): void {
    // No-op in the harness mock.
  }

  private addListener(type: string, listener: Listener, once: boolean): void {
    const entries = this.listeners.get(type) ?? [];
    entries.push({ fn: listener, once });
    this.listeners.set(type, entries);
  }
}
