import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { get } from "lodash";
import { observer } from "mobx-react";
import { FormProvider, useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import { toast } from "react-toastify";
import FileUploader from "src/components/FileUploader";
import Icon from "src/components/Icon";
import { BaseFilePath } from "src/constants";
import routes from "src/routes";
import { IParamTypes } from "src/types";
import {
  createOrUpdateOrgSimpleCensusFormat,
  uploadCensusFile,
} from "src/utils/humanCensus";
import useStore from "src/utils/useStore";
import BasicSection from "./components/CensusTemplateForm/BasicSection";
import TemplateSection from "./components/CensusTemplateForm/TemplateSection";
import {
  UploadTemplateForm,
  StyledRow,
  StyledCol,
  LinkWithIcon,
  LightText,
  TitleContainer,
  TemplateTitle,
  CloseButton,
} from "./styles";
import {
  ICensusTemplateFormValue,
  preprocessData,
  sanitizeData,
  validationSchema,
} from "./utils";
const CensusCustomTemplatePage = () => {
  const [uploadedFormat, setUploadedFormat] = useState();
  const [isModalUploadOpen, setIsModalUploadOpen] = useState<boolean>(false);

  const history = useHistory();
  const { prospectId, templateId } = useParams<IParamTypes>();

  const { brokerProspectsListStore, censusDetailsStore } = useStore();
  const { currentTemplate } = censusDetailsStore;
  const { currentProspect } = brokerProspectsListStore;
  let hasMultipleSheets = false;
  if (currentTemplate) {
    if (currentTemplate.sheet_name) {
      hasMultipleSheets = true;
    }
  }

  const methods = useForm<ICensusTemplateFormValue>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      ...currentTemplate,
      hasMultipleSheets: hasMultipleSheets,
    },
  });
  const { register, setValue, handleSubmit } = methods;
  register("id");

  async function submitTemplate(data) {
    data = preprocessData(data);
    const isDataValid = sanitizeData(data);
    if (isDataValid) {
      const format = await createOrUpdateOrgSimpleCensusFormat(
        data,
        prospectId
      );
      const formatId = get(format, "id") || prospectId;
      setValue("id", formatId);
      setUploadedFormat(format);
      setIsModalUploadOpen(true);
    }
  }

  async function onUploadFile(uploadedFile, fileObject) {
    try {
      await uploadCensusFile(
        currentProspect,
        uploadedFile,
        fileObject,
        uploadedFormat
      );
      history.push(
        routes.dashboard.brokerage.prospects.prospectId.census.details.value(
          prospectId
        )
      );
    } catch (e) {
      toast.error("There was a problem uploading the census.");
    }
  }

  return (
    <div>
      <FormProvider {...methods}>
        <UploadTemplateForm onSubmit={handleSubmit(submitTemplate)}>
          <TitleContainer>
            <TemplateTitle>Build a custom census template</TemplateTitle>
            <CloseButton
              iconName="x128px-blue.png"
              size={24}
              onClick={() =>
                history.push(
                  routes.dashboard.brokerage.prospects.prospectId.census.details.value(
                    prospectId
                  )
                )
              }
            />
          </TitleContainer>
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
    </div>
  );
};

export default observer(CensusCustomTemplatePage);
