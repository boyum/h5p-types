import type { IH5PContentType } from "h5p-types";
import { useContext, Context } from "react";
import { H5PContext } from "../contexts/H5PContext";

export const useH5PInstance = <
  TH5PContentType extends IH5PContentType = IH5PContentType,
>(): TH5PContentType => {
  return useContext<TH5PContentType>(
    H5PContext as unknown as Context<TH5PContentType>,
  );
};
