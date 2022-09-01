import { useEffect } from "react";
import get from "lodash/get";
import { observer } from "mobx-react";
import { useForm, FormProvider, useWatch } from "react-hook-form";
import { useParams } from "react-router-dom";
import ProgramList from "src/components/Pages/ProgramBuild/ProgramList";
import { ColNoSpacing } from "src/components/Pages/ProspectDashboard/prospectDashboard.styles";
import { BuildNetworkFormValues, NetworkCategory } from "src/constants";
import { ISubNetwork } from "src/interfaces/network";
import { IOption } from "src/types";
import {
  buildSubNetworksTree,
  getNetworkCategoryOptions,
} from "src/utils/programBuild";
import useStore from "src/utils/useStore";
import FilterSection from "../FilterSection";
import {
  Container,
  HeaderWrapper,
  Description,
  DescriptionLink,
} from "../programSection.styles";

type ISubNetworksTree = Record<string, ISubNetwork[]>;

interface IProgramSectionProps {
  onCreate: () => void;
}

const ProgramSection = (props: IProgramSectionProps) => {
  const { onCreate } = props;
  const { programBuildStore } = useStore();
  const params = useParams();
  const prospectId: string = get(params, "prospectId", "");
  const recipeId: string = get(params, "recipeId", "");
  const methods = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const { control } = methods;

  const filterCategoryOption: IOption =
    useWatch({
      control,
      name: BuildNetworkFormValues.CATEGORY_OPTION,
    }) || getNetworkCategoryOptions()[0];
  const filterCategory = filterCategoryOption?.value;

  const searchKeyword: string = useWatch({
    control,
    name: BuildNetworkFormValues.SEARCH_KEYWORD,
  });

  useEffect(() => {
    if (prospectId) {
      programBuildStore.fetchSubNetworks(prospectId);
    }
  }, [prospectId]);

  useEffect(() => {
    if (prospectId && recipeId) {
      programBuildStore.fetchOrgRecipe(prospectId, recipeId);
    }
  }, [prospectId, recipeId]);

  const subNetworkTree: ISubNetworksTree = buildSubNetworksTree(
    programBuildStore?.subNetworks,
    searchKeyword
  );

  const displayBasePricing: boolean =
    filterCategory === NetworkCategory.REFERENCE_BASED_PRICING ||
    filterCategory === NetworkCategory.ALL;
  const displaySubNetwork: boolean =
    filterCategory === NetworkCategory.SUB_NETWORK ||
    filterCategory === NetworkCategory.ALL;
  const selectedSubNetworks: ISubNetwork[] =
    programBuildStore?.orgRecipe?.sub_networks || [];

  return (
    <Container>
      <HeaderWrapper
        title="Provider Access"
        description={
          <Description>
            <span>
              Select the Provider Access option(s) you want to include from the
              options below, or
            </span>
            <DescriptionLink onClick={onCreate}>
              add a custom provider access
            </DescriptionLink>
          </Description>
        }
      />
      <FormProvider {...methods}>
        <FilterSection isNetwork filterValue={filterCategoryOption} />
        {displayBasePricing && (
          <ColNoSpacing lg="12">
            <ProgramList
              subNetworks={get(
                subNetworkTree,
                `${NetworkCategory.REFERENCE_BASED_PRICING}`,
                []
              )}
              selectedSubNetworks={selectedSubNetworks}
              title="Reference Based Pricing"
            />
          </ColNoSpacing>
        )}
        {displaySubNetwork && (
          <ColNoSpacing lg="12">
            <ProgramList
              subNetworks={get(
                subNetworkTree,
                `${NetworkCategory.SUB_NETWORK}`,
                []
              )}
              selectedSubNetworks={selectedSubNetworks}
              title="Network"
            />
          </ColNoSpacing>
        )}
      </FormProvider>
    </Container>
  );
};

export default observer(ProgramSection);
