import { useEffect, useState } from "react";
import get from "lodash/get";
import { observer } from "mobx-react";
import moment from "moment";
import { useFormContext, useWatch } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import Button from "src/components/Button";
import FileUploader from "src/components/FileUploader";
import Icon from "src/components/Icon";
import { BaseFilePath, FileAccessType } from "src/constants";
import { IClaimsDocument } from "src/interfaces/benefit";
import { IUploadedFile } from "src/interfaces/file";
import {
  calcChecklistScore,
  getChecklistOptionalStatus,
  getChecklistStatus,
  getClaimsDetail,
  handleCreateClaimsDocument,
} from "src/pages/createNewQuote/HealthClaimsDocumentsPage/utils";
import {
  extractTableRows,
  initDocumentTable,
} from "src/pages/createNewQuote/HealthClaimsDocumentsPage/utils/table";
import routes from "src/routes";
import { getAwsStoreOptions, IStoreOption } from "src/utils/fileUploadHelper";
import useStore from "src/utils/useStore";
import { customAllowFileTypes } from "../../constants";
import { HealthClaimsFormValues } from "../../enums";
import { ClaimDocumentType } from "../DocumentTable/enums";
import Checklist from "./components/Checklist";
import {
  Container,
  NextButton,
  UploadButton,
  ProgressSection,
  ChecklistButton,
  ButtonWithIcon,
  ProcessBar,
  ProgressInformation,
  ProgressButton,
  DocumentChecklist,
} from "./sideBar.styles";

const SideBar = () => {
  const router = useHistory();
  const [isModalUploadOpen, setIsModalUploadOpen] = useState<boolean>(false);
  const [option, setOption] = useState<IStoreOption>();
  const { benefitStore } = useStore();
  const { reset, control } = useFormContext();
  const claimDocumentsForm = useWatch({
    name: HealthClaimsFormValues.CLAIM_DOCUMENTS,
    control,
  });

  const params = useParams();
  const prospectId: string = get(params, "prospectId", "");
  const { claimsData } = benefitStore;

  async function handleOpenUploadModal(): Promise<void> {
    const storeOption: IStoreOption = await getAwsStoreOptions(
      FileAccessType.PRIVATE
    );
    setOption(storeOption);
    setIsModalUploadOpen(true);
  }

  async function handleUploadCompleted(
    uploaded: IUploadedFile[]
  ): Promise<void> {
    await handleCreateClaimsDocument(
      claimsData,
      prospectId,
      uploaded,
      benefitStore
    );
    await getClaimsDetail(benefitStore, prospectId);
  }

  useEffect(() => {
    const claimDocuments: IClaimsDocument[] = extractTableRows(claimsData);
    initDocumentTable(claimDocuments, reset);
    benefitStore.setLoadingProgress(100);
  }, [claimsData]);

  return (
    <Container>
      <NextButton
        onClick={() =>
          router.push(
            routes.dashboard.brokerage.prospects.onBoarding.health.claimsHistory.value(
              prospectId
            )
          )
        }
        md="12"
      >
        <Button label="Next" />
      </NextButton>
      <UploadButton md="12">
        <ButtonWithIcon onClick={handleOpenUploadModal}>
          <Icon iconName="emptyBlueCircleArrow.png" size={24} />
          &nbsp; Upload Documents
        </ButtonWithIcon>
      </UploadButton>
      <ProgressSection md="12">
        <ProcessBar
          value={(calcChecklistScore(claimDocumentsForm) / 5) * 100}
        />
        <ProgressInformation>
          <ProgressButton label="Due for underwriting" disable />
          <ChecklistButton>
            <Icon iconName="check-square.svg" />
            &nbsp;
            <span>{`${calcChecklistScore(claimDocumentsForm)}/5`}</span>
          </ChecklistButton>
        </ProgressInformation>
      </ProgressSection>
      <DocumentChecklist md="12">Document Checklist</DocumentChecklist>
      <Checklist
        md="12"
        label={`Previous Year (${moment()
          .subtract(1, "year")
          .toDate()
          .getFullYear()})`}
        contents={[
          {
            label: "Detailed Large Claimant Report",
            active: getChecklistStatus(
              ClaimDocumentType.CLAIMS_LARGE,
              moment().subtract(1, "year").toDate().getFullYear(),
              claimDocumentsForm
            ),
          },
          {
            label: "Monthly Premium vs. Claims Report",
            active: getChecklistStatus(
              ClaimDocumentType.CLAIMS_MONTHLY_PAID,
              moment().subtract(1, "year").toDate().getFullYear(),
              claimDocumentsForm
            ),
          },
        ]}
      />
      <Checklist
        md="12"
        label={`Current Year (${moment().toDate().getFullYear()}})`}
        contents={[
          {
            label: "Detailed Large Claimant Report",
            active: getChecklistStatus(
              ClaimDocumentType.CLAIMS_LARGE,
              moment().toDate().getFullYear(),
              claimDocumentsForm
            ),
          },
          {
            label: "Monthly Premium vs. Claims Report",
            active: getChecklistStatus(
              ClaimDocumentType.CLAIMS_MONTHLY_PAID,
              moment().toDate().getFullYear(),
              claimDocumentsForm
            ),
          },
          {
            label: "Monthly Enrollment Report",
            active: getChecklistStatus(
              ClaimDocumentType.CLAIMS_SCHEDULE_OF_BENEFITS,
              moment().toDate().getFullYear(),
              claimDocumentsForm
            ),
          },
        ]}
      />
      <Checklist
        md="12"
        label="Optional"
        contents={[
          {
            label: "Additional Claims Reports",
            active: getChecklistOptionalStatus(
              ClaimDocumentType.CLAIMS_ADDITIONAL,
              claimDocumentsForm
            ),
          },
        ]}
      />
      <FileUploader
        allowMultipleUploads
        onRequestClose={() => setIsModalUploadOpen(false)}
        isOpen={isModalUploadOpen}
        filePolicy={option}
        filePath={BaseFilePath.PRIVATE}
        customAllowFileTypes={customAllowFileTypes}
        onMultipleUploadSuccess={handleUploadCompleted}
      />
    </Container>
  );
};

export default observer(SideBar);
