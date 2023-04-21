import type { XAPIStatement } from './XAPIStatement';

export type XAPIData = {
  statement: XAPIStatement;
  children?: Array<XAPIData>;
};
