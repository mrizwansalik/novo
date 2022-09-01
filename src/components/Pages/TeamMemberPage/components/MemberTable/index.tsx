import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Container } from "reactstrap";
import { deleteWorker, getOrgWorkers } from "../../../../../api/worker";
import { IWorker } from "../../../../../interfaces/worker";
import ConfirmModal from "../../../../ConfirmModal";
import { sendInvites } from "../../utils";
import {
  UserInformation,
  CloseIcon,
  InviteIcon,
  RowLayout,
  IconSection,
  InviteButton,
  InviteLabel,
} from "./styles";

const MemberTable = () => {
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [selectedWorker, setSelectedWorker] = useState<IWorker>({});
  const [workers, setWorkers] = useState<IWorker[]>([]);

  /**
   * Get workers by url's param as orgId
   */
  const { orgId, carrierId } = useParams<{
    orgId: string;
    carrierId: string;
  }>();

  async function getWorkersByOrgId() {
    const workers: IWorker[] = await getOrgWorkers(orgId || carrierId);
    if (workers.length > 0) {
      setWorkers(workers);
    }
  }

  useEffect(() => {
    getWorkersByOrgId();
  }, []);

  async function handleInviteWorker(workerId: string): Promise<void> {
    await sendInvites([workerId]);
  }

  async function handleDeleteWorker(workerId: string): Promise<void> {
    await deleteWorker(workerId);
    await getWorkersByOrgId();
    toast.success("Completed to delete worker");
  }

  return (
    <Container>
      {Array.isArray(workers) &&
        workers.map((worker: IWorker, index: number) => (
          <RowLayout key={index}>
            <UserInformation xs="6">{`${worker.name} (${worker.email})`}</UserInformation>
            <IconSection xs="6">
              {!worker?.joined && (
                <InviteButton onClick={() => handleInviteWorker(worker.id)}>
                  <InviteIcon iconName="email64px-blue.png" />
                  <InviteLabel>Invite</InviteLabel>
                </InviteButton>
              )}
              <CloseIcon
                onClick={() => {
                  setSelectedWorker(worker);
                  setDeleteModal(true);
                }}
                iconName="xCircle64px-red.png"
              />
            </IconSection>
          </RowLayout>
        ))}
      <ConfirmModal
        title={`ARE YOU SURE YOU WANT TO REMOVE ${selectedWorker.name}?`}
        acceptText="Yes"
        rejectText="No"
        acceptCallback={() => {
          handleDeleteWorker(selectedWorker.id);
          setDeleteModal(false);
        }}
        rejectCallback={() => {
          setDeleteModal(false);
        }}
        isOpen={deleteModal}
      />
    </Container>
  );
};

export default observer(MemberTable);
