import { get } from "lodash";
import { observer } from "mobx-react";
import { useHistory, useParams } from "react-router";
import { IPlanSet } from "src/interfaces/orgRecipes";
import { IParamTypes } from "src/types";
import useStore from "src/utils/useStore";
import { getPlanSetsPageRoute } from "../../uitls";
import PlanSetNameTag from "./components/PlanSetNameTag";
import { TitleSection, TableLabel } from "./tagSection.styles";

const TagSection = () => {
  const history = useHistory();
  const {
    brokerageId,
    prospectId,
    recipeId,
    planSetId,
  } = useParams<IParamTypes>();
  const { programStore } = useStore();
  const { orgRecipe, isDashboardPage } = programStore;
  const planSets = get(orgRecipe, "plan_sets", []);

  const showAddButton = !Array.isArray(planSets) || !planSets.length;

  function handleChangePlanSet(newPlanSetId: string) {
    const route = getPlanSetsPageRoute(
      isDashboardPage,
      brokerageId,
      prospectId,
      recipeId,
      newPlanSetId
    );
    history.push(route);
  }

  return (
    <TitleSection
      xl={{ size: 12 }}
      lg={{ size: 12 }}
      md={{ size: 12 }}
      sm={{ size: 12 }}
      xs={{ size: 12 }}
    >
      <TableLabel>
        {showAddButton ? (
          <></>
        ) : (
          planSets.map((planSet: IPlanSet) => (
            <PlanSetNameTag
              key={planSet.id}
              onClick={() => handleChangePlanSet(planSet.id)}
              label={planSet.name}
              active={planSet.id === planSetId}
            />
          ))
        )}
      </TableLabel>
    </TitleSection>
  );
};

export default observer(TagSection);
