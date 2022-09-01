import { useState } from "react";
import moment from "moment";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ConfirmModal from "src/components/ConfirmModal";
import FileUploader from "src/components/FileUploader";
import SingleSelect from "src/components/SingleSelect";
import { BaseFilePath } from "src/constants";
import { IParamTypes } from "src/types";
import useStore from "src/utils/useStore";
import { downloadFileFromUrl } from "../../../../ExistingPlansPage/components/DocumentTable/utils";
import {
  Container,
  TableActionContainer,
  TableTitle,
  UploadDateAndDownloadComponent,
  DownloadButton,
  Table,
  TableBody,
  TableBodyContent,
  TableBodyRow,
  TableContainer,
  TableHead,
  TableHeadContent,
  TableHeadRow,
  Checkbox,
  DocumentName,
  DocumentNameItem,
  EmptyTableRow,
} from "./style";

const customAllowFileTypes = [
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/pdf",
];

const Proposal = () => {
  const { qouteRFPsStore } = useStore();
  const { prospectId, rfpId } = useParams<IParamTypes>();
  const {
    qouteProposals,
    addQouteProposals,
    deleteQouteProposals,
    getQouteProposals,
  } = qouteRFPsStore;
  const [isModalUploadOpen, setIsModalUploadOpen] = useState(false);
  const [isConfirmModal, setIsConfirmModal] = useState(false);
  const [proposalId, setProposalId] = useState("");

  async function onDeleteConfirm() {
    toast.info("Removing program...");

    await deleteQouteProposals(prospectId, rfpId, proposalId);
    toast.success("Program removed.");
    setProposalId("");
    setIsConfirmModal(false);
    getQouteProposals(prospectId, rfpId);
  }
  function onUploadFile(uploadedFiles: any[], fileData) {
    uploadedFiles.forEach((item) => {
      const newDocument = {
        name: item.file_name,
        mime_type: item.mime_type,
        file: item.file,
      };
      let response = addQouteProposals(prospectId, rfpId, newDocument);
      if (response) getQouteProposals(prospectId, rfpId);
    });
    // brokerProspectsListStore.updateProspect(prospectId);
    setIsModalUploadOpen(false);
  }
  return (
    <Container>
      <TableActionContainer>
        <TableTitle>Manage proposal documents.</TableTitle>
        <UploadDateAndDownloadComponent>
          <div style={{ paddingRight: "10%" }}>
            {" "}
            <DownloadButton
              iconName="grey-circle-up-arrow.png"
              onClick={() => setIsModalUploadOpen(true)}
              size={24}
            />
          </div>
          <div style={{ paddingRight: "10%" }}>
            <DownloadButton iconName="trash-grey.png" size={24} />
          </div>
          <div style={{ paddingRight: "10%" }}>
            <DownloadButton iconName="grey-download-tray.png" size={24} />
          </div>
          <div style={{ width: "-webkit-fill-available" }}>
            {" "}
            <SingleSelect controlStyle={{ width: "-webkit-fill-available" }} />
          </div>
        </UploadDateAndDownloadComponent>
      </TableActionContainer>
      <TableContainer>
        <Table>
          <TableHead>
            <TableHeadRow>
              {/* {headerList.map((item, index) => ( */}
              <TableHeadContent style={{ width: "90%" }}>
                {/* {index === 0 && ( */}
                <Checkbox
                // checked={isSelectAll}
                // onClick={(e) => {
                //   onSelectAll(e.currentTarget.checked);
                //   setIsSelectAll(e.currentTarget.checked);
                // }}
                />
                {/* )} */}
                Name
              </TableHeadContent>
              <TableHeadContent style={{ width: "5%" }}>
                Modified
              </TableHeadContent>
              <TableHeadContent style={{ width: "5%" }}>
                Actions
              </TableHeadContent>
              {/* // ))} */}
            </TableHeadRow>
          </TableHead>
          <TableBody>
            {(!Array.isArray(qouteProposals) || qouteProposals.length < 1) && (
              <EmptyTableRow colSpan={3}>
                No documents have been added.
              </EmptyTableRow>
            )}
            {Array.isArray(qouteProposals) &&
              qouteProposals.length > 0 &&
              qouteProposals.map((item) => (
                <TableBodyRow>
                  <TableBodyContent>
                    <DocumentNameItem>
                      <Checkbox
                      // checked={selectedDocuments[item.id]}
                      // onClick={(e) =>
                      //   onSelectDocument(item.id, e.currentTarget.checked)
                      // }
                      />
                      <DocumentName>{item.name}</DocumentName>
                    </DocumentNameItem>
                    {/* )} */}
                  </TableBodyContent>
                  <TableBodyContent>
                    {moment(item.modified).format("MMMM DD, YYYY")}
                  </TableBodyContent>
                  <TableBodyContent>
                    <UploadDateAndDownloadComponent>
                      <DownloadButton
                        iconName="grey-download-tray.png"
                        size={24}
                        onClick={() =>
                          downloadFileFromUrl(item.file, item.name)
                        }
                      />
                      <DownloadButton
                        iconName="trash-grey.png"
                        size={24}
                        onClick={() => {
                          setIsConfirmModal(!isConfirmModal);
                          setProposalId(item.id);
                        }}
                      />
                    </UploadDateAndDownloadComponent>
                  </TableBodyContent>
                </TableBodyRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <FileUploader
        isOpen={isModalUploadOpen}
        onRequestClose={() => setIsModalUploadOpen(false)}
        filePath={BaseFilePath.PRIVATE}
        onMultipleUploadSuccess={onUploadFile}
        allowMultipleUploads
        customAllowFileTypes={customAllowFileTypes}
      />
      <ConfirmModal
        toggle={() => setIsConfirmModal(!isConfirmModal)}
        isOpen={isConfirmModal}
        title="Are you sure you want to remove this Proposal ?"
        acceptText="Yes, remove it"
        rejectText="No, keep it"
        acceptCallback={onDeleteConfirm}
        rejectCallback={() => setIsConfirmModal(false)}
      />
    </Container>
  );
};

export default Proposal;
