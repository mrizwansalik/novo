import {
  createNetworkIngredient,
  deleteNetworkIngredient,
} from "src/api/orgRecipes";
import { ISubNetwork } from "src/interfaces/network";

export function isSubNetworkActive(
  subNetwork: ISubNetwork,
  selectedSubNetworks: ISubNetwork[]
): boolean {
  const isActive = selectedSubNetworks?.find(
    (subNetworkDetail: ISubNetwork) => subNetworkDetail?.id === subNetwork?.id
  );
  return !!isActive;
}

export async function handleClickProgramCard(
  subNetwork: ISubNetwork,
  status: boolean,
  prospectId: string,
  recipeId: string
): Promise<void> {
  if (!status) {
    const networkIngredient = {
      network_ingredient: subNetwork?.id,
    };
    await createNetworkIngredient(prospectId, recipeId, networkIngredient);
    return;
  }
  if (status && subNetwork?.id) {
    await deleteNetworkIngredient(prospectId, recipeId, subNetwork?.id);
  }
}
