import React, { Fragment, useState, useEffect } from "react";
import { get } from "lodash";
import { useParams } from "react-router-dom";
import { IParamTypes } from "src/types";
import { dynamicNavbar } from "src/utils/navbarList";
import useStore from "src/utils/useStore";
import Header from "../../components/Header";
import CensusDetailPage from "../../components/Pages/CensusDetailPage";
import VerticalNavbar from "../../components/VerticalNavbar";
import { navbarList } from "../../constants";
import { Container, MainContent, SideBar, TitleContainer } from "./styles";
const CensusDetailLayout = () => {
  const { orgStore, brokerProspectsListStore } = useStore();
  const { orgDetail } = orgStore;
  const {
    setCurrentProspect,
    setCurrentProspectProgress,
    currentProspectProgress,
  } = brokerProspectsListStore;
  const { prospectId } = useParams<IParamTypes>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await Promise.all([
        setCurrentProspect(prospectId),
        setCurrentProspectProgress(prospectId),
      ]);
      setIsLoading(false);
    })();
  }, []);

  return (
    <Fragment>
      <Header />
      <Container>
        <SideBar>
          <VerticalNavbar
            navbarList={dynamicNavbar(
              get(orgDetail, "id"),
              navbarList,
              prospectId,
              currentProspectProgress
            )}
          />
        </SideBar>
        <MainContent>
          <TitleContainer>Census</TitleContainer>
          {!isLoading && <CensusDetailPage />}
        </MainContent>
      </Container>
    </Fragment>
  );
};

export default CensusDetailLayout;
