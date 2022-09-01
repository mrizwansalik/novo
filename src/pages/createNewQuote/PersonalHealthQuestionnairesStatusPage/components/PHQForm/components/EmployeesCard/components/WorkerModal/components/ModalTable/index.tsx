import { Fragment, useEffect } from "react";
import get from "lodash/get";
import { observer } from "mobx-react";
import moment from "moment";
import { useFormContext, useWatch, Controller } from "react-hook-form";
import { useParams } from "react-router";
import { getWorkerDocument } from "src/api/worker";
import CommonTable from "src/components/CommonTable";
import SingleSelect from "src/components/SingleSelect";
import { DocumentStatus, SignatureState } from "src/constants/enum/document";
import { IPhqDocument } from "src/interfaces/benefit";
import { IWorkerDocument } from "src/interfaces/document";
import {
  handleDocumentStatusChange,
  IAssignedDocumentsTree,
} from "src/pages/createNewQuote/PersonalHealthQuestionnairesStatusPage/utils";
import {
  extractDocumentStatus,
  extractSignatureState,
} from "src/pages/createNewQuote/PersonalHealthQuestionnairesStatusPage/utils/workerTable";
import useStore from "src/utils/useStore";
import { IWorkerTable, IWorkerTableDocument } from "../../interfaces";
import { tableHeaders } from "./constants";
import {
  Container,
  Questionnaire,
  QuestionnaireIcon,
  QuestionnaireLabel,
} from "./modalTable.styles";
import { getWorkerOptions } from "./options";
import { isWorkerSubmitted } from "./utils";

interface IModalTableProps {
  assignedDocument: IAssignedDocumentsTree;
}

const ModalTable = (props: IModalTableProps) => {
  const params = useParams();
  const prospectId: string = get(params, "prospectId", "");
  const { control, formState } = useFormContext();
  const { isDirty } = formState;
  const { assignedDocument } = props;
  const formValues = useWatch({
    control,
    name: "documents",
  }) as IWorkerTableDocument[];
  const { benefitStore, workerStore } = useStore();
  const workerSubmitted: boolean = isWorkerSubmitted(
    assignedDocument?.documents
  );

  async function onChangeDocumentStatus(): Promise<void> {
    await handleDocumentStatusChange(formValues);
    benefitStore.fetchAssignedDocuments(prospectId);
    workerStore.getProspectWorkers(prospectId);
  }

  useEffect(() => {
    if (isDirty) {
      onChangeDocumentStatus();
    }
  }, [formValues, isDirty]);

  async function handleDownload(documentRecord: IPhqDocument): Promise<void> {
    const workerId: string = get(documentRecord, "owner.id", "");
    const workerDocumentId: string = get(documentRecord, "worker_document", "");
    const signedDocument: IWorkerDocument = await getWorkerDocument(
      workerId,
      workerDocumentId
    );
    if (!!signedDocument?.file) {
      window.open(signedDocument?.file, "_blank");
    }
  }

  const dataInTable: IWorkerTable[] = Array.isArray(assignedDocument?.documents)
    ? assignedDocument?.documents?.map((row: IPhqDocument, index: number) => {
        const signatureState: SignatureState = get(
          row,
          "signature_state",
          SignatureState.NEEDS_SIGNATURES
        ) as SignatureState;
        const documentStatus: DocumentStatus = get(
          row,
          "status",
          DocumentStatus.UN_SUBMITTED
        ) as DocumentStatus;
        const active: boolean = SignatureState.FULLY_SIGNED === signatureState;
        const tableRow: IWorkerTable = {
          questionnaire: (
            <Questionnaire
              active={active}
              {...(active && {
                onClick: () => handleDownload(row),
              })}
            >
              <QuestionnaireLabel>{row?.name}</QuestionnaireLabel>
              {active && (
                <QuestionnaireIcon iconName="grey-download-tray.png" />
              )}
            </Questionnaire>
          ),
          signature: extractSignatureState(signatureState),
          updatedAt: moment(row?.modified).format("LL"),
          submission: (
            <Fragment>
              {workerSubmitted && (
                <Controller
                  name={`documents[${index}].submission`}
                  control={control}
                  defaultValue={extractDocumentStatus(documentStatus)}
                  render={({ field }) => (
                    <SingleSelect
                      {...field}
                      options={getWorkerOptions(documentStatus)}
                    />
                  )}
                />
              )}
            </Fragment>
          ),
        };
        return tableRow;
      })
    : [];

  return (
    <Container>
      <CommonTable headerList={tableHeaders} data={dataInTable} />
    </Container>
  );
};

export default observer(ModalTable);
