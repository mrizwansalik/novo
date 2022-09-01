import { useState } from "react";
import { get } from "lodash";
import { observer } from "mobx-react";
import { useHistory, useParams } from "react-router";
import { toast } from "react-toastify";
import { createPlanSet } from "src/api/planSet";
import { IParamTypes } from "src/types";
import useStore from "src/utils/useStore";
import { getPlanSetsPageRoute } from "../../uitls";
import {
  AmountGroup,
  CommonInput,
  SaveButton,
  Container,
  CommonLabel,
} from "./planSetInput.styles";

const PlanSetInput = () => {
  const [planSetName, setPlanSetName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();
  const { brokerageId, prospectId, recipeId } = useParams<IParamTypes>();
  const { programStore } = useStore();
  const { orgRecipe, isDashboardPage } = programStore;

  function handleChangePlanSetName(newName: string) {
    setPlanSetName(newName);
    const planSets = get(orgRecipe, "plan_sets", []);
    const hasError = planSets.some(
      (plan) => plan.name.toLowerCase() === newName
    );
    if (hasError) {
      setErrorMessage("A plan set with this name already exists");
    } else {
      setErrorMessage("");
    }
  }

  async function addNewPlanSet() {
    try {
      const planSetData = {
        name: planSetName,
      };
      const newPlanSet = await createPlanSet(prospectId, recipeId, planSetData);
      toast.success("Plan set created.");
      programStore.fetchOrgRecipe(prospectId, recipeId);
      const planSetRoute = getPlanSetsPageRoute(
        isDashboardPage,
        brokerageId,
        prospectId,
        recipeId,
        newPlanSet.id
      );
      history.push(planSetRoute);
    } catch (e) {
      toast.error("There was an error saving the plan set.");
    }
  }

  return (
    <Container>
      <CommonLabel>Build your plans</CommonLabel>
      <AmountGroup md="4">
        <CommonInput
          placeholder="Plan set name"
          value={planSetName}
          onChange={(event) => handleChangePlanSetName(event.target.value)}
        />
        <SaveButton
          disabled={!planSetName || errorMessage}
          onClick={addNewPlanSet}
        >
          Add Plan Set
        </SaveButton>
      </AmountGroup>
    </Container>
  );
};

export default observer(PlanSetInput);
