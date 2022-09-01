import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { Col, Row } from "reactstrap";
import PageLayout from "src/components/PageLayout";
import FormSidebar from "src/components/Pages/ExistingPlansDocuments/FormSidebar";
import useProspectDetail from "src/hooks/ProspectDetail";
import useStore from "src/utils/useStore";
import DocumentsForm from "../../../components/Pages/ExistingPlansDocuments/DocumentsForm";
import ProfileHeader from "../components/ProfileHeader";
import {
  ContentContainer,
  PageContainer,
  PageHeader,
} from "./existingPlansDocumentsPage.style";

const ExistingPlansParticipationPage = () => {
  const prospectDetail = useProspectDetail();

  const { onboardingQuoteStore } = useStore();

  useEffect(() => {
    onboardingQuoteStore.setProspectDetail(prospectDetail);
  }, [prospectDetail]);

  return (
    <PageLayout title="Plan Participation | Novo Connection">
      <PageContainer>
        <ProfileHeader />
        <PageHeader>
          <div>
            <h1>Existing Plans</h1>
            <h3>
              Existing rates, a recent invoice, renewals and SBCs are required
              for underwriting. If you don't have these documents now, don't
              worry, you can upload them later.
            </h3>
          </div>
        </PageHeader>
        <ContentContainer>
          <Row>
            <Col lg={9} md={9}>
              <DocumentsForm />
            </Col>
            <Col lg={3} md={3}>
              <FormSidebar />
            </Col>
          </Row>
        </ContentContainer>
      </PageContainer>
    </PageLayout>
  );
};

export default observer(ExistingPlansParticipationPage);
