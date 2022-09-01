import ColNoSpacing from "src/components/ColNoSpacing";
import OptionCard from "./components/OptionCard";
import { cards } from "./constants";
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
          <OptionCard card={cards[0]} />
        </MediumSpacingRight>
      </ColNoSpacing>
      <ColNoSpacing xl="6" lg="6" md="6" sm="6" xs="6">
        <MediumSpacingLeft>
          <OptionCard card={cards[1]} />
        </MediumSpacingLeft>
      </ColNoSpacing>
    </Container>
  );
};

export default PlanSetOptionSection;
