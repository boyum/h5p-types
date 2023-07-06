import type { H5PContentType } from "h5p-utils";
import { createContext } from "react";

export const H5PContext = createContext<H5PContentType>({} as H5PContentType);
