import { IOption } from "src/interfaces/common";

export interface ITableDocument {
  name: string;
  uploadDate: string;
  fileUrl: string;
  categoryType?: IOption;
  year?: IOption;
}

export interface IDocumentTableForm {
  claimDocuments: ITableDocument[];
}
