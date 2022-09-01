import React from "react";
import PageLayout from "src/components/PageLayout";
import PlanDesignForm from "src/components/Pages/ExistingPlansDesign/PlanDesignForm";

import ProfileHeader from "../components/ProfileHeader";
import {
  ContentContainer,
  PageContainer,
  PageHeader,
} from "./existingPlansDesignPage.style";

const ExistingPlansDesignPage = () => {
  return (
    <PageLayout title="Client Profile | Novo Connection">
      <PageContainer>
        <ProfileHeader />
        <PageHeader>
          <div>
            <h2>Existing Self Funded Plans</h2>
            <h1>Current Plan Design</h1>
          </div>
        </PageHeader>
        <ContentContainer>
          <PlanDesignForm />
        </ContentContainer>
      </PageContainer>
    </PageLayout>
  );
};

export default ExistingPlansDesignPage;
