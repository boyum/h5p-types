import type { H5PContentType } from "h5p-utils";
import { type Context, useContext } from "react";
import { H5PContext } from "../contexts/H5PContext";

export const useH5PInstance = <
  TH5PContentType extends H5PContentType = H5PContentType,
>(): TH5PContentType => {
  return useContext<TH5PContentType>(
    H5PContext as unknown as Context<TH5PContentType>,
  );
};
