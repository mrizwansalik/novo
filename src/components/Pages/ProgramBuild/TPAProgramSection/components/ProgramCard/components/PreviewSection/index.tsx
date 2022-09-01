import { useCallback, useEffect } from "react";
import debounce from "lodash/debounce";
import { observer } from "mobx-react";
import { useFormContext, useWatch } from "react-hook-form";
import { ThirdPartyAdministratorFormValues } from "src/constants";
import { ITpa } from "src/interfaces/benefit";
import { extractProgramByCategoryWorker } from "src/pages/createNewQuote/ProgramBuildThirdPartyAdministratorsPage/utils";
import ProgramBuildStore from "src/stores/programBuildStore";
import useStore from "src/utils/useStore";
import {
  INetworkCategoriesWorker,
  useRenderValues,
} from "../../hooks/useRender";
import PreviewCard from "./components/PreviewCard";
import { Container, CardWrapper } from "./previewSection.styles";

interface IPreviewSectionProps {
  tpa: ITpa;
  tpaOrder: number;
}

const PreviewSection = (props: IPreviewSectionProps) => {
  const { tpa, tpaOrder } = props;
  const { programBuildStore } = useStore();

  const [networkCategoriesWorker] = useRenderValues();
  const { control, setValue } = useFormContext();
  const vendorsSelect: Record<string, boolean> = useWatch({
    name: `${ThirdPartyAdministratorFormValues.VENDOR_SELECT}[${tpaOrder}]`,
    control,
  });

  const getCategoriesWorkerValues = useCallback(
    debounce(
      async (
        programBuildStore: ProgramBuildStore,
        vendorsSelect: Record<string, boolean>,
        tpa: ITpa
      ) => {
        if (!programBuildStore?.networkIngredientWithTPAs?.length) {
          return;
        }
        const workerInput = JSON.stringify({
          networkIngredientWithTPAs:
            programBuildStore?.networkIngredientWithTPAs,
          tpasSelectedOptions: vendorsSelect,
          tpa,
          extractProgramByCategoryWorker: extractProgramByCategoryWorker.toString(),
        });
        const newNetworkCategoryTree: INetworkCategoriesWorker = await networkCategoriesWorker(
          workerInput
        );
        programBuildStore.setNetworkCategoryTree(
          tpaOrder,
          newNetworkCategoryTree
        );
        setValue(
          `${ThirdPartyAdministratorFormValues.NETWORK_CATEGORY_TREE}[${tpaOrder}]`,
          newNetworkCategoryTree
        );
      },
      300
    ),
    []
  );

  useEffect(() => {
    getCategoriesWorkerValues(programBuildStore, vendorsSelect, tpa);
  }, [programBuildStore?.networkIngredientWithTPAs, vendorsSelect, tpa]);

  const requiredNetworkCategories: string[] = Object.keys(
    programBuildStore?.networkCategoryTree[tpaOrder]?.requiredTpas ?? {}
  );

  const mandatoryNetworkCategories: string[] = Object.keys(
    programBuildStore?.networkCategoryTree[tpaOrder]?.mandatoryTpas ?? {}
  );

  const optionalNetworkCategories: string[] = Object.keys(
    programBuildStore?.networkCategoryTree[tpaOrder]?.optionalTpas ?? {}
  );

  return (
    <Container>
      {Array.isArray(requiredNetworkCategories) &&
        requiredNetworkCategories?.length > 0 && (
          <CardWrapper xl={12} lg={12} md={12} sm={12} xs={12}>
            <PreviewCard
              networkCategoryTree={
                programBuildStore?.networkCategoryTree[tpaOrder]?.requiredTpas
              }
              categoriesKeys={requiredNetworkCategories}
              title="Summary"
              description="Required (at least one or more Networks & PBMs are required)"
            />
          </CardWrapper>
        )}
      {Array.isArray(mandatoryNetworkCategories) &&
        mandatoryNetworkCategories?.length > 0 && (
          <CardWrapper xl={12} lg={12} md={12} sm={12} xs={12}>
            <PreviewCard
              networkCategoryTree={
                programBuildStore?.networkCategoryTree[tpaOrder]?.mandatoryTpas
              }
              categoriesKeys={mandatoryNetworkCategories}
              title="Mandatory"
            />
          </CardWrapper>
        )}
      {Array.isArray(optionalNetworkCategories) &&
        optionalNetworkCategories?.length > 0 && (
          <CardWrapper xl={12} lg={12} md={12} sm={12} xs={12}>
            <PreviewCard
              networkCategoryTree={
                programBuildStore?.networkCategoryTree[tpaOrder]?.optionalTpas
              }
              categoriesKeys={optionalNetworkCategories}
              title="Optional"
            />
          </CardWrapper>
        )}
    </Container>
  );
};

export default observer(PreviewSection);
