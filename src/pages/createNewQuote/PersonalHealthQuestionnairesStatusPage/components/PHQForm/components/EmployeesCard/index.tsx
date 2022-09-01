import { useState } from "react";
import { observer } from "mobx-react";
import { useForm, FormProvider } from "react-hook-form";
import { IAssignedDocumentsTree } from "src/pages/createNewQuote/PersonalHealthQuestionnairesStatusPage/utils";
import useStore from "src/utils/useStore";
import Header from "./components/Header";
import StatusSection from "./components/StatusSection";
import WorkerModal from "./components/WorkerModal";
import { Container } from "./employeesCard.styles";

const EmployeesCard = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { benefitStore } = useStore();
  const methods = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  return (
    <Container>
      <FormProvider {...methods}>
        <Header />
        <StatusSection
          onClickArrow={(assignedDocument: IAssignedDocumentsTree) => {
            benefitStore.setSelectedAssignedDocument(assignedDocument);
            setOpenModal(!openModal);
          }}
        />
      </FormProvider>
      <WorkerModal openModal={openModal} setOpenModal={setOpenModal} />
    </Container>
  );
};

export default observer(EmployeesCard);
