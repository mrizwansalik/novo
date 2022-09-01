import { observer } from "mobx-react";
import ColNoSpacing from "src/components/ColNoSpacing";
import CreatePlanCard from "./components/CreatePlanCard";
import MatchPlanCard from "./components/MatchPlanCard";
import {
  Container,
  MediumSpacingLeft,
  MediumSpacingRight,
} from "./planSetOptionSection.styles";

const PlanSetOptionSection = () => {
  return (
    <Container>
      <ColNoSpacing xl="6" lg="6" md="6" sm="6" xs="6">
        <MediumSpacingRight>
          <MatchPlanCard />
        </MediumSpacingRight>
      </ColNoSpacing>
      <ColNoSpacing xl="6" lg="6" md="6" sm="6" xs="6">
        <MediumSpacingLeft>
          <CreatePlanCard />
        </MediumSpacingLeft>
      </ColNoSpacing>
    </Container>
  );
};

export default observer(PlanSetOptionSection);
