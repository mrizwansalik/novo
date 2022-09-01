import { get } from "lodash";
import { observer } from "mobx-react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import {
  exportDocsToGDrive,
  getIllustrativeExportXlsUrl,
  getUnderwrittenExportXlsUrl,
  requestUnderwritingForProgram,
} from "src/api/quote";
import Icon from "src/components/Icon";
import { PROGRAM_TYPE } from "src/constants";
import { IParamTypes } from "src/types";
import { downloadFile } from "src/utils/downloadFile";
import { getAvailableUnderwrittenPlanComparisons } from "src/utils/prospectPrograms";
import useStore from "src/utils/useStore";
import {
  Container,
  Title,
  Filter,
  Proposals,
  DownloadButton,
  SearchInput,
  UnderwritingButton,
  SearchGroup,
  FilterWrapper,
  FilterBlock,
} from "./header.styles";

interface IHeaderProps {
  showUnderwrittenPrograms: boolean;
  setShowUnderwrittenPrograms: (value: boolean) => void;
}

const Header = ({
  showUnderwrittenPrograms,
  setShowUnderwrittenPrograms,
}: IHeaderProps) => {
  const { prospectId } = useParams<IParamTypes>();
  const {
    workerStore,
    onboardingQuoteStore,
    prospectProgramsStore,
  } = useStore();
  const isGod = workerStore;
  const { prospectDetail } = onboardingQuoteStore;
  const {
    filterText,
    programType,
    allProspectPrograms,
    programsForUnderwriting,
  } = prospectProgramsStore;

  const hasUnderwrittenPlans =
    getAvailableUnderwrittenPlanComparisons(allProspectPrograms).length > 0;
  const hasUnderwritingPlans =
    Array.isArray(programsForUnderwriting) && programsForUnderwriting.length;

  async function exportToGDrive() {
    try {
      toast.info(
        "Documents in the process of being sent to secure Google Drive..."
      );
      await exportDocsToGDrive(prospectId);
      toast.success("Sending documents to secure Google Drive");
    } catch (e) {
      toast.error("Error sending documents to Google Drive.");
    }
  }

  async function downloadQuote(isXlsx: boolean) {
    try {
      let fileUrl = "";
      let fileName = "";
      const prospectName = get(prospectDetail, "name", "");
      toast.info("Generating Spreadsheet...");
      if (programType === PROGRAM_TYPE.ILLUST) {
        fileUrl = await getIllustrativeExportXlsUrl(prospectId, isXlsx);
        fileName = `${prospectName} - Illustrative.xlsx`;
      } else {
        fileUrl = await getUnderwrittenExportXlsUrl(prospectId, isXlsx);
        fileName = `${prospectName} - Underwritten.xlsx`;
      }
      toast.success("Spreadsheet generated.");
      downloadFile(fileUrl, fileName);
    } catch (e) {
      toast.error("Error generating the Spreadsheet.");
    }
  }

  async function requestUnderwriting() {
    if (
      Array.isArray(programsForUnderwriting) &&
      programsForUnderwriting.length > 0
    ) {
      try {
        toast.info("Requesting Underwriting...");
        const promises = programsForUnderwriting.map((program) =>
          requestUnderwritingForProgram(prospectId, program)
        );
        await Promise.all(promises);
        prospectProgramsStore.getProgramList(prospectId);
        prospectProgramsStore.clearProgramsForUnderwriting();
        toast.success("Underwriting request has been submitted.");
      } catch (e) {
        toast.error("There was an error requesting underwriting.");
      }
    }
  }

  return (
    <Container>
      {!hasUnderwrittenPlans && (
        <Title xl="1" lg="3" md="12">
          Illustrative
        </Title>
      )}
      <FilterWrapper xl="11" lg="9" md="12">
        <Filter>
          {!isGod && <FilterBlock lg="4"></FilterBlock>}
          <FilterBlock lg="2" md="12">
            <Proposals>Proposals</Proposals>
          </FilterBlock>
          {isGod && (
            <FilterBlock lg="2" md="12" onClick={exportToGDrive}>
              <DownloadButton outline>Send to Google Drive</DownloadButton>
            </FilterBlock>
          )}
          <FilterBlock lg="2" md="12" onClick={() => downloadQuote(false)}>
            <DownloadButton outline>Download as CSV</DownloadButton>
          </FilterBlock>
          {isGod && (
            <FilterBlock lg="2" md="12" onClick={() => downloadQuote(true)}>
              <DownloadButton outline>Download as XLS</DownloadButton>
            </FilterBlock>
          )}
          <FilterBlock lg="2" md="12">
            <SearchGroup>
              <SearchInput
                placeholder="Search"
                onChange={(e) =>
                  prospectProgramsStore.updateSearchText(e.target.value)
                }
                value={filterText}
              />
              <Icon iconName="grey_search.png" />
            </SearchGroup>
          </FilterBlock>
          <FilterBlock lg="2" md="12">
            <UnderwritingButton
              disabled={!hasUnderwritingPlans}
              onClick={requestUnderwriting}
            >
              {showUnderwrittenPrograms ? "U/W Requested" : " Get Underwriting"}
            </UnderwritingButton>
          </FilterBlock>
        </Filter>
      </FilterWrapper>
    </Container>
  );
};

export default observer(Header);
