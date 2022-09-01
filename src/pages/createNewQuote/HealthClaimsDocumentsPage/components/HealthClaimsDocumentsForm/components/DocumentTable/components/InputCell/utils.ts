import { GetValues, SetValue } from "src/types/hookForm";
import { IDocumentTableForm, ITableDocument } from "../../interfaces";

export function handleSave(
  setValue: SetValue,
  getValues: GetValues,
  inputName: string,
  order: number
): void {
  const documentTable: IDocumentTableForm = getValues();
  const claimDocuments: ITableDocument[] = documentTable?.claimDocuments || [];
  const newClaimDocuments = claimDocuments.map(
    (claimDocument: ITableDocument, index: number) => {
      if (index === order) {
        return {
          ...claimDocument,
          name: inputName,
        };
      }
      return claimDocument;
    }
  );
  setValue("claimDocuments", newClaimDocuments, { shouldDirty: true });
}
