import ColNoSpacing from "src/components/ColNoSpacing";
import SideMenu from "../../../components/NetworkForm/SideMenu";
import PlanDesignsForm from "./PlanDesignsForm";
import { Container } from "./planDesignsFormLayout.styles";

const PlanDesignsFormLayout = () => {
  return (
    <Container>
      <ColNoSpacing lg="3">
        <SideMenu />
      </ColNoSpacing>
      <ColNoSpacing lg="9">
        <PlanDesignsForm />
      </ColNoSpacing>
    </Container>
  );
};

export default PlanDesignsFormLayout;
