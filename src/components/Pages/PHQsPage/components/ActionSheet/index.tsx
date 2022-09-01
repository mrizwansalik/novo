import React, { useState } from "react";
import _ from "lodash";
import { observer } from "mobx-react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { IParamTypes } from "src/types";
import useStore from "src/utils/useStore";
import { Status, StatusMessage } from "./enums";
import { IDownloadStatus } from "./interfaces";
import {
  StyledIcon,
  ActionButtonsContainer,
  Container,
  StyledDownloadButton,
  StyledDropdownItem,
  StyledDropdownMenu,
  StyledButtonDropdown,
  DownloadStatusMessage,
  ModalTitle,
  StyledConfirmModal,
  ModalSubTitle,
} from "./styles";
import {
  downloadCensusReport,
  downloadHealthReport,
  generateStatusReport,
  inviteWorkers,
  getWorkerSignedDocuments,
  deleteWorkers,
  clearWorkersDocumentSignature,
} from "./utils";
const ActionSheet = () => {
  const { prospectId } = useParams<IParamTypes>();
  const { healthHistoryStore, brokerProspectsListStore } = useStore();
  const [downloadStatus, setDownloadStatus] = useState<IDownloadStatus>({
    status: "",
    text: "",
  });
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [confirmKeepSignature, setConfirmKeepSignature] = useState(false);
  const [confirmSignature, setConfirmSignature] = useState(false);
  const {
    documentList,
    awaitingWorkers,
    unsubmittedWorkers,
    submittedWorkers,
    selectedWorkers,
    workersHasSignedDocuments,
    selectedWorkerIdList,
  } = healthHistoryStore;
  const { currentProspect } = brokerProspectsListStore;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(!dropdownOpen);
  async function handleDownloadCensus() {
    setDownloadStatus({
      status: Status.PROCESSING,
      text: StatusMessage.GENERATING_CENSUS_REPORT,
    });
    await downloadCensusReport(prospectId, currentProspect.name);
    setDownloadStatus({
      status: Status.FINISHED,
      text: StatusMessage.GENERATED_CENSUS_REPORT,
    });
  }
  async function handleDownloadStatus() {
    generateStatusReport(
      _.union(awaitingWorkers, unsubmittedWorkers, submittedWorkers),
      documentList,
      currentProspect.name
    );
    toast.success(StatusMessage.GENERATED_STATUS_REPORT);
  }
  async function handleDownloadHealth() {
    setDownloadStatus({
      status: Status.PROCESSING,
      text: StatusMessage.GENERATING_HEALTH_REPORT,
    });
    await downloadHealthReport(prospectId, currentProspect.name);
    setDownloadStatus({
      status: Status.FINISHED,
      text: StatusMessage.GENERATED_HEALTH_REPORT,
    });
  }
  async function handleDeleteWorkers() {
    if (
      selectedWorkerIdList.length > 0 &&
      selectedWorkerIdList.some((id) => selectedWorkers[id] === true)
    ) {
      setIsDeleteModalOpen(true);
    } else {
      toast.error(StatusMessage.THERE_ARE_NO_SELECTED_EMPLOYEES);
    }
  }
  async function handleSendInvites() {
    if (
      selectedWorkerIdList.length > 0 &&
      selectedWorkerIdList.some((id) => selectedWorkers[id] === true)
    ) {
      setIsInviteModalOpen(true);
    } else {
      toast.error(StatusMessage.THERE_ARE_NO_SELECTED_EMPLOYEES);
    }
  }
  async function handleDownloadSignedDocuments() {
    setDownloadStatus({
      status: Status.PROCESSING,
      text: StatusMessage.DOWNLOADING_SIGNED_PHQS,
    });
    await getWorkerSignedDocuments(
      workersHasSignedDocuments,
      currentProspect.name
    );
    setDownloadStatus({
      status: Status.FINISHED,
      text: StatusMessage.DOWNLOADED_SIGNED_PHQS,
    });
  }
  return (
    <Container>
      <ActionButtonsContainer>
        <StyledIcon
          iconName="red-trash.png"
          size={24}
          onClick={handleDeleteWorkers}
          title="Delete selected employees"
        />
        <StyledIcon
          iconName="grey-email.png"
          size={2}
          width={24}
          height={20}
          onClick={handleSendInvites}
          title="Email invite links to selected employees"
        />
        <StyledIcon
          iconName="grey-feather.png"
          size={24}
          title="Request signature from selected employees"
          onClick={() => setConfirmSignature(true)}
        />
        <StyledIcon
          iconName="grey-download-tray.png"
          size={24}
          onClick={handleDownloadSignedDocuments}
          title="Download signed documents from all employees"
        />
      </ActionButtonsContainer>
      <StyledButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
        <StyledDownloadButton>Download Reports</StyledDownloadButton>
        <StyledDropdownMenu>
          <StyledDropdownItem onClick={handleDownloadCensus}>
            Census Report
          </StyledDropdownItem>
          <StyledDropdownItem onClick={handleDownloadStatus}>
            Status Report
          </StyledDropdownItem>
          <StyledDropdownItem onClick={handleDownloadHealth}>
            Health Report
          </StyledDropdownItem>
        </StyledDropdownMenu>
      </StyledButtonDropdown>
      {downloadStatus.status && (
        <DownloadStatusMessage status={downloadStatus.status}>
          {downloadStatus.text}
        </DownloadStatusMessage>
      )}
      <StyledConfirmModal
        isOpen={isInviteModalOpen}
        title={
          <ModalTitle>
            ARE YOU SURE YOU WANT TO INVITE ALL SELECTED EMPLOYEES?
          </ModalTitle>
        }
        acceptText="Yes"
        rejectText="No"
        rejectCallback={() => setIsInviteModalOpen(false)}
        acceptCallback={async () => {
          await inviteWorkers(selectedWorkers);
          setIsInviteModalOpen(false);
          toast.success(StatusMessage.INVITE_SENT);
        }}
      />
      <StyledConfirmModal
        isOpen={isDeleteModalOpen}
        title={
          <ModalTitle>
            ARE YOU SURE YOU WANT TO DELETE ALL SELECTED EMPLOYEES?
          </ModalTitle>
        }
        acceptText="Yes"
        rejectText="No"
        rejectCallback={() => setIsDeleteModalOpen(false)}
        acceptCallback={async () => {
          setIsDeleteModalOpen(false);
          await deleteWorkers(selectedWorkers);
          await healthHistoryStore.fetchWorkerData(prospectId);
          toast.success(StatusMessage.DELETED);
        }}
      />
      <StyledConfirmModal
        isOpen={confirmSignature}
        title={
          <ModalTitle>
            ARE YOU SURE YOU WANT TO ASK FOR NEW SIGNATURES FROM SELECTED
            EMPLOYEES?
          </ModalTitle>
        }
        acceptText="Yes"
        rejectText="No"
        rejectCallback={() => setConfirmSignature(false)}
        acceptCallback={() => {
          setConfirmKeepSignature(true);
          setConfirmSignature(false);
        }}
      />
      <StyledConfirmModal
        isOpen={confirmKeepSignature}
        title={
          <div>
            <div>DO YOU WANT TO KEEP SIGNATURES INTACT?</div>
            <ModalSubTitle>
              THE DOCUMENT(S) WILL STILL BE UPDATED, BUT ASSIGNEES WILL NOT BE
              REQUIRED TO RE-SIGN.
            </ModalSubTitle>
          </div>
        }
        acceptText="Yes"
        rejectText="No"
        rejectCallback={async () => {
          setConfirmKeepSignature(false);
          await clearWorkersDocumentSignature(workersHasSignedDocuments, false);
          await healthHistoryStore.fetchWorkerData(prospectId);
          toast.success("Signatures requested!");
        }}
        acceptCallback={async () => {
          setConfirmKeepSignature(false);
          await clearWorkersDocumentSignature(workersHasSignedDocuments, true);
          await healthHistoryStore.fetchWorkerData(prospectId);
          toast.success("Signatures requested!");
        }}
      />
    </Container>
  );
};
export default observer(ActionSheet);
