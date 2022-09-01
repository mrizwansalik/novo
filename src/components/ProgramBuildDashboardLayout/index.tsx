import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import useStore from "src/utils/useStore";
import ColNoSpacing from "../ColNoSpacing";
import PageLayout from "../PageLayout";
import ProfileTitleBar from "./components/ProfileTitleBar";
import SideMenu from "./components/SideMenu";
import {
  Container,
  ContentContainer,
} from "./programBuildDashboardLayout.style";

interface IProgramBuildDashboardLayoutProps {
  children: React.ReactChild;
  title?: string;
  step: number;
}

const ProgramBuildDashboardLayout = (
  props: IProgramBuildDashboardLayoutProps
) => {
  const history = useHistory();
  const { title, children, step } = props;
  const { programStore } = useStore();

  useEffect(() => {
    programStore.setIsDashboardPage(true);
  }, []);

  return (
    <PageLayout title={title}>
      <>
        <Container>
          <ProfileTitleBar step={step} />
        </Container>
        <ContentContainer>
          <ColNoSpacing lg="3">
            <SideMenu step={step} />
          </ColNoSpacing>
          <ColNoSpacing lg="9">{children}</ColNoSpacing>
        </ContentContainer>
      </>
    </PageLayout>
  );
};
export default ProgramBuildDashboardLayout;
