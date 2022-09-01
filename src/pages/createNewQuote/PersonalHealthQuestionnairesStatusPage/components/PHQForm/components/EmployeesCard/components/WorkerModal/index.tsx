import { useEffect, useRef } from "react";
import { observer } from "mobx-react";
import { useForm, FormProvider } from "react-hook-form";
import { initFormValues } from "src/pages/createNewQuote/PersonalHealthQuestionnairesStatusPage/utils";
import useStore from "src/utils/useStore";
import ModalHeader from "./components/ModalHeader";
import ModalTable from "./components/ModalTable";
import { Container, FormLayout, CloseButton } from "./workerModal.styles";

interface IWorkerModalProps {
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
}

const WorkerModal = (props: IWorkerModalProps) => {
  const { benefitStore } = useStore();
  const { selectedAssignedDocument } = benefitStore;
  const { openModal, setOpenModal } = props;
  const modalRef = useRef(null);

  const methods = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const { reset } = methods;

  function handleClickOutside(event): void {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setOpenModal(false);
    }
  }

  useEffect(() => {
    initFormValues(selectedAssignedDocument, reset);
  }, [selectedAssignedDocument]);

  return (
    <FormProvider {...methods}>
      <Container onClick={handleClickOutside} openModal={openModal}>
        <CloseButton
          openModal={openModal}
          onClick={() => setOpenModal(!openModal)}
          iconName="cross-blue.png"
        />
        <FormLayout ref={modalRef} openModal={openModal}>
          <ModalHeader
            setOpenModal={setOpenModal}
            assignedDocument={selectedAssignedDocument}
          />
          <ModalTable assignedDocument={selectedAssignedDocument} />
        </FormLayout>
      </Container>
    </FormProvider>
  );
};

export default observer(WorkerModal);
