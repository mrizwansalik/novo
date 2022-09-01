import get from "lodash/get";
import { useHistory, useParams } from "react-router-dom";
import routes from "src/routes";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ParticipationForm from "./components/ParticipationForm";
import { Container } from "./planCard.styles";

const PlanCard = () => {
  const history = useHistory();
  const params = useParams();

  const orgId: string = get(params, "orgId", "");
  const prospectId: string = get(params, "prospectId", "");
  const recipeId: string = get(params, "recipeId", "");
  const planSetId: string = get(params, "planSetId", "");
  const planId: string = "mock-id";

  function handleEditPlan(): void {
    history.push(
      routes.dashboard.god.brokerages.prospects.onboarding.programBuild.recipe.plansets.plans.getValue(
        orgId,
        prospectId,
        recipeId,
        planSetId,
        planId
      )
    );
  }

  function handleRemovePlan(): void {}

  return (
    <Container>
      <Header
        handleEditPlan={handleEditPlan}
        handleRemovePlan={handleRemovePlan}
      />
      <ParticipationForm />
      <Footer />
    </Container>
  );
};

export default PlanCard;
