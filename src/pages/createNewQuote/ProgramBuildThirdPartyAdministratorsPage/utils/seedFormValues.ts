import { ThirdPartyAdministratorFormValues } from "src/constants";
import { ITpa } from "src/interfaces/benefit";
import { INetworkIngredientWithTPAs } from "src/interfaces/network";
import { INetworkIngredient, IOrgRecipesTPA } from "src/interfaces/orgRecipes";
import ProgramBuildStore from "src/stores/programBuildStore";
import { SetValue } from "src/types/hookForm";
import { extractProgramByCategory } from ".";

export async function seedDefaultTPAOptions(
  setValue: SetValue,
  programBuildStore: ProgramBuildStore
): Promise<void> {
  const tpas = programBuildStore?.tpas || [];
  const orgRecipeTPAs: IOrgRecipesTPA[] =
    programBuildStore?.orgRecipe?.tpas || [];
  const tpaSelects: boolean[] = [];

  if (!tpas?.length || !orgRecipeTPAs?.length) return;

  const vendorSelect = Array.isArray(tpas)
    ? tpas?.map((tpa: ITpa, tpaOrder: number) => {
        const networkIngredients: INetworkIngredientWithTPAs[] = extractProgramByCategory(
          programBuildStore.networkIngredientWithTPAs,
          {},
          tpa,
          null,
          true
        );
        const foundOrgRecipeTPA: IOrgRecipesTPA = orgRecipeTPAs?.find(
          (orgRecipeTPA: IOrgRecipesTPA) => orgRecipeTPA?.tpa?.id === tpa?.id
        );

        if (foundOrgRecipeTPA?.tpa?.id) {
          tpaSelects[tpaOrder] = true;

          return foundOrgRecipeTPA?.network_ingredients?.reduce(
            (
              accumulator: Record<string, boolean>,
              networkIngredient: INetworkIngredient
            ) => {
              return {
                ...accumulator,
                [`${tpa?.id}+join+${networkIngredient?.id}`]: true,
              };
            },
            {}
          );
        }

        return networkIngredients?.reduce(
          (
            accumulator: Record<string, boolean>,
            networkIngredient: INetworkIngredientWithTPAs
          ) => ({
            ...accumulator,
            [`${tpa?.id}+join+${networkIngredient?.id}`]: false,
          }),
          {}
        );
      })
    : [];
  if (Array.isArray(vendorSelect) && vendorSelect?.length > 0) {
    setValue(ThirdPartyAdministratorFormValues.VENDOR_SELECT, vendorSelect);
  }
  setValue(`${ThirdPartyAdministratorFormValues.TPA_SELECT}`, tpaSelects);
}
