import { get } from "lodash";
import { observer } from "mobx-react";
import { FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { Modal } from "reactstrap";
import { createOrgThirdPartyAdministrator } from "src/api/benefits";
import { ThirdPartyAdministratorFormValues } from "src/constants/enum/tpa";
import { emptyTpa } from "src/constants/tpa";
import { IParamTypes } from "src/types";
import { getEmptyExpense } from "src/utils/expense";
import useStore from "src/utils/useStore";
import { initializeFromRecipe } from "../../ProgramBuildTPA/utils";
import Footer from "./components/Footer";
import Header from "./components/Header";
import NetworkForm from "./components/NetworkForm";
import { Container } from "./networkEditor.styles";

interface INetworkEditorProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const NetworkEditor = (props: INetworkEditorProps) => {
  const { isOpen, setIsOpen } = props;
  const { programStore, censusDetailsStore, programBuildTpaStore } = useStore();
  const { censusHumans } = censusDetailsStore;
  const { orgRecipe } = programStore;

  const methods = useForm({
    defaultValues: {
      [ThirdPartyAdministratorFormValues.VENDOR_SELECT]: [],
      [ThirdPartyAdministratorFormValues.NETWORK_CATEGORY_TREE]: [],
    },
  });
  const { handleSubmit } = methods;
  const { brokerageId, prospectId } = useParams<IParamTypes>();

  async function addCustomTpa(data) {
    try {
      const default_fee = getEmptyExpense();
      const defaultFee = {
        ...default_fee,
        name: `${data.name} Fee`,
        amount_number: data.amountNumber ? Number(data.amountNumber) : null,
        amount_type: get(data, "subNetworkAmountType.value"),
        amount_children: get(data, "amountChildren", null),
        amount_employee: get(data, "amountEmployee", null),
        amount_family: get(data, "amountFamily", null),
        amount_spouse: get(data, "amountSpouse", null),
        amount_text: get(data, "amountCustom", ""),
        fee_type: "third_party_administrator",
      };
      const tpa = { ...emptyTpa, name: data.name, default_fees: [defaultFee] };
      await createOrgThirdPartyAdministrator(brokerageId, tpa);
      initializeFromRecipe(
        brokerageId,
        prospectId,
        censusHumans,
        orgRecipe,
        programBuildTpaStore
      );
      toast.success("TPA saved");
      setIsOpen(false);
    } catch (e) {
      toast.error("There was an error saving the TPA");
    }
  }

  return (
    <Modal size="md" isOpen={isOpen}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(addCustomTpa)}>
          <Container>
            <Header onClose={() => setIsOpen(false)} />
            <NetworkForm />
            <Footer onClose={() => setIsOpen(false)} />
          </Container>
        </form>
      </FormProvider>
    </Modal>
  );
};

export default observer(NetworkEditor);
