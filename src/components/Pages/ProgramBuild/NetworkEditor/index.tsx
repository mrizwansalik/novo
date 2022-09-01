import { Modal } from "reactstrap";
import Footer from "./components/Footer";
import Header from "./components/Header";
import NetworkForm from "./components/NetworkForm";
import { Container } from "./networkEditor.styles";

interface INetworkEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

const NetworkEditor = (props: INetworkEditorProps) => {
  const { isOpen, onClose, onSave } = props;

  return (
    <Modal size="md" isOpen={isOpen}>
      <Container>
        <Header onClose={onClose} />
        <NetworkForm />
        <Footer onSave={onSave} onClose={onClose} />
      </Container>
    </Modal>
  );
};

export default NetworkEditor;
