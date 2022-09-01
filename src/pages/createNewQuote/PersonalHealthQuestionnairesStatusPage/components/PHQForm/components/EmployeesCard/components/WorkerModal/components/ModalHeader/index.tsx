import { Fragment, useState } from "react";
import get from "lodash/get";
import { observer } from "mobx-react";
import { useParams } from "react-router";
import ConfirmModal from "src/components/ConfirmModal";
import { IAssignedDocumentsTree } from "src/pages/createNewQuote/PersonalHealthQuestionnairesStatusPage/utils";
import { formatPhoneNumber } from "src/utils/region";
import useStore from "src/utils/useStore";
import {
  TitleSection,
  ButtonSection,
  OutlineButton,
  HeaderMenu,
  WorkerInformation,
  WorkerName,
  WorkerEmail,
  WorkerPhone,
  CommonModalTitle,
} from "./modalHeader.styles";
import { handleDeleteWorker } from "./utils";

interface IModalHeaderProps {
  assignedDocument: IAssignedDocumentsTree;
  setOpenModal: (openModal: boolean) => void;
}

const ModalHeader = (props: IModalHeaderProps) => {
  const params = useParams();
  const prospectId: string = get(params, "prospectId", "");
  const { workerStore, benefitStore } = useStore();
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const { assignedDocument, setOpenModal } = props;

  return (
    <Fragment>
      <HeaderMenu>
        <TitleSection lg="8" md="8" sm="12">
          Employee Profile
        </TitleSection>
        <ButtonSection lg="4" md="4" sm="12">
          <OutlineButton
            label="Delete Employee"
            onClick={() => setConfirmDelete(true)}
          />
        </ButtonSection>
      </HeaderMenu>
      <WorkerInformation lg="12" md="12" sm="12">
        <WorkerName>{assignedDocument?.worker?.name}</WorkerName>
        {assignedDocument?.worker?.email && (
          <WorkerEmail href={assignedDocument?.worker?.email}>
            {assignedDocument?.worker?.email}
          </WorkerEmail>
        )}
        {assignedDocument?.worker?.phone && (
          <WorkerPhone>
            {formatPhoneNumber(assignedDocument?.worker?.phone)}
          </WorkerPhone>
        )}
      </WorkerInformation>{" "}
      <ConfirmModal
        isOpen={confirmDelete}
        title={
          <CommonModalTitle>
            {`ARE YOU SURE YOU WANT TO DELETE ${assignedDocument?.worker?.name}?`}
          </CommonModalTitle>
        }
        acceptText="Yes"
        rejectText="No"
        rejectCallback={() => setConfirmDelete(false)}
        acceptCallback={async () => {
          setConfirmDelete(false);
          setOpenModal(false);
          await handleDeleteWorker(
            workerStore,
            benefitStore,
            assignedDocument?.worker?.id,
            prospectId
          );
          benefitStore.fetchAssignedDocuments(prospectId);
          workerStore.getProspectWorkers(prospectId);
        }}
      />
    </Fragment>
  );
};

export default observer(ModalHeader);
