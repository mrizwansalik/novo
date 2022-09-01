import { useEffect } from "react";
import get from "lodash/get";
import { observer } from "mobx-react";
import { useForm, FormProvider, useWatch } from "react-hook-form";
import { useParams } from "react-router-dom";
import ProgramList from "src/components/Pages/ProgramBuild/ProgramList";
import { ColNoSpacing } from "src/components/Pages/ProspectDashboard/prospectDashboard.styles";
import { BuildNetworkFormValues, NetworkCategory } from "src/constants";
import { ISubNetwork, ISubNetworksTree } from "src/interfaces/network";
import { buildSubPharmacyTree } from "src/utils/programBuild";
import useStore from "src/utils/useStore";
import FilterSection from "../FilterSection";
import {
  Container,
  HeaderWrapper,
  Description,
  DescriptionLink,
} from "../programSection.styles";

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

  const searchKeyword: string = useWatch({
    control,
    name: BuildNetworkFormValues.SEARCH_KEYWORD,
  });

  useEffect(() => {
    if (prospectId) {
      programBuildStore.fetchPharmacyBenefitManagers(prospectId);
    }
  }, [prospectId]);

  useEffect(() => {
    if (prospectId && recipeId) {
      programBuildStore.fetchOrgRecipe(prospectId, recipeId);
    }
  }, [prospectId, recipeId]);

  const subNetworkTree: ISubNetworksTree = buildSubPharmacyTree(
    programBuildStore?.pharmacyBenefitManagers,
    searchKeyword
  );

  const selectedSubNetworks: ISubNetwork[] =
    programBuildStore?.orgRecipe?.pbms || [];

  return (
    <Container>
      <HeaderWrapper
        title="Pharmacy Benefit Managers"
        description={
          <Description>
            <span>
              Select the PBM(s) you want to include from the options below, or
            </span>
            <DescriptionLink onClick={onCreate}>
              add a custom PBM
            </DescriptionLink>
          </Description>
        }
      />
      <FormProvider {...methods}>
        <FilterSection />
        <ColNoSpacing lg="12">
          <ProgramList
            subNetworks={get(
              subNetworkTree,
              `${NetworkCategory.PHARMACY_BENEFIT_MANAGER}`,
              []
            )}
            selectedSubNetworks={selectedSubNetworks}
            title=""
          />
        </ColNoSpacing>
      </FormProvider>
    </Container>
  );
};

export default observer(ProgramSection);
