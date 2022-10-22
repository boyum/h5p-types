import type { Copyright } from "./Copyright";
import type { H5PConfirmationDialog } from "./H5PConfirmationDialog";
import type { H5PFieldImage } from "./H5PField";
import type { H5PSetValue } from "./H5PSetValue";
import type { IH5PFieldInstance } from "./IH5PFieldInstance";
import type { Image } from "./Image";

export interface IH5PEditorImageField
  extends IH5PFieldInstance<Image, H5PFieldImage> {
  changes: Array<unknown>;
  copyright: Copyright;
  confirmRemovalDialog: H5PConfirmationDialog;
  confirmationDialog: H5PConfirmationDialog;
  id: string;
  isEditing: boolean;
  isOriginalImage: boolean;
  openFileSelector(): void;
  setValue: H5PSetValue<Image>;
  upload(file: File, filename: string): void;
  /** ⚠️ Only uploads the first file in the list ⚠️ */
  uploadFiles(files: Array<File>): void;
}
