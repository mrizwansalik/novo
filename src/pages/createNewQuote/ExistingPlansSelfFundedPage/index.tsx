import React from "react";
import { observer } from "mobx-react";

import PageLayout from "src/components/PageLayout";

import ExistingPlansStopLoss from "src/components/Pages/ExistingPlansStopLoss";
import ProfileHeader from "../components/ProfileHeader";
import { PageContainer, PageHeader } from "./existingPlansSelfFundedPage.style";

const ExistingPlansSelfFundedPage = () => {
  return (
    <PageLayout title="Client Profile | Novo Connection">
      <PageContainer>
        <ProfileHeader />
        <PageHeader>
          <div>
            <h2>Existing Self Funded Plans</h2>
            <h1>Current Stop Loss</h1>
          </div>
        </PageHeader>
        <ExistingPlansStopLoss />
      </PageContainer>
    </PageLayout>
  );
};

export default observer(ExistingPlansSelfFundedPage);
