import { useEffect } from "react";
import get from "lodash/get";
import { useParams } from "react-router";
import PageLayout from "src/components/PageLayout";
import useStore from "src/utils/useStore";
import ProfileHeader from "../components/ProfileHeader";
import { getClaimsDetail } from "../HealthClaimsDocumentsPage/utils";
import HealthClaimsHistoryForm from "./components/HealthClaimsHistoryForm";
import ProfileTitleBar from "./components/ProfileTitleBar";
import {
  ContentContainer,
  PageContainer,
} from "./healthClaimsHistoryPage.styles";

const HealthClaimsHistoryPage = () => {
  const { benefitStore } = useStore();
  const params = useParams();
  const prospectId: string = get(params, "prospectId", "");

  useEffect(() => {
    if (prospectId) {
      getClaimsDetail(benefitStore, prospectId);
    }
  }, [prospectId]);

  return (
    <PageLayout title="Client Profile | Novo Connection">
      <PageContainer>
        <ProfileHeader />
        <ProfileTitleBar />
        <ContentContainer>
          <HealthClaimsHistoryForm />
        </ContentContainer>
      </PageContainer>
    </PageLayout>
  );
};

export default HealthClaimsHistoryPage;
