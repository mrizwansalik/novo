import React from "react";
import { get } from "lodash";
import { observer } from "mobx-react";
import { useParams } from "react-router-dom";
import { IParamTypes } from "src/types";
import useStore from "src/utils/useStore";
import PlanSetInput from "./components/PlanSetInput";
import PlanSetOptionSection from "./components/PlanSetOptionSection";
import SelectedPlans from "./components/SelectedPlans";
import TagSection from "./components/TagSection";
import { Container, HeaderWrapper, Description } from "./programSection.styles";

const PlansDesignForm = () => {
  const { planSetId } = useParams<IParamTypes>();
  const { programStore, programBuildPlanSetsStore } = useStore();
  const { orgRecipe } = programStore;
  const planSets = get(orgRecipe, "plan_sets", []);
  const { plans } = programBuildPlanSetsStore;
  const showSelectedPlans = Array.isArray(plans) && plans.length > 0;

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
      <PlanSetInput />
      {Array.isArray(planSets) && planSets.length > 0 && <TagSection />}
      {planSetId && <PlanSetOptionSection />}
      <SelectedPlans />
    </Container>
  );
};

export default observer(PlansDesignForm);
