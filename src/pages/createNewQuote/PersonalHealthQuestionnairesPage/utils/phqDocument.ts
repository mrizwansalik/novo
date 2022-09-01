import { deleteDocument } from "src/api/document";
import { IPhqDocument } from "src/interfaces/benefit";
import BenefitStore from "src/stores/benefitStore";

export async function handleDeletePhqDocument(
  benefitStore: BenefitStore,
  phqDocument: IPhqDocument,
  prospectId: string
): Promise<void> {
  const newSelectedPhqDocument =
    benefitStore?.selectedPhqDocuments?.filter(
      (phqDocumentDetail: IPhqDocument) =>
        phqDocumentDetail?.id !== phqDocument?.id
    ) || [];
  await deleteDocument(prospectId, phqDocument?.id);
  benefitStore.setSelectedPhqDocuments([...newSelectedPhqDocument]);
}
