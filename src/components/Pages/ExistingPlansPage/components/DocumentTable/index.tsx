import React, { useState } from "react";
import { cloneDeep } from "lodash";
import { observer } from "mobx-react";
import moment from "moment";
import { useParams } from "react-router-dom";
import Modal from "src/components/Modal";
import { IParamTypes } from "src/types";
import useStore from "src/utils/useStore";
import {
  Container,
  TableActionContainer,
  TableTitle,
  DeleteButton,
  DocumentTypeSelect,
  DownloadButton,
  EditButton,
  DocumentNameItem,
  EditNameContainer,
  UpdateButton,
  CancelButton,
  EditNameInput,
  UploadDateAndDownloadComponent,
  Checkbox,
  TableBody,
  TableBodyRow,
  TableHead,
  TableHeadContent,
  TableHeadRow,
  TableBodyContent,
  TableContainer,
  Table,
  DocumentName,
  PrimaryButton,
  SecondaryButton,
  ModalBody,
  EmptyTableRow,
} from "./styles";
import {
  getSelectValue,
  headerList,
  selectOptions,
  downloadFileFromUrl,
} from "./utils";
const DocumentTable = () => {
  const { brokerProspectsListStore } = useStore();
  const { prospectId } = useParams<IParamTypes>();
  const [selectedDocuments, setSelectedDocuments] = useState({});
  const [isDeleteDocumentModalOpen, setIsDeleteDocumentModalOpen] = useState(
    false
  );
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [editingDocument, setEditingDocument] = useState({});
  const { currentPlanDocuments } = brokerProspectsListStore;

  function onSelectAll(isSelectAll: boolean) {
    const selected = {};
    if (isSelectAll) {
      currentPlanDocuments.forEach((document) => {
        selected[document.id] = true;
      });
      setSelectedDocuments(selected);
    } else {
      currentPlanDocuments.forEach((document) => {
        selected[document.id] = false;
      });
      setSelectedDocuments(selected);
    }
  }

  function onSelectDocument(documentId: string, isSelect: boolean) {
    const selected = cloneDeep(selectedDocuments);
    if (isSelect) {
      selected[documentId] = true;
    } else {
      selected[documentId] = false;
    }
    setSelectedDocuments(selected);
  }
  function handleDeleteDocument() {
    const planDocumentsAfterDeleted = currentPlanDocuments.filter(
      (item) => selectedDocuments[item.id] !== true
    );
    brokerProspectsListStore.setCurrentPlanDocuments(planDocumentsAfterDeleted);
    brokerProspectsListStore.updateProspect(prospectId);
    setIsDeleteDocumentModalOpen(false);
    setSelectedDocuments({});
    setIsSelectAll(false);
  }
  function onEditingDocument(documentId: string, documentName: string) {
    const selectedDocument = {};
    selectedDocument[documentId] = documentName;
    setEditingDocument(selectedDocument);
  }
  function handleOnChangeName(documentId: string, value: string) {
    const selectedDocument = cloneDeep(editingDocument);
    selectedDocument[documentId] = value;
    setEditingDocument(selectedDocument);
  }
  function handleUpdateDocument(documentId: string) {
    const updatedPlanDocuments = currentPlanDocuments.map((item) => {
      item.name =
        item.id === documentId ? editingDocument[documentId] : item.name;
      return item;
    });
    brokerProspectsListStore.setCurrentPlanDocuments(updatedPlanDocuments);
    brokerProspectsListStore.updateProspect(prospectId);
    setEditingDocument({});
  }
  function handleOnChangeType(documentId: string, value: string) {
    const updatedPlanDocuments = currentPlanDocuments.map((item) => {
      item.tags = item.id === documentId ? value : item.tags;
      return item;
    });
    brokerProspectsListStore.setCurrentPlanDocuments(updatedPlanDocuments);
    brokerProspectsListStore.updateProspect(prospectId);
  }

  return (
    <Container>
      <TableActionContainer>
        <TableTitle>Documents</TableTitle>
        <DeleteButton
          iconName="trash-grey.png"
          size={24}
          onClick={() => setIsDeleteDocumentModalOpen(true)}
        />
      </TableActionContainer>
      <TableContainer>
        <Table>
          <TableHead>
            <TableHeadRow>
              {headerList.map((item, index) => (
                <TableHeadContent>
                  {index === 0 && (
                    <Checkbox
                      checked={isSelectAll}
                      onClick={(e) => {
                        onSelectAll(e.currentTarget.checked);
                        setIsSelectAll(e.currentTarget.checked);
                      }}
                    />
                  )}
                  {item.name}
                </TableHeadContent>
              ))}
            </TableHeadRow>
          </TableHead>
          <TableBody>
            {(!Array.isArray(currentPlanDocuments) ||
              currentPlanDocuments.length < 1) && (
              <EmptyTableRow colSpan={3}>
                No documents have been added.
              </EmptyTableRow>
            )}
            {Array.isArray(currentPlanDocuments) &&
              currentPlanDocuments.length > 0 &&
              currentPlanDocuments.map((item) => (
                <TableBodyRow>
                  <TableBodyContent>
                    {editingDocument[item.id] ? (
                      <EditNameContainer>
                        <EditNameInput
                          value={editingDocument[item.id]}
                          onChange={(e) =>
                            handleOnChangeName(item.id, e.target.value)
                          }
                        />
                        <UpdateButton
                          label="Update"
                          onClick={() => handleUpdateDocument(item.id)}
                        />
                        <CancelButton
                          label="Cancel"
                          onClick={() => setEditingDocument({})}
                        />
                      </EditNameContainer>
                    ) : (
                      <DocumentNameItem>
                        <Checkbox
                          checked={selectedDocuments[item.id]}
                          onClick={(e) =>
                            onSelectDocument(item.id, e.currentTarget.checked)
                          }
                        />
                        <DocumentName>{item.name}</DocumentName>
                        <EditButton
                          iconName="black_pencil.png"
                          size={24}
                          onClick={() => onEditingDocument(item.id, item.name)}
                        />
                      </DocumentNameItem>
                    )}
                  </TableBodyContent>
                  <TableBodyContent>
                    <DocumentTypeSelect
                      options={selectOptions}
                      value={getSelectValue(item.tags)}
                      onChange={(e) => handleOnChangeType(item.id, e.value)}
                    />
                  </TableBodyContent>
                  <TableBodyContent>
                    <UploadDateAndDownloadComponent>
                      {moment(item.modified).format("MMMM DD, YYYY")}
                      <DownloadButton
                        iconName="grey-download-tray.png"
                        size={24}
                        onClick={() =>
                          downloadFileFromUrl(item.file, item.name)
                        }
                      />
                    </UploadDateAndDownloadComponent>
                  </TableBodyContent>
                </TableBodyRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        isOpen={isDeleteDocumentModalOpen}
        toggle={() => setIsDeleteDocumentModalOpen(false)}
        body={
          <ModalBody>
            <h5>Are you sure you want to remove the selected file(s)?</h5>
            <div>
              <PrimaryButton
                label="Yes, remove them"
                onClick={() => handleDeleteDocument()}
              />
              <SecondaryButton
                label="Cancel"
                onClick={() => setIsDeleteDocumentModalOpen(false)}
              />
            </div>
          </ModalBody>
        }
      />
    </Container>
  );
};
export default observer(DocumentTable);
