import { useMemo } from "react";
import { DocumentStatus, SignatureState } from "src/constants/enum/document";
import { IAssignedDocument } from "src/interfaces/benefit";
import {
  buildAssignedDocumentsTree,
  extractAssignedUsers,
  IAssignedDocumentsTree,
} from "src/pages/createNewQuote/PersonalHealthQuestionnairesStatusPage/utils";
import useStore from "src/utils/useStore";

export function useUsers(): IAssignedDocumentsTree[][] {
  const { benefitStore, workerStore } = useStore();

  const usersTree = useMemo(() => buildAssignedDocumentsTree(benefitStore), [
    benefitStore?.assignedDocuments,
  ]);

  const awaitUsers: IAssignedDocumentsTree[] = useMemo(
    () =>
      extractAssignedUsers(
        workerStore,
        usersTree,
        (assignedDocuments: IAssignedDocument[]) =>
          assignedDocuments?.some(
            (assignedDocument: IAssignedDocument) =>
              assignedDocument?.signature_state ===
              SignatureState.NEEDS_SIGNATURES
          )
      ),
    [usersTree, workerStore?.prospectWorkers]
  );

  const submitUsers: IAssignedDocumentsTree[] = useMemo(
    () =>
      extractAssignedUsers(
        workerStore,
        usersTree,
        (assignedDocuments: IAssignedDocument[]) =>
          assignedDocuments?.every(
            (assignedDocument: IAssignedDocument) =>
              assignedDocument?.signature_state === SignatureState.FULLY_SIGNED
          ) &&
          assignedDocuments?.some(
            (assignedDocument: IAssignedDocument) =>
              assignedDocument?.status !== DocumentStatus.SUBMITTED &&
              assignedDocument?.status !== DocumentStatus.ACCEPTED &&
              assignedDocument?.status !== DocumentStatus.REJECTED
          )
      ),
    [usersTree, workerStore?.prospectWorkers]
  );

  const submittedUsers: IAssignedDocumentsTree[] = useMemo(
    () =>
      extractAssignedUsers(
        workerStore,
        usersTree,
        (assignedDocuments: IAssignedDocument[]) =>
          assignedDocuments?.every(
            (assignedDocument: IAssignedDocument) =>
              assignedDocument?.signature_state ===
                SignatureState.FULLY_SIGNED &&
              (assignedDocument?.status === DocumentStatus.SUBMITTED ||
                assignedDocument?.status === DocumentStatus.ACCEPTED ||
                assignedDocument?.status === DocumentStatus.REJECTED)
          )
      ),
    [usersTree, workerStore?.prospectWorkers]
  );

  return [awaitUsers, submitUsers, submittedUsers];
}
