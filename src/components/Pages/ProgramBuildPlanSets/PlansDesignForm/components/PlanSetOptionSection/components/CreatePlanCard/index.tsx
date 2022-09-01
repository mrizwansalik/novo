import { useHistory, useParams } from "react-router-dom";
import { IParamTypes } from "src/types";
import useStore from "src/utils/useStore";
import { getPlanDetailPageRoute } from "../../../../uitls";
import {
  Container,
  Label,
  Description,
  OutlineButton,
} from "./optionCard.styles";

const OptionCard = () => {
  const history = useHistory();
  const {
    brokerageId,
    prospectId,
    recipeId,
    planSetId,
  } = useParams<IParamTypes>();
  const { programStore, existingPlansStore } = useStore();
  const { isDashboardPage } = programStore;
  const { existingPlans } = existingPlansStore;

  return (
    <Container>
      <Label xl="12" lg="12" md="12" sm="12" xs="12">
        Create your own
      </Label>
      <Description xl="12" lg="12" md="12" sm="12" xs="12">
        Customize new plans
      </Description>
      <OutlineButton
        onClick={() =>
          history.push(
            getPlanDetailPageRoute(
              isDashboardPage,
              brokerageId,
              prospectId,
              recipeId,
              planSetId,
              ""
            )
          )
        }
        label="Create"
      />
    </Container>
  );
};

export default OptionCard;
