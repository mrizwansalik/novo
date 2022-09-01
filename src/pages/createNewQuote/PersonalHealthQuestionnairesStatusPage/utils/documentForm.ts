import get from "lodash/get";
import { updateWorkerDocument } from "src/api/worker";
import { DocumentStatus } from "src/constants/enum/document";
import { IPhqDocument } from "src/interfaces/benefit";
import { IWorkerDocument } from "src/interfaces/document";
import { Reset } from "src/types/hookForm";
import { IWorkerTableDocument } from "../components/PHQForm/components/EmployeesCard/components/WorkerModal/interfaces";
import { IAssignedDocumentsTree } from "./assignedDocuments";
import { extractDocumentStatus } from "./workerTable";

export function initFormValues(
  assignedDocument: IAssignedDocumentsTree,
  reset: Reset
): void {
  const formDocuments = Array.isArray(assignedDocument?.documents)
    ? assignedDocument?.documents?.map((documentDetail: IPhqDocument) => ({
        submission: {
          value: get(documentDetail, "status", ""),
          label: extractDocumentStatus(get(documentDetail, "status", "")),
        },
        workerDocumentId: get(documentDetail, "worker_document", ""),
        workerId: get(documentDetail, "owner.id", ""),
      }))
    : [];
  reset({ documents: formDocuments });
}

export async function handleDocumentStatusChange(
  tableDocuments: IWorkerTableDocument[]
): Promise<void> {
  await Promise.all(
    Array.isArray(tableDocuments)
      ? tableDocuments.map((tableDocument: IWorkerTableDocument) => {
          const workerId: string = get(tableDocument, "workerId", "");
          const workerDocumentId: string = get(
            tableDocument,
            "workerDocumentId",
            DocumentStatus.UN_SUBMITTED
          );
          const documentStatus: string = get(
            tableDocument,
            "submission.value",
            DocumentStatus.UN_SUBMITTED
          );
          const newWorkerDocument: IWorkerDocument = {
            status: documentStatus,
          } as IWorkerDocument;

          return updateWorkerDocument(
            workerId,
            workerDocumentId,
            newWorkerDocument
          );
        })
      : []
  );
}
