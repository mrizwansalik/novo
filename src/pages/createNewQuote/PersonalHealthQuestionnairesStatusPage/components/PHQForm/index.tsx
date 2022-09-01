import InviteCard from "./components/InviteCard";
import StatusTabs from "./components/StatusTabs";
import { Container, CardLayout } from "./phqForm.styles";

const PHQForm = () => {
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
        <StatusTabs />
      </CardLayout>
    </Container>
  );
};

export default PHQForm;
