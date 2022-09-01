import get from "lodash/get";
import {
  sendInvite,
  resetWorkerDocumentSignature,
  deleteWorker,
} from "src/api/worker";
import { IAssignedDocumentsTree } from "src/pages/createNewQuote/PersonalHealthQuestionnairesStatusPage/utils";
import { GetValues } from "src/types/hookForm";

export function extractWorkerIds(getValues: GetValues): string[] {
  const formValues: Record<string, boolean> = get(getValues(), "workers", {});
  const formKeys: string[] = Object.keys(formValues);
  const workerIds: string[] = Array.isArray(formKeys)
    ? formKeys?.filter(
        (formKey: string) => !!get(formValues, `[${formKey}]`, false)
      )
    : [];
  return workerIds;
}

export async function handleInviteWorkers(getValues: GetValues): Promise<void> {
  const workerIds: string[] = extractWorkerIds(getValues);
  if (!Array.isArray(workerIds)) return;
  await Promise.all(workerIds?.map((workerId: string) => sendInvite(workerId)));
}

export async function handleDeleteWorkers(getValues: GetValues): Promise<void> {
  const workerIds: string[] = extractWorkerIds(getValues);
  if (!Array.isArray(workerIds)) return;
  await Promise.all(
    workerIds?.map((workerId: string) => deleteWorker(workerId))
  );
}

export function extractSignedWorkerIds(
  getValues: GetValues,
  signedUsers: IAssignedDocumentsTree[]
): string[] {
  const formValues: Record<string, boolean> = get(getValues(), "workers", {});
  const formKeys: string[] = Object.keys(formValues);
  const workerIds: string[] = Array.isArray(formKeys)
    ? formKeys?.filter(
        (formKey: string) => !!get(formValues, `[${formKey}]`, false)
      )
    : [];

  const signedWorkerIds: string[] = Array.isArray(workerIds)
    ? workerIds?.filter((workerId: string) => {
        const foundUser = signedUsers?.find(
          (signedUser: IAssignedDocumentsTree) =>
            signedUser?.owner?.id === workerId
        );
        return !!foundUser;
      })
    : [];
  return signedWorkerIds;
}

export async function clearWorkersDocumentSignature(
  signedWorkerIds: string[],
  keepSignatures: boolean
): Promise<void> {
  await Promise.all(
    signedWorkerIds?.map((workerId: string) =>
      resetWorkerDocumentSignature(workerId, keepSignatures)
    )
  );
}
