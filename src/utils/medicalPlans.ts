import { AxiosResponse } from "axios";
import { api, getAuthHeader } from "src/api";
import { ICustomPlanDetail } from "src/components/Pages/ProgramBuildPlanSets/PlanDetailForm/interface";

export async function createMedicalPlanInPlanSet(
  orgId: string,
  planSetId: string,
  createPlanData: ICustomPlanDetail
) {
  let planData = Object.assign(createPlanData, { plan_set: planSetId });
  const response: AxiosResponse = await api.post(
    `/api/v1/org/${orgId}/plan-sets/${planSetId}/medical-plans/`,
    planData,
    getAuthHeader()
  );
}

export async function updateMedicalPlanInPlanSet(
  orgId: string,
  planSetId: string,
  planId: string,
  updatePlanData: ICustomPlanDetail
) {
  const response: AxiosResponse = await api.patch(
    `/api/v1/org/${orgId}/plan-sets/${planSetId}/medical-plans/${planId}`,
    updatePlanData,
    getAuthHeader()
  );
}

export async function getMedicalPlansInPlanSet(
  orgId: string,
  planSetId: string
) {
  const response: AxiosResponse = await api.get(
    `/api/v1/org/${orgId}/plan-sets/${planSetId}/medical-plans/`,
    getAuthHeader()
  );
}
