export declare class H5PClipboardItem<TParams extends Record<string, unknown>> {
  constructor(
    parameters: TParams,
    genericProperty?: keyof TParams,
    specificKey?: string,
  );
}
