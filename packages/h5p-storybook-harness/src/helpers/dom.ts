/**
 * Creates a minimal jQuery-like object that only implements `.get()`, which is
 * the only jQuery method H5P content types and widgets rely on when attaching
 * themselves to a container.
 */
export function createJQueryLike<TElement extends HTMLElement>(
  element: TElement,
): JQuery<TElement> {
  return {
    get: (index: number): TElement | undefined => {
      return index === 0 ? element : undefined;
    },
  } as unknown as JQuery<TElement>;
}
