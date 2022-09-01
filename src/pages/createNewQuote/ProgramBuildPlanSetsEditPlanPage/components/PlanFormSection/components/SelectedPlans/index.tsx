import PlanCard from "./components/PlanCard";
import { Container, CardWrapper } from "./selectedPlans.styles";

const SelectedPlans = () => {
  return (
    <Container>
      <CardWrapper lg="4">
        <PlanCard />
      </CardWrapper>
      <CardWrapper lg="4">
        <PlanCard />
      </CardWrapper>
      <CardWrapper lg="4">
        <PlanCard />
      </CardWrapper>
    </Container>
  );
};

export default SelectedPlans;
