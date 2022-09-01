import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { get } from "lodash";
import { observer } from "mobx-react";
import { FormProvider, useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import { toast } from "react-toastify";
import FileUploader from "src/components/FileUploader";
import Icon from "src/components/Icon";
import PageLayout from "src/components/PageLayout";
import { BaseFilePath } from "src/constants";
import useProspectDetail from "src/hooks/ProspectDetail";
import routes from "src/routes";
import {
  createOrUpdateOrgSimpleCensusFormat,
  uploadCensusFile,
} from "src/utils/humanCensus";
import useStore from "src/utils/useStore";
import CensusTemplateTitleBar from "../components/CensusTemplateTitleBar";
import ProfileHeader from "../components/ProfileHeader";
import BasicSection from "../components/uploadTemplateForm/BasicSection";
import TemplateSection from "../components/uploadTemplateForm/TemplateSection";
import {
  UploadTemplateForm,
  PageContainer,
  StyledRow,
  StyledCol,
  LinkWithIcon,
  LightText,
} from "./onboardingCensusTemplatePage.style";
import {
  ICensusTemplateFormValue,
  preprocessData,
  sanitizeData,
  validationSchema,
} from "./utils";

const OnboardingCensusTemplatePage = () => {
  const [uploadedFormat, setUploadedFormat] = useState();
  const [isModalUploadOpen, setIsModalUploadOpen] = useState<boolean>(false);

  const methods = useForm<ICensusTemplateFormValue>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      hasMultipleSheets: false,
    },
  });
  const { reset, register, setValue, handleSubmit } = methods;
  register("id");

  const history = useHistory();
  const params = useParams();
  const idInUrl: string = get(params, "templateId");
  const orgId: string = get(params, "orgId", "");
  const { censusDetailsStore } = useStore();
  const prospectDetail = useProspectDetail();

  async function submitTemplate(data) {
    data = preprocessData(data);
    const isDataValid = sanitizeData(data);
    if (isDataValid) {
      const format = await createOrUpdateOrgSimpleCensusFormat(data, orgId);
      const formatId = get(format, "id") || idInUrl;
      setValue("id", formatId);
      setUploadedFormat(format);
      setIsModalUploadOpen(true);
    }
  }

  async function onUploadFile(uploadedFile, fileObject) {
    try {
      await uploadCensusFile(
        prospectDetail,
        uploadedFile,
        fileObject,
        uploadedFormat
      );
      history.push(
        routes.dashboard.brokerage.prospects.onBoarding.census.details.getValue(
          orgId
        )
      );
    } catch (e) {
      toast.error("There was a problem uploading the census.");
    }
  }

  async function handleCurrentTemplate(formatId: string) {
    const templates = await censusDetailsStore.getAllTemplates(orgId);

    if (formatId) {
      const currentFormat = templates.find(
        (template) => template.id === formatId
      );
      reset(currentFormat);
    }
  }

  useEffect(() => {
    if (orgId) {
      handleCurrentTemplate(idInUrl);
    }
  }, [orgId]);

  return (
    <PageLayout title="Custom Census Template | Novo Connection">
      <PageContainer>
        <ProfileHeader />
        <CensusTemplateTitleBar />
        <FormProvider {...methods}>
          <UploadTemplateForm onSubmit={handleSubmit(submitTemplate)}>
            <BasicSection />
            <TemplateSection />
            <StyledRow isLastRow>
              <StyledCol lg={3} md={3}>
                <LinkWithIcon type="submit">
                  <Icon iconName="emptyBlueCircleArrow.png" size={18} />
                  Save & Upload Spreadsheet
                </LinkWithIcon>
              </StyledCol>
              <StyledCol>
                <LightText>
                  File types include: CSV, XLS. File limit is 100MB
                </LightText>
              </StyledCol>
            </StyledRow>
          </UploadTemplateForm>
        </FormProvider>

        <FileUploader
          isOpen={isModalUploadOpen}
          onRequestClose={() => setIsModalUploadOpen(false)}
          filePath={BaseFilePath.PRIVATE}
          onUploadSuccess={onUploadFile}
        />
      </PageContainer>
    </PageLayout>
  );
};
export default observer(OnboardingCensusTemplatePage);
