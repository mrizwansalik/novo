import React, { Fragment, useState, useEffect } from "react";
import { get } from "lodash";
import { useParams } from "react-router-dom";
import { IParamTypes } from "src/types";
import { dynamicNavbar } from "src/utils/navbarList";
import useStore from "src/utils/useStore";
import Header from "../../components/Header";
import CensusCustomTemplatePage from "../../components/Pages/CensusCustomTemplatePage";
import VerticalNavbar from "../../components/VerticalNavbar";
import { navbarList } from "../../constants";
import { Container, MainContent, SideBar } from "./styles";
const CensusCustomTemplateLayout = () => {
  const { orgStore, brokerProspectsListStore, censusDetailsStore } = useStore();
  const { orgDetail } = orgStore;
  const {
    setCurrentProspect,
    setCurrentProspectProgress,
    currentProspectProgress,
  } = brokerProspectsListStore;
  const { prospectId, templateId } = useParams<IParamTypes>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await Promise.all([
        setCurrentProspect(prospectId),
        setCurrentProspectProgress(prospectId),
      ]);
      if (templateId) {
        await censusDetailsStore.setCurrentTemplate(prospectId, templateId);
      } else {
        censusDetailsStore.clearCurrentTemplate();
      }
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
        <MainContent>{!isLoading && <CensusCustomTemplatePage />}</MainContent>
      </Container>
    </Fragment>
  );
};

export default CensusCustomTemplateLayout;
