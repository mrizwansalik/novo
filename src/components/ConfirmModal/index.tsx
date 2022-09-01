import { Modal as ReactStrapModal } from "reactstrap";
import { Title, Footer, AcceptButton, RejectButton, Container } from "./styles";

interface IConfirmModalProps {
  isOpen?: boolean;
  toggle?: () => void;
  title?: string | React.ReactNode;
  acceptText?: string;
  rejectText?: string;
  acceptCallback?: () => void;
  rejectCallback?: () => void;
  size?: "md" | "lg";
}

const ConfirmModal = (props: IConfirmModalProps) => {
  const {
    isOpen,
    toggle,
    title,
    acceptText,
    rejectText,
    acceptCallback,
    rejectCallback,
    size = "md",
  } = props;

  return (
    <ReactStrapModal
      scrollable={true}
      size={size}
      isOpen={isOpen}
      toggle={toggle}
    >
      <Container>
        <Title>{title}</Title>
        <Footer>
          <AcceptButton onClick={acceptCallback}>{acceptText}</AcceptButton>
          <RejectButton onClick={rejectCallback}>{rejectText}</RejectButton>
        </Footer>
      </Container>
    </ReactStrapModal>
  );
};

export default ConfirmModal;
