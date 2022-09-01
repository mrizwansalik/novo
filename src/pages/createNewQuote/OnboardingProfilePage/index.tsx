import PageLayout from "src/components/PageLayout";
import ProfileForm from "../components/ProfileForm";
import ProfileHeader from "../components/ProfileHeader";
import ProfileTitleBar from "../components/ProfileTitleBar";
import { ContentContainer, PageContainer } from "./onboardingProfilePage.style";

const OnboardingProfilePage = () => {
  return (
    <PageLayout title="Client Profile | Novo Connection">
      <PageContainer>
        <ProfileHeader />
        <ProfileTitleBar />
        <ContentContainer>
          <ProfileForm />
        </ContentContainer>
      </PageContainer>
    </PageLayout>
  );
};

export default OnboardingProfilePage;
