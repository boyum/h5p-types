import type { H5PConfirmationDialog } from "../H5PConfirmationDialog";
import type { H5PCopyright } from "../H5PCopyright";
import type { H5PFieldImage } from "../H5PField";
import type { H5PImage } from "../H5PImage";
import type { H5PSetValue } from "../H5PSetValue";
import type { IH5PFieldInstance } from "./IH5PFieldInstance";

export interface IH5PEditorImageField
  extends IH5PFieldInstance<H5PImage, H5PFieldImage> {
  changes: Array<unknown>;
  copyright: H5PCopyright;
  confirmRemovalDialog: H5PConfirmationDialog;
  confirmationDialog: H5PConfirmationDialog;
  id: string;
  isEditing: boolean;
  isOriginalImage: boolean;
  openFileSelector(): void;
  setValue: H5PSetValue<H5PImage>;
  upload(file: File, filename: string): void;
  /** ⚠️ Only uploads the first file in the list ⚠️ */
  uploadFiles(files: Array<File>): void;
}
