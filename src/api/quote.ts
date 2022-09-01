import { ICarrierPlan, IPlan } from "src/interfaces/benefit";
import { api, getAuthHeader } from ".";

export async function listExistingPlans(orgId: string): Promise<IPlan[]> {
  try {
    const response = await api.get(
      `/api/v1/org/${orgId}/benefits/existing-plans/`,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function addOrgPlanToExistingPlans(
  orgId: string,
  orgPlan: IPlan
): Promise<IPlan> {
  try {
    const data = { org_plan_id: orgPlan.id };
    const response = await api.post(
      `/api/v1/org/${orgId}/benefits/existing-plans/`,
      data,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function removeOrgPlanFromExistingPlans(
  orgId: string,
  planId: string
) {
  try {
    const response = await api.delete(
      `/api/v1/org/${orgId}/benefits/existing-plans/${planId}/`,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function getIllustrativeExportXlsUrl(
  orgId: string,
  isXlsx: boolean
): Promise<any> {
  try {
    const response = await api.get(
      `/api/v1/org/${orgId}/benefits/illustrative-export-xls-url/?isXlsx=${isXlsx}`,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function getUnderwrittenExportXlsUrl(
  orgId: string,
  isXlsx: boolean
): Promise<string> {
  try {
    const response = await api.get(
      `/api/v1/org/${orgId}/benefits/underwritten-export-xls-url/?isXlsx=${isXlsx}`,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function exportDocsToGDrive(orgId: string): Promise<string> {
  try {
    const response = await api.get(
      `/api/v1/org/${orgId}/benefits/sync-google-drive`,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function requestUnderwritingForProgram(
  orgId: string,
  program: ICarrierPlan
): Promise<IPlan> {
  try {
    const response = await api.post(
      `/api/v1/org/${orgId}/benefits/plan-comparisons/${program.id}/request-underwriting/`,
      {},
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}
