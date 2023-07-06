import { useContext } from "react";
import { ContentIdContext } from "../contexts/ContentIdContext";

export const useContentId = (): string => {
  return useContext(ContentIdContext);
};
