import { Modal } from "reactstrap";
import Icon from "src/components/Icon";
import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  AcceptButton,
  RejectButton,
  Container,
} from "./mainConfirmModal.styles";

interface IMainConfirmModalProps {
  isOpen?: boolean;
  toggle?: () => void;
  title?: string | React.ReactNode;
  acceptText?: string;
  rejectText?: string;
  acceptCallback?: () => void;
  rejectCallback?: () => void;
}

const MainConfirmModal = (props: IMainConfirmModalProps) => {
  const {
    isOpen,
    toggle,
    title,
    acceptText,
    rejectText,
    acceptCallback,
    rejectCallback,
  } = props;

  return (
    <Modal size="md" isOpen={isOpen} toggle={toggle}>
      <Container>
        <ModalHeader>
          <Icon onClick={rejectCallback} iconName="xCircleLightBlue.png" />
        </ModalHeader>
        <ModalBody>{title}</ModalBody>
        <ModalFooter>
          <AcceptButton onClick={acceptCallback}>{acceptText}</AcceptButton>
          <RejectButton onClick={rejectCallback}>{rejectText}</RejectButton>
        </ModalFooter>
      </Container>
    </Modal>
  );
};

export default MainConfirmModal;
