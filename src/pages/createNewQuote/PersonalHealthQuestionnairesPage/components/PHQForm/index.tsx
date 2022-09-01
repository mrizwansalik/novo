import { useHistory, useParams } from "react-router-dom";
import routes from "src/routes";
import { IParamTypes } from "src/types";
import AssignCard from "./components/AssignCard";
import InviteCard from "./components/InviteCard";
import { Container, CardLayout, NextButton } from "./phqForm.styles";

const PHQForm = () => {
  const { prospectId } = useParams<IParamTypes>();
  const history = useHistory();

  return (
    <Container>
      <CardLayout
        xl={{ size: 12 }}
        lg={{ size: 12 }}
        md={{ size: 12 }}
        sm={{ size: 12 }}
        xs={{ size: 12 }}
      >
        <InviteCard />
      </CardLayout>
      <CardLayout
        xl={{ size: 12 }}
        lg={{ size: 12 }}
        md={{ size: 12 }}
        sm={{ size: 12 }}
        xs={{ size: 12 }}
      >
        <AssignCard />
      </CardLayout>
      <NextButton
        label="Next"
        onClick={() =>
          history.push(
            routes.dashboard.brokerage.prospects.onBoarding.health.phqs.status.value(
              prospectId
            )
          )
        }
      />
    </Container>
  );
};

export default PHQForm;
