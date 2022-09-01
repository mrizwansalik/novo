import { useEffect, useState } from "react";
import get from "lodash/get";
import { observer } from "mobx-react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import LoadingBar from "react-top-loading-bar";
import PageLayout from "src/components/PageLayout";
import { ThemeColor, ThirdPartyAdministratorFormValues } from "src/constants";
import routes from "src/routes";
import { syncOrgRecipes } from "src/utils/programBuild";
import useStore from "src/utils/useStore";
import ProfileHeader from "../components/ProfileHeader";
import BuildNetworkForm from "./components/BuildNetworkForm";
import ProfileTitleBar from "./components/ProfileTitleBar";
import {
  ContentContainer,
  PageContainer,
} from "./programBuildThirdPartyAdministratorsPage.styles";
import { syncThirdPartyAdministrators } from "./utils";

const ProgramBuildThirdPartyAdministratorsPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const methods = useForm({
    defaultValues: {
      [ThirdPartyAdministratorFormValues.VENDOR_SELECT]: [],
      [ThirdPartyAdministratorFormValues.NETWORK_CATEGORY_TREE]: [],
    },
  });
  const { programBuildStore } = useStore();
  const params = useParams();
  const history = useHistory();
  const orgId: string = get(params, "orgId", "");
  const prospectId: string = get(params, "prospectId", "");
  const recipeId: string = get(params, "recipeId", "");
  const { loadingProgress } = programBuildStore;
  const { getValues, register, reset } = methods;

  useEffect(() => {
    register(ThirdPartyAdministratorFormValues.VENDOR_SELECT);
  }, [register]);

  useEffect(() => {
    register(ThirdPartyAdministratorFormValues.NETWORK_CATEGORY_TREE);
  }, [register]);

  useEffect(() => {
    if (prospectId) {
      syncOrgRecipes(prospectId);
    }
  }, [prospectId]);

  useEffect(() => {
    syncThirdPartyAdministrators(programBuildStore, orgId);
  }, [orgId]);

  return (
    <PageLayout title="Select TPAs | Novo Connection">
      <PageContainer>
        <LoadingBar
          color={ThemeColor.AZURE_RADIANCE}
          progress={loadingProgress}
          onLoaderFinished={() => programBuildStore.setLoadingProgress(0)}
        />
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
        <ProfileTitleBar
          onClickPrevious={() =>
            history.push(
              routes.dashboard.god.brokerages.prospects.onboarding.programBuild.recipe.costContainmentVendors.value(
                orgId,
                prospectId,
                recipeId
              )
            )
          }
          onClickNext={() =>
            history.push(
              routes.dashboard.god.brokerages.prospects.onboarding.programBuild.recipe.plansets.getValue(
                orgId,
                prospectId,
                recipeId,
                programBuildStore?.orgRecipe?.plan_sets[0]?.id
              )
            )
          }
        />
        <ContentContainer>
          <BuildNetworkForm onCreate={() => setIsOpen(true)} />
        </ContentContainer>
      </PageContainer>
    </PageLayout>
  );
};

export default observer(ProgramBuildThirdPartyAdministratorsPage);
