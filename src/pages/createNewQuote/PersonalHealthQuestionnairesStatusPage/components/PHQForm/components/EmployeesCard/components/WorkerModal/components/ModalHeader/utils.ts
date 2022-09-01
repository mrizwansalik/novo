import { deleteWorker } from "src/api/worker";
import BenefitStore from "src/stores/benefitStore";
import WorkerStore from "src/stores/workerStore";

export async function handleDeleteWorker(
  workerStore: WorkerStore,
  benefitStore: BenefitStore,
  workerId: string,
  prospectId: string
): Promise<void> {
  await deleteWorker(workerId);
  benefitStore.fetchAssignedDocuments(prospectId);
  workerStore.getProspectWorkers(prospectId);
}
