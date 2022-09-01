import { IOption } from "src/interfaces/common";

export interface IClaimsDocumentsForm {
  name: string;
  tags: IOption;
  year: IOption;
  file: string;
  fileUrl: string;
  id: string;
  mime_type: string;
  categoryType: IOption;
  delete: boolean;
  uploadDate: string;
}
