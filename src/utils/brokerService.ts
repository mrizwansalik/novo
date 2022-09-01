import { ICarrierPlan } from "src/interfaces/benefit";
import { IOrg } from "src/interfaces/org";
import { getBrokerageProspects } from "../api/prospects";
import { PROSPECT_TYPE } from "../constants";
import { getEmptyPlanComparison } from "./quote";

export async function getBrokerageProspectsList(
  orgId: string,
  prospectListType: PROSPECT_TYPE
): Promise<IOrg[]> {
  let prospectTypeInUrl = "";
  if (prospectListType !== PROSPECT_TYPE.ACTIVE) {
    prospectTypeInUrl = prospectListType;
  }
  const prospectsList: IOrg[] = await getBrokerageProspects(
    orgId,
    prospectTypeInUrl
  );
  return prospectsList;
}

export function getSelfFundedProgram(
  planComparisons: ICarrierPlan[],
  org: IOrg
): ICarrierPlan {
  let selfFundedProgram: ICarrierPlan;
  selfFundedProgram = planComparisons.find((program) =>
    program.versions.find((version) => version.version_type === "existing")
  );
  if (!selfFundedProgram) {
    const effectiveDate = org.census_data.health_plan
      ? org.census_data.health_plan.effective_date
      : "";
    selfFundedProgram = getEmptyPlanComparison(effectiveDate);
    selfFundedProgram.name = "Existing Plans";
  }
  return selfFundedProgram;
}
