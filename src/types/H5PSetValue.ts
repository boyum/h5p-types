import { H5PField } from "./H5PField";

export type H5PSetValue<Params> = (field: H5PField, params: Params) => void;
