import { IAssignedDocument } from "src/interfaces/benefit";
import { IWorker } from "src/interfaces/worker";
import WorkerStore from "src/stores/workerStore";
import { IAssignedDocumentsTree } from "./assignedDocuments";

export function extractAssignedUsers(
  workerStore: WorkerStore,
  usersTree: IAssignedDocumentsTree[],
  callback: (compareDocument: IAssignedDocument[]) => void
): IAssignedDocumentsTree[] {
  const prospectWorkers = workerStore?.prospectWorkers || [];

  const awaitUsers: IAssignedDocumentsTree[] = usersTree?.filter(
    (userTree: IAssignedDocumentsTree) => {
      return callback(userTree?.assigned);
    }
  );

  const awaitUsersInformation = awaitUsers?.map(
    (user: IAssignedDocumentsTree) => {
      const foundProspectWorkers = Array.isArray(prospectWorkers)
        ? prospectWorkers?.find(
            (worker: IWorker) => worker?.id === user?.owner?.id
          )
        : {};
      return {
        ...user,
        worker: foundProspectWorkers,
      };
    }
  );

  const filteredUsers: IAssignedDocumentsTree[] = awaitUsersInformation?.filter(
    (user: IAssignedDocumentsTree) => !!user?.worker
  );

  return filteredUsers;
}
