import { useEffect } from "react";
import get from "lodash/get";
import { observer } from "mobx-react";
import { useParams } from "react-router";
import LoadingBar from "react-top-loading-bar";
import PageLayout from "src/components/PageLayout";
import { ThemeColor } from "src/constants";
import useStore from "src/utils/useStore";
import ProfileHeader from "../components/ProfileHeader";
import HealthClaimsDocumentsForm from "./components/PHQForm";
import ProfileTitleBar from "./components/ProfileTitleBar";
import {
  ContentContainer,
  PageContainer,
} from "./personalHealthQuestionnairesStatusPage.styles";

const PersonalHealthQuestionnairesStatusPage = () => {
  const params = useParams();
  const { benefitStore, workerStore, brokerProspectsListStore } = useStore();
  const prospectId: string = get(params, "prospectId", "");
  const { loadingProgress } = benefitStore;

  useEffect(() => {
    if (prospectId) {
      benefitStore.fetchAssignedDocuments(prospectId);
      workerStore.getProspectWorkers(prospectId);
      brokerProspectsListStore.setCurrentProspect(prospectId);
    }
  }, [prospectId]);

  useEffect(() => {
    benefitStore.fetchPhqDocuments();
  }, []);

  return (
    <PageLayout title="Client Profile | Novo Connection">
      <PageContainer>
        <LoadingBar
          color={ThemeColor.AZURE_RADIANCE}
          progress={loadingProgress}
          onLoaderFinished={() => benefitStore.setLoadingProgress(0)}
        />
        <ProfileHeader />
        <ProfileTitleBar />
        <ContentContainer>
          <HealthClaimsDocumentsForm />
        </ContentContainer>
      </PageContainer>
    </PageLayout>
  );
};

export default observer(PersonalHealthQuestionnairesStatusPage);
