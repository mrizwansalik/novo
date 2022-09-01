import React, { useEffect, useState } from "react";
import { cloneDeep, isEmpty } from "lodash";
import { observer } from "mobx-react";
import moment from "moment";
import { get } from "react-hook-form";
import { toast } from "react-toastify";
import { updateOrg } from "src/api/org";
import ButtonWithPriority from "src/components/ButtonWithPriority";
import Icon from "src/components/Icon";
import Modal from "src/components/Modal";
import TableWithSelect from "src/components/TableWithSelect";
import { EXISTING_PLANS_FILES_MAPPING } from "src/constants/quote";
import { IExistingPlanDocument } from "src/interfaces/document";
import { setDataObjectMapping } from "src/utils/requiredField";
import useStore from "src/utils/useStore";
import CategorySelectField from "../CategorySelectField";
import NameInputField from "../NameInputField";
import {
  ComponentContainer,
  StyledIcon,
  FormHeader,
  ModalBody,
  NoDocumentText,
} from "./documentsForm.style";
import { getFiles, headerList, updateEditFiles } from "./utils";

const DocumentsForm = () => {
  const [selectedDocuments, setSelectedDocuments] = useState({});
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [shouldSortTable, setShouldSortTable] = useState(true);

  const { onboardingQuoteStore, existingPlansDocumentsStore } = useStore();
  const { prospectDetail } = onboardingQuoteStore;
  const { files, categoryTypes } = existingPlansDocumentsStore;

  const tableData = handleTableData(files);

  function handleTableData(files: IExistingPlanDocument[]) {
    const data = files.map((file) => {
      const id = get(file, "file.id");
      const modified = get(file, "file.modified") || get(file, "date");
      const category = (
        <CategorySelectField file={file} categoryTypes={categoryTypes} />
      );
      const downloadButton = (
        <a href={file?.file?.file}>
          <StyledIcon iconName="grey-download-tray.png" size={24} />
        </a>
      );
      return {
        ...file,
        id,
        category,
        name: <NameInputField file={file} />,
        updatedAt: moment(modified).format("MMMM DD, YYYY"),
        action: downloadButton,
      };
    });
    return data;
  }

  function onSelectDocument(fileId: number, isSelect: boolean) {
    const selected = cloneDeep(selectedDocuments);
    if (isSelect) {
      selected[fileId] = true;
    } else {
      selected[fileId] = false;
    }
    setSelectedDocuments(selected);
  }

  function onSelectAllDocuments(isSelectAll: boolean) {
    setSelectedDocuments({});
    if (isSelectAll) {
      const selected = {};
      tableData.forEach((document) => {
        const fileId = get(document, "file.id");
        selected[fileId] = true;
      });
      setSelectedDocuments(selected);
    }
  }

  function handleOpenDeleteModal() {
    const hasSelected = Object.values(selectedDocuments).some(
      (isSelected: boolean) => isSelected
    );
    if (hasSelected) {
      setIsDeleteModalOpen(true);
    }
  }

  async function handleDeleteDocument() {
    try {
      const allFiles = getFiles(prospectDetail);
      const selectedFiles = allFiles.filter(
        (file) => !selectedDocuments[file.id]
      );

      setDataObjectMapping(
        prospectDetail,
        EXISTING_PLANS_FILES_MAPPING,
        selectedFiles,
        false
      );

      const updatedProspect = await updateOrg(prospectDetail);
      existingPlansDocumentsStore.setFiles([]);
      onboardingQuoteStore.setProspectDetail(updatedProspect);

      setSelectedDocuments({});
      setIsDeleteModalOpen(false);
      toast.success("Files removed.");
    } catch (e) {
      toast.success("There was a problem removing the files.");
    }
  }

  useEffect(() => {
    existingPlansDocumentsStore.onInit();
  }, []);

  useEffect(() => {
    if (!isEmpty(prospectDetail)) {
      const currentFiles = updateEditFiles(
        prospectDetail,
        files,
        categoryTypes,
        shouldSortTable
      );
      existingPlansDocumentsStore.setFiles(currentFiles);
      setShouldSortTable(false);
    }
  }, [prospectDetail]);

  return (
    <ComponentContainer>
      <FormHeader>
        <h2>Documents</h2>
        <Icon
          iconName="trash-grey.png"
          size={24}
          onClick={handleOpenDeleteModal}
        />
      </FormHeader>
      {Array.isArray(tableData) && tableData.length ? (
        <TableWithSelect
          maxRowPerPage={20}
          headerList={headerList}
          data={tableData}
          selectedRow={selectedDocuments}
          onSelectRow={onSelectDocument}
          onSelectAll={onSelectAllDocuments}
        />
      ) : (
        <NoDocumentText>No documents have been added.</NoDocumentText>
      )}
      <Modal
        isOpen={isDeleteModalOpen}
        toggle={() => setIsDeleteModalOpen(false)}
        body={
          <ModalBody>
            <h5>Are you sure you want to remove the selected file(s)?</h5>
            <div>
              <ButtonWithPriority
                isPrimary
                onClick={() => handleDeleteDocument()}
              >
                Yes, remove them
              </ButtonWithPriority>
              <ButtonWithPriority
                isSecondary
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </ButtonWithPriority>
            </div>
          </ModalBody>
        }
      />
    </ComponentContainer>
  );
};

export default observer(DocumentsForm);
