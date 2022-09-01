import React, { useEffect, useState } from "react";
import get from "lodash/get";
import { observer } from "mobx-react";
import { useForm, FormProvider } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import LoadingBar from "react-top-loading-bar";
import PageLayout from "src/components/PageLayout";
import SolutionPartnersEditor from "src/components/Pages/ProgramBuild/SolutionPartnersEditor";
import { handleSolutionPartnersForm } from "src/components/Pages/ProgramBuild/SolutionPartnersEditor/utils";
import { ThemeColor } from "src/constants";
import routes from "src/routes";
import { syncOrgRecipes } from "src/utils/programBuild";
import useStore from "src/utils/useStore";
import ProfileHeader from "../components/ProfileHeader";
import BuildSolutionPartnersForm from "./components/BuildSolutionPartnersForm";
import ProfileTitleBar from "./components/ProfileTitleBar";
import {
  ContentContainer,
  PageContainer,
} from "./programBuildSolutionPartnersPage.styles";

const ProgramBuildSolutionPartnersPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const methods = useForm();
  const { orgStore, programBuildStore } = useStore();
  const params = useParams();
  const history = useHistory();
  const prospectId: string = get(params, "prospectId", "");
  const recipeId: string = get(params, "recipeId", "");
  const orgId: string = orgStore?.orgDetail?.id;
  const { loadingProgress } = programBuildStore;
  const { getValues, reset } = methods;

  useEffect(() => {
    if (prospectId) {
      syncOrgRecipes(prospectId);
    }
  }, [prospectId]);

  return (
    <PageLayout title="Select Vendors | Novo Connection">
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
              routes.dashboard.god.brokerages.prospects.onboarding.programBuild.recipe.pharmacyBenefitManager.value(
                orgId,
                prospectId,
                recipeId
              )
            )
          }
          onClickNext={() =>
            history.push(
              routes.dashboard.god.brokerages.prospects.onboarding.programBuild.recipe.tpa.getValue(
                orgId,
                prospectId,
                recipeId
              )
            )
          }
        />
        <ContentContainer>
          <BuildSolutionPartnersForm onCreate={() => setIsOpen(true)} />
        </ContentContainer>
        <FormProvider {...methods}>
          <SolutionPartnersEditor
            onSave={() => {
              handleSolutionPartnersForm(
                getValues,
                reset,
                programBuildStore,
                prospectId,
                recipeId
              );
              setIsOpen(false);
            }}
            onClose={() => setIsOpen(false)}
            isOpen={isOpen}
          />
        </FormProvider>
      </PageContainer>
    </PageLayout>
  );
};

export default observer(ProgramBuildSolutionPartnersPage);
