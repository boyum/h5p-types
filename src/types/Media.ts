import { Copyright } from "./Copyright";

export type Media = {
  path: string;
  mime?: string;
  copyright?: Copyright;
};
