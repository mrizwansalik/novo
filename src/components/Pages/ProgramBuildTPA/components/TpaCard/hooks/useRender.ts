import { useWorker } from "@koale/useworker";
import { INetworkIngredientWithTPAs } from "src/interfaces/network";

export interface INetworkCategoriesWorker {
  requiredTpas: Record<string, INetworkIngredientWithTPAs[]>;
  mandatoryTpas: Record<string, INetworkIngredientWithTPAs[]>;
  optionalTpas: Record<string, INetworkIngredientWithTPAs[]>;
  providerAccessTpas: Record<string, INetworkIngredientWithTPAs[]>;
  pbmTpas: Record<string, INetworkIngredientWithTPAs[]>;
  rawProviderAccessTpas: Record<string, INetworkIngredientWithTPAs[]>;
  rawPbmTpas: Record<string, INetworkIngredientWithTPAs[]>;
}

export function useRenderValues() {
  const [networkCategoriesWorker] = useWorker((workerInput: string) => {
    const {
      networkIngredientWithTPAs,
      tpasSelectedOptions,
      tpa,
      extractProgramByCategoryWorker,
    } = JSON.parse(workerInput);
    return eval(extractProgramByCategoryWorker)(
      networkIngredientWithTPAs,
      tpasSelectedOptions,
      tpa
    );
  });

  return [networkCategoriesWorker];
}
