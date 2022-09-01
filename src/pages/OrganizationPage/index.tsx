import React, { Fragment } from "react";
import Header from "../../components/Header";
import OrganizationListPage from "../../components/Pages/OrganizationListPage";
import { Container, MainContent } from "./style";
const BrokerageListLayout = () => {
  return (
    <Fragment>
      <Header />
      <Container>
        <MainContent>
          <OrganizationListPage />
        </MainContent>
      </Container>
    </Fragment>
  );
};

export default BrokerageListLayout;
