import React from "react";
import { observer } from "mobx-react";
import PageLayout from "src/components/PageLayout";
import ExistingPlansParticipation from "src/components/Pages/ExistingPlansParticipation";
import ProfileHeader from "../components/ProfileHeader";
import {
  ContentContainer,
  PageContainer,
  PageHeader,
} from "./existingPlansParticipationPage.style";

const ExistingPlansParticipationPage = () => {
  return (
    <PageLayout title="Plan Participation | Novo Connection">
      <PageContainer>
        <ProfileHeader />
        <PageHeader>
          <div>
            <h2>Existing Self Funded Plans</h2>
            <h1>Pricing & Participation</h1>
          </div>
        </PageHeader>
        <ContentContainer>
          <ExistingPlansParticipation />
        </ContentContainer>
      </PageContainer>
    </PageLayout>
  );
};

export default observer(ExistingPlansParticipationPage);
