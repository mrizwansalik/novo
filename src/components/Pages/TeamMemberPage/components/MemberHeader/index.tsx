import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { Col } from "reactstrap";
import { getOrgDetail } from "src/api/org";
import { IParamTypes } from "src/types";
import { IWorker } from "../../../../../interfaces/worker";
import useStore from "../../../../../utils/useStore";
import ConfirmModal from "../../../../ConfirmModal";
import { sendInvites } from "../../utils";

import {
  Container,
  HeaderLabel,
  InviteButton,
  InviteIcon,
  InviteLabel,
  InviteContainer,
  InviteLayout,
  HeaderLayout,
} from "./styles";

interface IProps {
  header?: string;
}

const MemberHeader = (props: IProps) => {
  const { header } = props;
  const [inviteModal, setInviteModal] = useState<boolean>(false);
  const { orgStore, workerStore } = useStore();

  const [data, setData] = useState<any>({});
  // const { orgDetail } = orgStore;

  const { workers } = workerStore;

  const { orgId } = useParams<IParamTypes>();
  async function handleInviteAll(): Promise<void> {
    const workerIds = Array.isArray(workers)
      ? workers.map((worker: IWorker) => worker.id)
      : [];
    toast.info("Sending invite...", {
      position: "top-right",
      autoClose: 5000,
    });
    await sendInvites(workerIds);
    toast.success("Completed send invite!", {
      position: "top-right",
    });
  }

  useEffect(() => {
    async function fetchOrg() {
      const res = await getOrgDetail(orgId);
      if (res) {
        setData(res);
      }
    }
    fetchOrg();
  });

  return (
    <Container>
      <HeaderLayout>
        <Col md={12}>
          <HeaderLabel>{`Team members for ${
            header ? header : data?.name
          }`}</HeaderLabel>
        </Col>
      </HeaderLayout>
      <InviteContainer>
        <InviteLayout md={12}>
          <InviteButton onClick={() => setInviteModal(true)}>
            <InviteIcon iconName="email64px-blue.png" />
            <InviteLabel>Invite All</InviteLabel>
          </InviteButton>
        </InviteLayout>
      </InviteContainer>
      <ConfirmModal
        title="DO YOU REALLY WANT TO INVITE EVERYONE TO ALLAY?"
        acceptText="Yes, invite"
        rejectText="No"
        acceptCallback={() => {
          handleInviteAll();
          setInviteModal(false);
        }}
        rejectCallback={() => {
          setInviteModal(false);
        }}
        isOpen={inviteModal}
      />
    </Container>
  );
};

export default observer(MemberHeader);
