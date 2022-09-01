import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import get from "lodash/get";
import { observer } from "mobx-react";
import moment from "moment";
import { useForm, FormProvider } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import { Form } from "reactstrap";
import { SpecialTime } from "src/constants";
import useStore from "src/utils/useStore";
import BasicsDeductibles from "./components/BasicsDeductibles";
import ClaimAmount from "./components/ClaimAmount";
import ClaimInformation from "./components/ClaimInformation";
import ExtraClaim from "./components/ExtraClaim";
import MonthlyClaim from "./components/MonthlyClaim";
import RemoveModal from "./components/RemoveModal";
import TagSection from "./components/TagSection";
import { Container, Section } from "./planDesignsForm.styles";
import { createClaimsData, handleRemoveClaimsData } from "./utils";
import { validationSchema } from "./utils";
import { handleInitForm } from "./utils/initForm";

const PlanDesignsForm = () => {
  const { createQuoteStore, benefitStore } = useStore();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [deleteYear, setDeleteYear] = useState<number>();
  const params = useParams();
  const history = useHistory();

  const prospectId: string = get(params, "prospectId", "");
  const { selectedYear } = createQuoteStore;

  const methods = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: { contractLength: "9" },
  });
  const { handleSubmit, getValues, reset } = methods;

  useEffect(() => {
    const year: Number =
      selectedYear === SpecialTime.LAST_YEAR
        ? moment().subtract(1, "year").toDate().getFullYear()
        : Number(selectedYear);
    handleInitForm(benefitStore, reset, year);
  }, [selectedYear, benefitStore?.claimsData]);

  return (
    <FormProvider {...methods}>
      <Form
        onSubmit={handleSubmit(() =>
          createClaimsData(
            prospectId,
            getValues,
            createQuoteStore,
            benefitStore,
            history
          )
        )}
      >
        <Container>
          <TagSection
            onRemove={(year) => {
              setDeleteYear(year?.value);
              setOpenModal(!openModal);
            }}
          />
          <Section
            xl={{ size: 9 }}
            lg={{ size: 9 }}
            md={{ size: 9 }}
            sm={{ size: 9 }}
            xs={{ size: 9 }}
          >
            <BasicsDeductibles />
            <ClaimInformation />
            <ClaimAmount />
          </Section>
          <Section
            xl={{ size: 9 }}
            lg={{ size: 9 }}
            md={{ size: 9 }}
            sm={{ size: 9 }}
            xs={{ size: 9 }}
          >
            <MonthlyClaim />
          </Section>
          <Section
            xl={{ size: 9 }}
            lg={{ size: 9 }}
            md={{ size: 9 }}
            sm={{ size: 9 }}
            xs={{ size: 9 }}
          >
            <ExtraClaim />
          </Section>
          <RemoveModal
            onAccept={async () => {
              await handleRemoveClaimsData(
                benefitStore,
                prospectId,
                deleteYear
              );
              setDeleteYear(undefined);
              setOpenModal(!openModal);
            }}
            onCancel={() => {
              setDeleteYear(undefined);
              setOpenModal(false);
            }}
            toggle={() => {
              setDeleteYear(undefined);
              setOpenModal(false);
            }}
            isOpen={openModal}
          />
        </Container>
      </Form>
    </FormProvider>
  );
};

export default observer(PlanDesignsForm);
