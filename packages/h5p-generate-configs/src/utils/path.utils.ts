import { resolve } from "node:path";

export const resolveInputPath = (path: string): string => resolve(path.trim());

export const resolveOutputPath = (path: string): string => resolve(path.trim());
