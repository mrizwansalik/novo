import { set } from "lodash";
import { updateOrg } from "src/api/org";
import { IOrg } from "src/interfaces/org";

export async function handleUpdateOrg(org: IOrg): Promise<IOrg> {
  set(org, "org.census_data.claims_data_skip", true);
  const updatedOrg = await updateOrg(org);
  return updatedOrg;
}
