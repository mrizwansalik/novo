import { useEffect } from "react";
import get from "lodash/get";
import { observer } from "mobx-react";
import { useHistory, useParams } from "react-router";
import PageLayout from "src/components/PageLayout";
import routes from "src/routes";
import { syncOrgRecipes } from "src/utils/programBuild";
import useStore from "src/utils/useStore";
import ProfileHeader from "../components/ProfileHeader";
import HealthChoiceForm from "./components/HealthChoiceForm";
import ProfileTitleBar from "./components/ProfileTitleBar";
import { ContentContainer, PageContainer } from "./programBuildChoicePage";

const ProgramBuildChoicePage = () => {
  const { orgStore } = useStore();
  const params = useParams();
  const history = useHistory();
  const prospectId: string = get(params, "prospectId", "");
  const orgId: string = orgStore?.orgDetail?.id;

  useEffect(() => {
    if (prospectId) {
      syncOrgRecipes(prospectId);
    }
  }, [prospectId]);

  return (
    <PageLayout title="Program Builder Choice | Novo Connection">
      <PageContainer>
        <ProfileHeader
          skipCallback={() =>
            history.push(
              routes.dashboard.god.brokerages.prospects.dashboard.value(
                orgId,
                prospectId
              )
            )
          }
        />
        <ProfileTitleBar />
        <ContentContainer>
          <HealthChoiceForm />
        </ContentContainer>
      </PageContainer>
    </PageLayout>
  );
};

export default observer(ProgramBuildChoicePage);
