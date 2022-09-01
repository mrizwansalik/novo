import { useEffect } from "react";
import get from "lodash/get";
import { useParams } from "react-router";
import PageLayout from "src/components/PageLayout";
import useStore from "src/utils/useStore";
import ProfileHeader from "../components/ProfileHeader";
import HealthClaimsDocumentsForm from "./components/PHQForm";
import ProfileTitleBar from "./components/ProfileTitleBar";
import {
  ContentContainer,
  PageContainer,
} from "./personalHealthQuestionnairesPage.styles";

const PersonalHealthQuestionnairesPage = () => {
  const params = useParams();
  const { benefitStore } = useStore();
  const prospectId: string = get(params, "prospectId", "");

  useEffect(() => {
    benefitStore.fetchSelectedPhqDocuments(prospectId);
  }, [prospectId]);

  return (
    <PageLayout title="Client Profile | Novo Connection">
      <PageContainer>
        <ProfileHeader />
        <ProfileTitleBar />
        <ContentContainer>
          <HealthClaimsDocumentsForm />
        </ContentContainer>
      </PageContainer>
    </PageLayout>
  );
};

export default PersonalHealthQuestionnairesPage;
