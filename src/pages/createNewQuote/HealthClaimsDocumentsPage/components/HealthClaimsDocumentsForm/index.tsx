import { useEffect } from "react";
import get from "lodash/get";
import { observer } from "mobx-react";
import { useForm, FormProvider, useWatch } from "react-hook-form";
import { useParams } from "react-router";
import useStore from "src/utils/useStore";
import { getClaimsDetail } from "../../utils";
import { updateDocumentRecords } from "../../utils/table";
import DocumentTable from "./components/DocumentTable";
import SideBar from "./components/SideBar";
import { HealthClaimsFormValues } from "./enums";
import {
  Container,
  LeftSection,
  RightSection,
} from "./healthClaimsDocumentsForm.styles";

const HealthClaimsDocumentsForm = () => {
  const { benefitStore } = useStore();
  const methods = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    shouldUnregister: false,
  });
  const { control, formState } = methods;
  const { isDirty } = formState;
  const params = useParams();
  const prospectId: string = get(params, "prospectId", "");
  const documentTable = useWatch({
    name: HealthClaimsFormValues.CLAIM_DOCUMENTS,
    control,
  });

  async function syncDocumentTable(): Promise<void> {
    try {
      benefitStore.setLoadingProgress(50);
      await updateDocumentRecords(prospectId, documentTable, benefitStore);
      if (isDirty) {
        getClaimsDetail(benefitStore, prospectId);
      }
      benefitStore.setLoadingProgress(100);
    } catch (error) {
      benefitStore.setLoadingProgress(0);
    }
  }

  useEffect(() => {
    syncDocumentTable();
  }, [documentTable, prospectId]);

  return (
    <FormProvider {...methods}>
      <Container>
        <LeftSection
          xl={{ size: 8 }}
          lg={{ size: 8 }}
          md={{ size: 12 }}
          sm={{ size: 12 }}
          xs={{ size: 12 }}
        >
          <DocumentTable />
        </LeftSection>
        <RightSection
          xl={{ size: 4 }}
          lg={{ size: 4 }}
          md={{ size: 12 }}
          sm={{ size: 12 }}
          xs={{ size: 12 }}
        >
          <SideBar />
        </RightSection>
      </Container>
    </FormProvider>
  );
};

export default observer(HealthClaimsDocumentsForm);
