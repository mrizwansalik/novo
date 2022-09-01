import React, { useEffect, useState } from "react";
import { get } from "lodash";
import { observer } from "mobx-react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteOrgSimpleCensusFormat } from "src/api/org";
import FileUploader from "src/components/FileUploader";
import Icon from "src/components/Icon";
import Modal from "src/components/Modal";
import PageLayout from "src/components/PageLayout";
import { exportSimpleCensusTemplateCSV } from "src/components/Pages/CensusDetailPage/components/ManageTemplateModal/utils";
import { BaseFilePath } from "src/constants";
import useProspectDetail from "src/hooks/ProspectDetail";
import routes from "src/routes";
import { uploadCensusFile } from "src/utils/humanCensus";
import useStore from "src/utils/useStore";
import CensusTitleBar from "../components/CensusChoiceTitleBar";
import ProfileHeader from "../components/ProfileHeader";
import {
  ButtonWithIcon,
  CensusTemplates,
  ContentContainer,
  ModalBody,
  PageContainer,
  PrimaryButton,
  RowSeparator,
  SecondaryButton,
  TemplateCard,
  TemplateOption,
} from "./onboardingCensusPage.style";

const OnboardingCensusPage = () => {
  const [isModalUploadOpen, setIsModalUploadOpen] = useState<boolean>(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState("");
  const [isDeleteTemplateModalOpen, setIsDeleteTemplateModalOpen] = useState(
    false
  );

  const history = useHistory();

  const { censusDetailsStore } = useStore();
  const prospectDetail = useProspectDetail();
  const orgId: string = get(prospectDetail, "id", "");

  const { censusTemplates } = censusDetailsStore;

  async function onUploadFile(uploadedFile, fileObject) {
    try {
      await uploadCensusFile(prospectDetail, uploadedFile, fileObject);
      history.push(
        routes.dashboard.brokerage.prospects.onBoarding.census.details.getValue(
          orgId
        )
      );
    } catch (e) {
      toast.error("There was a problem uploading census");
    }
  }

  function selectTemplateToDelete(id: string) {
    setSelectedTemplateId(id);
    setIsDeleteTemplateModalOpen(true);
  }

  async function handleDeleteTemplate(templateId: string) {
    try {
      await deleteOrgSimpleCensusFormat(orgId, templateId);
      const newTemplates = censusTemplates.filter(
        (template) => template.id !== templateId
      );
      censusDetailsStore.setTemplates(newTemplates);
      toast.success("Custom template deleted.");
      setIsDeleteTemplateModalOpen(false);
    } catch (e) {
      toast.error("There was a problem deleting the custom template.");
    }
  }

  useEffect(() => {
    if (orgId) {
      censusDetailsStore.getAllTemplates(orgId);
    }
  }, [orgId]);
  return (
    <PageLayout title="Client Profile | Novo Connection">
      <PageContainer>
        <ProfileHeader
          skipCallback={() =>
            history.push(
              routes.dashboard.brokerage.brokerageId.prospects.prospectId.dashboard.getValue(
                localStorage.getItem("orgId"),
                orgId
              )
            )
          }
        />
        <CensusTitleBar />
        <ContentContainer>
          <TemplateOption>
            <h1>Custom Census Template</h1>
            <h2>We require additional information</h2>
            <ButtonWithIcon
              onClick={() =>
                history.push(
                  routes.dashboard.brokerage.prospects.onBoarding.census.template.getValue(
                    orgId
                  )
                )
              }
            >
              Add New Template &nbsp;
              <Icon iconName="emptyWhiteCirclePlus.png" size={18} />
            </ButtonWithIcon>
          </TemplateOption>
          <RowSeparator />
          <TemplateOption>
            <h1>Use our template</h1>
            {/* <CSVLink
              headers={headers}
              data={[]}
              filename={"NovoCensusTemplate.csv"}
            > */}
            <a
              onClick={() => {
                exportSimpleCensusTemplateCSV("NovoCensusTemplate");
              }}
            >
              Download template
            </a>
            {/* </CSVLink> */}
            <ButtonWithIcon onClick={() => setIsModalUploadOpen(true)}>
              Upload Novo Template &nbsp;
              <Icon iconName="emptyWhiteCircleArrow.png" size={18} />
            </ButtonWithIcon>
          </TemplateOption>
        </ContentContainer>

        <CensusTemplates>
          <h2>Use an existing template</h2>
          {Array.isArray(censusTemplates) &&
            censusTemplates.map((template) => {
              const { id, name } = template;
              return (
                <TemplateCard key={id}>
                  <Link
                    to={routes.dashboard.brokerage.prospects.onBoarding.census.template.getValue(
                      orgId,
                      id
                    )}
                  >
                    {name}
                  </Link>
                  <Icon
                    iconName="black_pencil.png"
                    size={24}
                    onClick={() =>
                      history.push(
                        routes.dashboard.brokerage.prospects.onBoarding.census.template.getValue(
                          orgId,
                          id
                        )
                      )
                    }
                  />
                  <Icon
                    iconName="red-trash.png"
                    size={24}
                    onClick={() => selectTemplateToDelete(id)}
                  />
                </TemplateCard>
              );
            })}
        </CensusTemplates>

        <FileUploader
          isOpen={isModalUploadOpen}
          onRequestClose={() => setIsModalUploadOpen(false)}
          filePath={BaseFilePath.PRIVATE}
          onUploadSuccess={onUploadFile}
        />

        <Modal
          isOpen={isDeleteTemplateModalOpen}
          toggle={() => setIsDeleteTemplateModalOpen(false)}
          body={
            <ModalBody>
              <h5>Are you sure you want to remove the selected people?</h5>
              <div>
                <PrimaryButton
                  label="Yes, delete it"
                  onClick={() => handleDeleteTemplate(selectedTemplateId)}
                />
                <SecondaryButton
                  label="No"
                  onClick={() => setIsDeleteTemplateModalOpen(false)}
                />
              </div>
            </ModalBody>
          }
        />
      </PageContainer>
    </PageLayout>
  );
};

export default observer(OnboardingCensusPage);
