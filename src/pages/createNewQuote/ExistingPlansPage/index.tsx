import React from "react";
import { get } from "lodash";
import { observer } from "mobx-react";
import { useHistory, useParams } from "react-router-dom";
import Icon from "src/components/Icon";
import PageLayout from "src/components/PageLayout";
import routes from "src/routes";
import ProfileHeader from "../components/ProfileHeader";
import {
  PrimaryButton,
  ContentContainer,
  PageContainer,
  PageHeader,
  RowSeparator,
  TemplateOption,
} from "./existingPlansPage.style";

const ExistingPlansPage = () => {
  const history = useHistory();
  const params = useParams();
  const orgId = get(params, "orgId");

  return (
    <PageLayout title="Client Profile | Novo Connection">
      <PageContainer>
        <ProfileHeader />
        <PageHeader>
          <h1>Enter your existing plans</h1>
          <h3>
            Adding existing plans now is recommended to enable plan & cost
            comparisons
          </h3>
          <a
            href={routes.dashboard.brokerage.prospects.onBoarding.programBuild.choice.value(
              orgId
            )}
          >
            Skip <Icon iconName="blue-arrow-right.png" size={18} />
          </a>
        </PageHeader>
        <ContentContainer>
          <TemplateOption>
            <h1>Self Funded Plans</h1>
            <PrimaryButton
              onClick={() =>
                history.push(
                  routes.dashboard.brokerage.prospects.onBoarding.existingPlans.selfFunded.getValue(
                    orgId
                  )
                )
              }
            >
              Add Self Funded
            </PrimaryButton>
          </TemplateOption>
          <RowSeparator />
          <TemplateOption>
            <h1>Fully Insured Plans</h1>
            <PrimaryButton
              onClick={() =>
                history.push(
                  routes.dashboard.brokerage.prospects.onBoarding.existingPlans.planDesign.getValue(
                    orgId
                  )
                )
              }
            >
              Add Fully Insured
            </PrimaryButton>
          </TemplateOption>
        </ContentContainer>
      </PageContainer>
    </PageLayout>
  );
};

export default observer(ExistingPlansPage);
