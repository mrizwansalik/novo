import { AxiosResponse } from "axios";
import { get, isObject } from "lodash";
import { ContributionType } from "src/constants/enum/plan";
import {
  ICarrierPlan,
  ICarrier,
  IVersion,
  IPlan,
  IFamilyStatusPricings,
} from "src/interfaces/benefit";
import { formatData } from "src/utils/api";
import { api, getAuthHeader } from "./index";

export async function listPlanComparisons(
  orgId: string
): Promise<ICarrierPlan[]> {
  const response: AxiosResponse = await api.get(
    `/api/v1/org/${orgId}/benefits/plan-comparisons/`,
    getAuthHeader()
  );
  return response?.data;
}

export async function createPlanComparison(
  orgId: string,
  planComparison
): Promise<ICarrierPlan> {
  const response: AxiosResponse = await api.post(
    `/api/v1/org/${orgId}/benefits/plan-comparisons/`,
    planComparison,
    getAuthHeader()
  );
  return response?.data;
}

export async function updatePlanComparison(
  orgId: string,
  planComparison: ICarrierPlan
): Promise<ICarrierPlan> {
  const response: AxiosResponse = await api.patch(
    `/api/v1/org/${orgId}/benefits/plan-comparisons/${planComparison.id}/`,
    planComparison,
    getAuthHeader()
  );
  return response?.data;
}

export async function deletePlanComparison(
  orgId: string,
  planComparisonId: string
) {
  const response: AxiosResponse = await api.delete(
    `/api/v1/org/${orgId}/benefits/plan-comparisons/${planComparisonId}/`,
    getAuthHeader()
  );
  return response?.data;
}

export async function listPlanComparisonsWithSummaryPricing(
  orgId: string
): Promise<ICarrierPlan[]> {
  const response: AxiosResponse = await api.get(
    `/api/v1/org/${orgId}/benefits/plan-comparisons/summary-pricing/`,
    getAuthHeader()
  );
  return response?.data;
}

export async function getExistingPlansVersion(
  orgId: string,
  selfFundedProgramId
): Promise<IVersion> {
  const response: AxiosResponse = await api.get(
    `/api/v1/org/${orgId}/benefits/plan-comparisons/${selfFundedProgramId}/existing-versions/`,
    getAuthHeader()
  );
  const versions = get(response, "data");
  return (Array.isArray(versions) && versions[0]) || undefined;
}

export async function createPlanComparisonVersion(
  orgId: string,
  version: IVersion,
  planComparison: ICarrierPlan
): Promise<IVersion> {
  if (isObject(version.stop_loss_carrier)) {
    version.stop_loss_carrier = version.stop_loss_carrier.id;
  }
  const response: AxiosResponse = await api.post(
    `/api/v1/org/${orgId}/benefits/plan-comparisons/${planComparison.id}/versions/`,
    version,
    getAuthHeader()
  );
  return response?.data;
}

export async function updatePlanComparisonVersion(
  orgId: string,
  version: IVersion,
  planComparison: ICarrierPlan
): Promise<IVersion> {
  if (isObject(version.stop_loss_carrier)) {
    version.stop_loss_carrier = version.stop_loss_carrier.id;
  }
  const response: AxiosResponse = await api.patch(
    `/api/v1/org/${orgId}/benefits/plan-comparisons/${planComparison.id}/versions/${version.id}/`,
    version,
    getAuthHeader()
  );
  return response?.data;
}

export async function listOrgCarriers(orgId: string): Promise<ICarrier[]> {
  const response: AxiosResponse = await api.get(
    `/api/v1/org/${orgId}/benefits/carriers/`,
    getAuthHeader()
  );
  return response?.data;
}

export async function addOrgCarrier(
  orgId: string,
  carrier: ICarrier
): Promise<ICarrier> {
  const response: AxiosResponse = await api.post(
    `/api/v1/org/${orgId}/benefits/carriers/`,
    carrier,
    getAuthHeader()
  );
  return response?.data;
}

export async function updateCarrierPlan(
  carrierId: string,
  plan: ICarrierPlan
): Promise<ICarrierPlan> {
  const data = formatData(plan);
  const planId = get(plan, "id");
  const response: AxiosResponse = await api.patch(
    `/api/v1/benefits/carriers/${carrierId}/plans/${planId}/`,
    data,
    getAuthHeader()
  );
  return response?.data;
}

export async function addCarrierPlan(
  carrierId: string,
  plan: ICarrierPlan,
  orgId?: string
): Promise<ICarrierPlan> {
  const data = formatData(plan);
  if (orgId) {
    data.org_id = orgId;
  }
  const response: AxiosResponse = await api.post(
    `/api/v1/benefits/carriers/${carrierId}/plans/`,
    data,
    getAuthHeader()
  );
  return response?.data;
}

export async function createOrgPlan(
  orgId: string,
  plan: IPlan
): Promise<IPlan> {
  const data = formatData(plan);
  const response: AxiosResponse = await api.post(
    `/api/v1/org/${orgId}/benefits/plans/`,
    data,
    getAuthHeader()
  );
  return response?.data;
}

export async function updateOrgPlan(
  orgId: string,
  plan: ICarrierPlan
): Promise<ICarrierPlan> {
  const data = formatData(plan);
  const response: AxiosResponse = await api.patch(
    `/api/v1/org/${orgId}/benefits/plans/${plan.id}/`,
    data,
    getAuthHeader()
  );
  return response?.data;
}

export async function getOrgPlan(
  orgId: string,
  planId: String
): Promise<IPlan> {
  const response: AxiosResponse = await api.get(
    `/api/v1/org/${orgId}/benefits/plans/${planId}/`,
    getAuthHeader()
  );
  return response?.data;
}

export async function createOrgPlanCompositeTier(
  orgId: string,
  planId: string,
  tier: IFamilyStatusPricings
): Promise<IFamilyStatusPricings> {
  if (tier.contribution_type === ContributionType.PERCENTAGE) {
    tier.contribution_rate = tier.contribution_percent;
  }
  delete tier.contribution_percent;

  const response: AxiosResponse = await api.post(
    `/api/v1/org/${orgId}/benefits/plans/${planId}/family-status-pricings/`,
    tier,
    getAuthHeader()
  );
  return response?.data;
}

export async function updateOrgPlanCompositeTier(
  orgId: string,
  planId: string,
  tier: IFamilyStatusPricings
): Promise<IFamilyStatusPricings> {
  if (tier.contribution_type === ContributionType.PERCENTAGE) {
    tier.contribution_rate = tier.contribution_percent;
  }
  delete tier.contribution_percent;

  const response: AxiosResponse = await api.patch(
    `/api/v1/org/${orgId}/benefits/plans/${planId}/family-status-pricings/${tier.id}/`,
    tier,
    getAuthHeader()
  );
  return response?.data;
}
