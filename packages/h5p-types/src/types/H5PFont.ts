export type H5PFont = {
  size:
    | boolean
    | Array<{
        label: string;

        /** Applied to `font-size` */
        css: string;
        default?: boolean;
      }>;
  family:
    | boolean
    | Array<{
        label: string;
        /** Applied to `font-family */
        css: string;
      }>;
  color:
    | boolean
    | Array<{
        label: string;
        /** Applied to `color` */
        css: string;
      }>;
  background: boolean;
};
