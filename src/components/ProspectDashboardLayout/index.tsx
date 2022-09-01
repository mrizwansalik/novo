import React, { useEffect } from "react";
import { get } from "lodash";
import { useParams } from "react-router-dom";
import QouteHeader from "src/components/Header/components/QouteHeader";
import VerticalNavbar from "src/components/VerticalNavbar";
import { navbarList } from "src/constants";
import { IParamTypes } from "src/types";
import { dynamicNavbar } from "src/utils/navbarList";
import useStore from "src/utils/useStore";
import PageLayout from "../PageLayout";
import {
  Container,
  MainContent,
  SideBar,
} from "./prospectDashboardLayout.style";

interface IProspectDashboardLayoutProps {
  children: React.ReactChild;
  title?: string;
}

const ProspectDashboardLayout = (props: IProspectDashboardLayoutProps) => {
  const { children, title } = props;
  const { prospectId } = useParams<IParamTypes>();

  const {
    orgStore,
    prospectDashboardStore,
    brokerProspectsListStore,
  } = useStore();
  const { orgDetail } = orgStore;
  const { currentProspectProgress } = prospectDashboardStore;
  const { currentProspect } = brokerProspectsListStore;

  useEffect(() => {
    prospectDashboardStore.setCurrentProspectProgress(prospectId);
  }, [prospectId]);
  return (
    <PageLayout title={title}>
      <>
        <QouteHeader title={currentProspect?.name} />
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
          <MainContent>{children}</MainContent>
        </Container>
      </>
    </PageLayout>
  );
};
export default ProspectDashboardLayout;
