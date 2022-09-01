import PageLayout from "src/components/PageLayout";
import ProfileHeader from "../components/ProfileHeader";
import HealthChoiceForm from "./components/HealthChoiceForm";
import ProfileTitleBar from "./components/ProfileTitleBar";
import { ContentContainer, PageContainer } from "./healthChoicePage";

const OnboardingProfilePage = () => {
  return (
    <PageLayout title="Client Profile | Novo Connection">
      <PageContainer>
        <ProfileHeader />
        <ProfileTitleBar />
        <ContentContainer>
          <HealthChoiceForm />
        </ContentContainer>
      </PageContainer>
    </PageLayout>
  );
};

export default OnboardingProfilePage;
