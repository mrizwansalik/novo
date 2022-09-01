import { Fragment } from "react";
import SubHeader from "src/components/Header/components/SubHeader";
import Header from "../../components/Header";
import TeamMemberPage from "../../components/Pages/TeamMemberPage";
import { Container, MainContent } from "./styles";

const TeamMemberLayout = () => {
  return (
    <Fragment>
      <Header />
      <SubHeader />
      <Container>
        <MainContent>
          <TeamMemberPage />
        </MainContent>
      </Container>
    </Fragment>
  );
};

export default TeamMemberLayout;
