import { useState } from "react";
import get from "lodash/get";
import { observer } from "mobx-react";
import { useFormContext } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import { toast } from "react-toastify";
import { Dropdown, DropdownMenu, DropdownItem } from "reactstrap";
import ColNoSpacing from "src/components/ColNoSpacing";
import ConfirmModal from "src/components/ConfirmModal";
import routes from "src/routes";
import useStore from "src/utils/useStore";
import { useUsers } from "../../hooks";
import {
  LeftSide,
  RightSide,
  IconButton,
  CommonButton,
  MediumSpacing,
  Container,
  CommonDropdown,
  CommonModalTitle,
  CommonModalSubTitle,
} from "./header.styles";
import {
  clearWorkersDocumentSignature,
  downloadSignedDocuments,
  extractSignedWorkerIds,
  extractWorkerIds,
  getCensusReport,
  getHealthReport,
  getStatusReport,
  handleDeleteWorkers,
  handleInviteWorkers,
} from "./utils";

const Header = () => {
  const history = useHistory();
  const { getValues } = useFormContext();
  const [downloadDropdown, setDownloadDropdown] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [confirmInvite, setConfirmInvite] = useState<boolean>(false);
  const [confirmSignature, setConfirmSignature] = useState<boolean>(false);
  const [confirmKeepSignature, setConfirmKeepSignature] = useState<boolean>(
    false
  );
  const { benefitStore, workerStore, brokerProspectsListStore } = useStore();
  const [awaitUsers, submitUsers, submittedUsers] = useUsers();
  const params = useParams();
  const prospectId: string = get(params, "prospectId", "");
  const signedUsers = [...submitUsers, ...submittedUsers];
  const allUsers = [...awaitUsers, ...submitUsers, ...submittedUsers];

  function refetchWorkers(): void {
    benefitStore.fetchAssignedDocuments(prospectId);
    workerStore.getProspectWorkers(prospectId);
  }

  return (
    <ColNoSpacing>
      <Container>
        <LeftSide xl="6" lg="6" md="6" sm="12" xs="12">
          <IconButton
            iconName="red-trash.png"
            onClick={() => {
              const workerIds: string[] = extractWorkerIds(getValues);
              if (!workerIds?.length) {
                toast.error("There are no selected employees");
                return;
              }
              setConfirmDelete(true);
            }}
          />
          <IconButton
            iconName="grey-email.png"
            onClick={() => {
              const workerIds: string[] = extractWorkerIds(getValues);
              if (!workerIds?.length) {
                toast.error("There are no selected employees");
                return;
              }
              setConfirmInvite(true);
            }}
          />
          <IconButton
            iconName="grey-feather.png"
            onClick={() => {
              const signedWorkerIds: string[] = extractSignedWorkerIds(
                getValues,
                signedUsers
              );
              if (!signedWorkerIds?.length) {
                toast.error("There are no selected employees with signed PHQs");
                return;
              }
              setConfirmSignature(true);
            }}
          />
          <IconButton
            iconName="grey-download-tray.png"
            onClick={() => {
              if (!allUsers?.length) {
                toast.error("There are no selected employees with signed PHQs");
                return;
              }
              downloadSignedDocuments(
                benefitStore,
                brokerProspectsListStore,
                allUsers
              );
            }}
          />
        </LeftSide>
        <RightSide xl="6" lg="6" md="6" sm="12" xs="12">
          <Dropdown
            isOpen={downloadDropdown}
            toggle={() => setDownloadDropdown((prevState) => !prevState)}
          >
            <CommonDropdown>Download Reports</CommonDropdown>
            <DropdownMenu>
              <DropdownItem onClick={() => getCensusReport(prospectId)}>
                Census Report
              </DropdownItem>
              <DropdownItem
                onClick={() =>
                  getStatusReport(allUsers, brokerProspectsListStore)
                }
              >
                Status Report
              </DropdownItem>
              <DropdownItem onClick={() => getHealthReport(prospectId)}>
                Health Report
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <MediumSpacing>
            <CommonButton
              label="Continue"
              onClick={() => {
                history.push(
                  routes.dashboard.brokerage.prospects.onBoarding.existingPlans.choice.getValue(
                    prospectId
                  )
                );
              }}
            />
          </MediumSpacing>
        </RightSide>
      </Container>
      <ConfirmModal
        isOpen={confirmDelete}
        title={
          <CommonModalTitle>
            ARE YOU SURE YOU WANT TO DELETE THESE EMPLOYEES?
          </CommonModalTitle>
        }
        acceptText="Yes"
        rejectText="No"
        rejectCallback={() => setConfirmDelete(false)}
        acceptCallback={async () => {
          setConfirmDelete(false);
          await handleDeleteWorkers(getValues);
          refetchWorkers();
        }}
      />
      <ConfirmModal
        isOpen={confirmInvite}
        title={
          <CommonModalTitle>
            ARE YOU SURE YOU WANT TO INVITE ALL SELECTED EMPLOYEES?
          </CommonModalTitle>
        }
        acceptText="Yes"
        rejectText="No"
        rejectCallback={() => setConfirmInvite(false)}
        acceptCallback={async () => {
          await handleInviteWorkers(getValues);
          setConfirmInvite(false);
        }}
      />
      <ConfirmModal
        isOpen={confirmSignature}
        title={
          <CommonModalTitle>
            ARE YOU SURE YOU WANT TO ASK FOR NEW SIGNATURES FROM SELECTED
            EMPLOYEES?
          </CommonModalTitle>
        }
        acceptText="Yes"
        rejectText="No"
        rejectCallback={() => setConfirmSignature(false)}
        acceptCallback={() => {
          setConfirmKeepSignature(true);
          setConfirmSignature(false);
        }}
      />
      <ConfirmModal
        isOpen={confirmKeepSignature}
        title={
          <div>
            <div>DO YOU WANT TO KEEP SIGNATURES INTACT?</div>
            <CommonModalSubTitle>
              THE DOCUMENT(S) WILL STILL BE UPDATED, BUT ASSIGNEES WILL NOT BE
              REQUIRED TO RE-SIGN.
            </CommonModalSubTitle>
          </div>
        }
        acceptText="Yes"
        rejectText="No"
        rejectCallback={async () => {
          const signedWorkerIds: string[] = extractSignedWorkerIds(
            getValues,
            signedUsers
          );
          setConfirmKeepSignature(false);
          await clearWorkersDocumentSignature(signedWorkerIds, false);
          refetchWorkers();
          toast.success("Signatures requested!");
        }}
        acceptCallback={async () => {
          const signedWorkerIds: string[] = extractSignedWorkerIds(
            getValues,
            signedUsers
          );
          setConfirmKeepSignature(false);
          await clearWorkersDocumentSignature(signedWorkerIds, true);
          refetchWorkers();
          toast.success("Signatures requested!");
        }}
      />
    </ColNoSpacing>
  );
};

export default observer(Header);
