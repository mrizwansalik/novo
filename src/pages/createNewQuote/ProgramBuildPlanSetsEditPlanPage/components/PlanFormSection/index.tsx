import { useEffect } from "react";
import get from "lodash/get";
import { observer } from "mobx-react";
import { useForm, FormProvider } from "react-hook-form";
import { useParams } from "react-router-dom";
import { ColNoSpacing } from "src/components/Pages/ProspectDashboard/prospectDashboard.styles";
import useStore from "src/utils/useStore";
import { seedDefaultTPAOptions } from "../../utils";
import PlanSetInput from "./components/PlanSetInput";
import PlanSetOptionSection from "./components/PlanSetOptionSection";
import SelectedPlans from "./components/SelectedPlans";
import TagSection from "./components/TagSection";
import {
  Container,
  HeaderWrapper,
  Description,
} from "./planFormSection.styles";

const PlanFormSection = () => {
  const { programBuildStore } = useStore();
  const params = useParams();
  const prospectId: string = get(params, "prospectId", "");
  const recipeId: string = get(params, "recipeId", "");
  const methods = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const { setValue } = methods;

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

  useEffect(() => {
    if (
      programBuildStore?.tpas?.length > 0 &&
      programBuildStore?.networkIngredientWithTPAs?.length > 0
    ) {
      seedDefaultTPAOptions(setValue, programBuildStore);
    }
  }, [
    programBuildStore?.orgRecipe,
    programBuildStore?.tpas,
    programBuildStore?.networkIngredientWithTPAs,
  ]);

  return (
    <Container>
      <HeaderWrapper
        title="Plan Designs"
        description={
          <Description>
            <span>
              A plan set is a group of plans offered as a package of options.
              Within a plan set you can add new plans or match existing plans.
              You have the freedom to create multiple plans within a set and
              multiple sets.
            </span>
          </Description>
        }
      />
      <FormProvider {...methods}>
        <ColNoSpacing xl="12" lg="12" md="12" sm="12" xs="12">
          <PlanSetInput />
        </ColNoSpacing>
        <ColNoSpacing xl="12" lg="12" md="12" sm="12" xs="12">
          <TagSection />
        </ColNoSpacing>
        <ColNoSpacing xl="12" lg="12" md="12" sm="12" xs="12">
          <PlanSetOptionSection />
        </ColNoSpacing>
        <ColNoSpacing xl="12" lg="12" md="12" sm="12" xs="12">
          <SelectedPlans />
        </ColNoSpacing>
      </FormProvider>
    </Container>
  );
};

export default observer(PlanFormSection);
