import React from "react";
import { useHistory, useParams } from "react-router-dom";
import ColNoSpacing from "src/components/ColNoSpacing";
import PageLayout from "src/components/PageLayout";
import ProfileHeader from "src/pages/createNewQuote/components/ProfileHeader";
import routes from "src/routes";
import { IParamTypes } from "src/types";
import ProfileTitleBar from "./components/ProfileTitleBar";
import SideMenu from "./components/SideMenu";
import {
  ComponentContainer,
  ContentContainer,
} from "./programBuildOnboardingLayout.style";

interface IProgramBuildOnboardingLayoutProps {
  title?: string;
  step: number;
  children: React.ReactChild;
}

const ProgramBuildOnboardingLayout = (
  props: IProgramBuildOnboardingLayoutProps
) => {
  const { title, step, children } = props;

  const history = useHistory();
  const { orgId, brokerageId, prospectId } = useParams<IParamTypes>();
  const accountOrgId = orgId || brokerageId;

  return (
    <PageLayout title={title || "Program Build | Novo Connection"}>
      <ComponentContainer>
        <ProfileHeader
          skipCallback={() =>
            history.push(
              routes.dashboard.god.brokerages.prospects.dashboard.value(
                accountOrgId,
                prospectId
              )
            )
          }
        />
        <ProfileTitleBar step={step} />
        <ContentContainer>
          <ColNoSpacing lg={3}>
            <SideMenu step={step} />
          </ColNoSpacing>
          <ColNoSpacing lg={9}>{children}</ColNoSpacing>
        </ContentContainer>
      </ComponentContainer>
    </PageLayout>
  );
};
export default ProgramBuildOnboardingLayout;
