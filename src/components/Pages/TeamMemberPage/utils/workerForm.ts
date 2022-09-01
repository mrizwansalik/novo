import get from "lodash/get";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { createOrgBroker } from "../../../../api/broker";
import { createOrgWorker, sendInvite } from "../../../../api/worker";
import { IBroker } from "../../../../interfaces/broker";
import { IWorker } from "../../../../interfaces/worker";
import WorkerStore from "../../../../stores/workerStore";
import { formReset } from "../../../../utils/form";
import { MemberFormValues } from "../constants";
import { IMemberForm } from "../interfaces";

export async function handleCreateWorker(
  workerStore: WorkerStore,
  formValue: IMemberForm,
  orgId: string,
  isCreateOrgBroker?: boolean
): Promise<void> {
  const firstName: string = get(
    formValue,
    `${MemberFormValues.FIRST_NAME}`,
    ""
  );
  const lastName: string = get(formValue, `${MemberFormValues.LAST_NAME}`, "");
  const email: string = get(formValue, `${MemberFormValues.EMAIL}`, "");

  const worker: IWorker = {
    census_data: {},
    custom_field_responses: [],
    email: email,
    first_name: firstName,
    last_name: lastName,
    name: "",
    phone: "",
    worker_type: orgId,
  };

  try {
    const createdWorker: IWorker = await createOrgWorker(orgId, worker);
    const createdWorkerId = get(createdWorker, "id", "");

    const broker: IBroker = {
      user_id: createdWorkerId,
    } as IBroker;
    if (isCreateOrgBroker) {
      await createOrgBroker(orgId, broker);
    }
    await sendInvite(createdWorkerId);
    workerStore.getWorkers(orgId);
    formReset("add-member-form");
    toast.success("Completed to create new team member");
  } catch (error) {
    toast.error(error.response.data.detail ?? "Error while create worker");
  }
}

export const validationSchema = Yup.object().shape({
  [MemberFormValues.FIRST_NAME]: Yup.string().required(
    "First name is required"
  ),
  [MemberFormValues.LAST_NAME]: Yup.string().required("First name is required"),
  [MemberFormValues.EMAIL]: Yup.string()
    .email("Email is invalid")
    .required("Email is required"),
});
