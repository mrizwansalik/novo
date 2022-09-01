import { createDocument, deleteDocument, getDocuments } from "src/api/document";
import { IPhqDocument } from "src/interfaces/benefit";
import { IDocument } from "src/interfaces/document";
import BenefitStore from "src/stores/benefitStore";

export function updateRenderedState(
  benefitStore: BenefitStore,
  phqDocument: IPhqDocument
): void {
  const foundPhqDocument: IPhqDocument = benefitStore?.renderedPhqDocuments?.find(
    (phqDocumentDetail: IPhqDocument) =>
      phqDocumentDetail?.id === phqDocument?.id
  );

  if (!foundPhqDocument) {
    benefitStore.setRenderedPhqDocuments([
      ...benefitStore.renderedPhqDocuments,
      phqDocument,
    ]);
  }

  if (!!foundPhqDocument) {
    const newPhqDocuments =
      benefitStore?.renderedPhqDocuments?.filter(
        (phqDocumentDetail: IPhqDocument) =>
          phqDocumentDetail?.id !== foundPhqDocument?.id
      ) || [];
    benefitStore.setRenderedPhqDocuments([...newPhqDocuments]);
  }
}

export async function handleAssignPhqsDocuments(
  benefitStore: BenefitStore,
  prospectId: string
): Promise<void> {
  const selectedPhqDocuments = benefitStore?.selectedPhqDocuments || [];
  const documents = await getDocuments(prospectId);
  await Promise.allSettled(
    documents?.map((document: IPhqDocument) =>
      deleteDocument(prospectId, document?.id)
    )
  );

  await Promise.all(
    selectedPhqDocuments?.map((selectedPhqDocument: IPhqDocument) => {
      const newDocument: IDocument = {
        document_id: selectedPhqDocument?.id,
      } as IDocument;
      return createDocument(prospectId, newDocument);
    })
  );
}
