import { useState } from "react";
import get from "lodash/get";
import { useWatch, useFormContext } from "react-hook-form";
import { useParams } from "react-router";
import { Table } from "reactstrap";
import MainConfirmModal from "src/components/MainConfirmModal";
import RowNoSpacing from "src/components/RowNoSpacing";
import {
  deleteDocumentRecords,
  getClaimsDetail,
} from "src/pages/createNewQuote/HealthClaimsDocumentsPage/utils";
import useStore from "src/utils/useStore";
import { HealthClaimsFormValues } from "../../enums";
import { IClaimsDocumentsForm } from "../../interfaces";
import Body from "./components/Body";
import Header from "./components/Header";
import {
  TableContainer,
  TitleSection,
  TableLabel,
  RemoveButton,
} from "./documentTable.styles";

const DocumentTable = () => {
  const params = useParams();
  const prospectId: string = get(params, "prospectId", "");
  const { control } = useFormContext();
  const { benefitStore } = useStore();
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  const documentTable: IClaimsDocumentsForm[] = useWatch({
    control,
    name: HealthClaimsFormValues.CLAIM_DOCUMENTS,
  });

  async function deleteDocuments(): Promise<void> {
    try {
      benefitStore.setLoadingProgress(50);
      await deleteDocumentRecords(prospectId, documentTable, benefitStore);
      getClaimsDetail(benefitStore, prospectId);
      benefitStore.setLoadingProgress(100);
    } catch (error) {
      benefitStore.setLoadingProgress(0);
    }
  }

  return (
    <RowNoSpacing>
      <TitleSection
        xl={{ size: 12 }}
        lg={{ size: 12 }}
        md={{ size: 12 }}
        sm={{ size: 12 }}
        xs={{ size: 12 }}
      >
        <TableLabel>Documents</TableLabel>
        <RemoveButton
          onClick={() => setDeleteModal(true)}
          iconName="trash-grey.png"
        />
      </TitleSection>
      <TableContainer
        xl={{ size: 10 }}
        lg={{ size: 10 }}
        md={{ size: 12 }}
        sm={{ size: 12 }}
        xs={{ size: 12 }}
      >
        <Table borderless responsive>
          <Header />
          <Body />
        </Table>
      </TableContainer>
      <MainConfirmModal
        title="Are you sure you want to remove the selected file(s)?"
        acceptText="Yes, remove them"
        rejectText="Cancel"
        isOpen={deleteModal}
        toggle={() => setDeleteModal(false)}
        acceptCallback={() => {
          deleteDocuments();
          setDeleteModal(false);
        }}
        rejectCallback={() => setDeleteModal(false)}
      />
    </RowNoSpacing>
  );
};

export default DocumentTable;
