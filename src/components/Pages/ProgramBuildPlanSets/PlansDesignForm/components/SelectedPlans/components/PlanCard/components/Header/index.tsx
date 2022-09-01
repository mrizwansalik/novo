import { RefObject, useRef, useState } from "react";
import { get } from "lodash";
import { observer } from "mobx-react";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { removeMedicalPlanFromPlanSet } from "src/api/planSet";
import { getPlanDetailPageRoute } from "src/components/Pages/ProgramBuildPlanSets/PlansDesignForm/uitls";
import { IMedicalPlan } from "src/interfaces/orgRecipes";
import { IParamTypes } from "src/types";
import useStore from "src/utils/useStore";
import TooltipOptions, { ITooltipOption } from "../TooltipOptions";
import {
  Container,
  Label,
  LabelWrapper,
  MenuIcon,
  Description,
} from "./header.styles";

interface IHeaderProps {
  plan: IMedicalPlan;
}

const Header = (props: IHeaderProps) => {
  const { plan } = props;
  const history = useHistory();
  const tooltipRef: RefObject<HTMLDivElement> = useRef();
  const [isOpenTooltip, setIsOpenTooltip] = useState<boolean>(false);

  const {
    brokerageId,
    prospectId,
    recipeId,
    planSetId,
  } = useParams<IParamTypes>();
  const { programStore, programBuildPlanSetsStore } = useStore();
  const { isDashboardPage } = programStore;
  const { plans } = programBuildPlanSetsStore;

  const planId = get(plan, "id", "");
  const planName = get(plan, "medical_plan.name", "");
  const deductibleIn = get(plan, "medical_plan.deductible_in", 0);
  const coinsuranceIn = get(plan, "medical_plan.coinsurance_in", 0);
  const outOfPocketMaxIn = get(plan, "medical_plan.out_of_pocket_max_in", 0);
  const summary = `$${deductibleIn}/
  ${coinsuranceIn * 100}%/
  $${outOfPocketMaxIn}`;

  const options: ITooltipOption[] = [
    {
      label: "Edit",
      handler: handleEditPlan,
    },
    {
      label: "Delete",
      handler: handleRemovePlan,
    },
  ];

  function handleEditPlan() {
    const planDetailPageRoute = getPlanDetailPageRoute(
      isDashboardPage,
      brokerageId,
      prospectId,
      recipeId,
      planSetId,
      planId
    );
    history.push(planDetailPageRoute);
  }

  async function handleRemovePlan() {
    try {
      await removeMedicalPlanFromPlanSet(prospectId, planSetId, planId);
      const newPlans = plans.filter((item) => item.id !== planId);
      programBuildPlanSetsStore.updateMedicalPlans(newPlans);
      programStore.fetchOrgRecipe(prospectId, recipeId);
      toast.success("Plan removed.");
    } catch (e) {
      toast.error("There was an error removing the plan.");
    }
  }

  return (
    <Container>
      <LabelWrapper>
        <Label>{planName}</Label>
        <div ref={tooltipRef}>
          <MenuIcon
            iconName="dots_menu.png"
            onClick={() => setIsOpenTooltip(true)}
          />
        </div>
        {isOpenTooltip && (
          <TooltipOptions
            setIsOpenTooltip={setIsOpenTooltip}
            parentRef={tooltipRef}
            tooltipOptions={options}
          />
        )}
      </LabelWrapper>
      <Description>{summary}</Description>
    </Container>
  );
};

export default observer(Header);
