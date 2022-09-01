import { Modal } from "reactstrap";
import Icon from "src/components/Icon";
import {
  Container,
  Header,
  Content,
  Footer,
  AcceptButton,
  CancelButton,
} from "./removeModal.styles";

interface IRemoveModalProps {
  isOpen: boolean;
  toggle: () => void;
  onCancel: () => void;
  onAccept: () => void;
}

const RemoveModal = (props: IRemoveModalProps) => {
  const { toggle, isOpen, onCancel, onAccept } = props;

  return (
    <Modal centered toggle={toggle} isOpen={isOpen}>
      <Container>
        <Header md={{ size: 12 }}>
          <Icon onClick={toggle} iconName="xCircleLightBlue.png" />
        </Header>
        <Content md={{ size: 12 }}>
          Are you sure you want to remove this claims year?
        </Content>
        <Footer md={{ size: 12 }}>
          <AcceptButton onClick={onAccept} label="Yes, remove it" />
          <CancelButton onClick={onCancel} label="Cancel" />
        </Footer>
      </Container>
    </Modal>
  );
};

export default RemoveModal;
