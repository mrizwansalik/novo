import { Fragment } from "react";
import React, { useEffect } from "react";
import { get } from "lodash";
import { useParams } from "react-router-dom";
import { IParamTypes } from "src/types";
import { dynamicNavbar } from "src/utils/navbarList";
import useStore from "src/utils/useStore";
import Header from "../../components/Header";
import HomePage from "../../components/Pages/HomePage";
import VerticalNavbar from "../../components/VerticalNavbar";
import { navbarList } from "../../constants";
import { Container, SideBar, MainContent } from "./styles";
const HomeLayout = (props) => {
  const { children } = props;
  const { prospectId } = useParams<IParamTypes>();
  const { orgStore, brokerProspectsListStore } = useStore();
  const { orgDetail } = orgStore;
  const {
    setCurrentProspect,
    setCurrentProspectProgress,
    currentProspectProgress,
  } = brokerProspectsListStore;
  useEffect(() => {
    (async () => {
      await Promise.all([
        setCurrentProspect(prospectId),
        setCurrentProspectProgress(prospectId),
      ]);
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
          <HomePage />
          {children}
        </MainContent>
      </Container>
    </Fragment>
  );
};

export default HomeLayout;
