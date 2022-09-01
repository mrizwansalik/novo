/* eslint-disable max-lines */
import React, { useEffect, useState } from "react";
import { flatten, cloneDeep } from "lodash";
import { observer } from "mobx-react";
import moment from "moment";
import { useParams } from "react-router-dom";
import { updateClaimsData, createClaimsData } from "src/api/benefits";
import Modal from "src/components/Modal";
import { IParamTypes } from "src/types";
import useStore from "src/utils/useStore";
import { createEmptyClaimsData } from "../../../../utils";
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
  getCategoryTypeValue,
  headerList,
  categoryTypeOptions,
  downloadFileFromUrl,
  yearOptions,
  getYearValue,
  updateClaimsDocument,
} from "./utils";

const DocumentTable = () => {
  const { benefitStore } = useStore();
  const { prospectId } = useParams<IParamTypes>();
  const [selectedDocuments, setSelectedDocuments] = useState({});
  const [isDeleteDocumentModalOpen, setIsDeleteDocumentModalOpen] = useState(
    false
  );
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [editingDocument, setEditingDocument] = useState({});
  const { claimsData, currentClaimsDocuments } = benefitStore;

  useEffect(() => {
    const flattenDocs = flatten(
      claimsData.map((item) => {
        const newDocs = item.generic_field_responses?.claims_documents.map(
          (document) => {
            document.year = item.year;
            return document;
          }
        );
        return newDocs;
      })
    );
    const sortedDocs = flattenDocs.sort((a, b) => b.year - a.year);
    benefitStore.setClaimsDocuments(sortedDocs);
  }, [claimsData]);

  function onSelectAll(isSelectAll: boolean) {
    const selected = {};
    if (isSelectAll) {
      currentClaimsDocuments.forEach((document) => {
        selected[document.id] = true;
      });
      setSelectedDocuments(selected);
    } else {
      currentClaimsDocuments.forEach((document) => {
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
    const selectedClaimsDocuments = currentClaimsDocuments.filter(
      (item) => selectedDocuments[item.id] === true
    );
    claimsData.forEach((item) => {
      const documentsToBeDeleted = selectedClaimsDocuments.filter(
        (document) => document.year === item.year
      );
      if (documentsToBeDeleted.length > 0) {
        item.generic_field_responses.claims_documents = item.generic_field_responses.claims_documents.filter(
          (document) => {
            if (documentsToBeDeleted.find((item) => item.id === document.id)) {
              return false;
            }
            return true;
          }
        );
        updateClaimsData(prospectId, item.id, item);
      }
    });
    const claimsDocumentsAfterDeleted = currentClaimsDocuments.filter(
      (item) => selectedDocuments[item.id] !== true
    );
    benefitStore.setClaimsDocuments(claimsDocumentsAfterDeleted);
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
    const selectedClaimsDocument = currentClaimsDocuments.find(
      (item) => item.id === documentId
    );
    selectedClaimsDocument.name = editingDocument[documentId];
    updateClaimsDocument(selectedClaimsDocument, claimsData, prospectId);
    setEditingDocument({});
  }
  function handleOnChangeType(documentId: string, value: string) {
    const selectedClaimsDocument = currentClaimsDocuments.find(
      (item) => item.id === documentId
    );
    selectedClaimsDocument.tags = value;
    benefitStore.setClaimsDocuments(
      currentClaimsDocuments.map((item) =>
        item.id === selectedClaimsDocument.id ? selectedClaimsDocument : item
      )
    );
    updateClaimsDocument(selectedClaimsDocument, claimsData, prospectId);
  }

  async function handleOnChangeYear(
    documentId: string,
    yearAfterChange: number
  ) {
    const selectedClaimsDocument = currentClaimsDocuments.find(
      (item) => item.id === documentId
    );

    const oldClaimsData = claimsData.find(
      (item) => item.year === selectedClaimsDocument.year
    );
    selectedClaimsDocument.year = Number(yearAfterChange);
    const newClaimsData = claimsData.find(
      (item) => item.year.toString() === yearAfterChange.toString()
    );
    if (newClaimsData) {
      oldClaimsData.generic_field_responses.claims_documents =
        oldClaimsData.generic_field_responses.claims_documents.filter(
          (item) => item.id !== selectedClaimsDocument.id
        ) || [];
      newClaimsData.generic_field_responses?.claims_documents.push(
        selectedClaimsDocument
      );
      benefitStore.setClaimsDocuments(
        currentClaimsDocuments.map((item) =>
          item.id === selectedClaimsDocument.id ? selectedClaimsDocument : item
        )
      );
      updateClaimsData(prospectId, oldClaimsData.id, oldClaimsData);
      updateClaimsData(prospectId, newClaimsData.id, newClaimsData);
    } else {
      oldClaimsData.generic_field_responses.claims_documents =
        oldClaimsData.generic_field_responses.claims_documents.filter(
          (item) => item.id !== selectedClaimsDocument.id
        ) || [];
      let newClaimsYearDataToBeAdded = createEmptyClaimsData(
        Number(yearAfterChange)
      );
      newClaimsYearDataToBeAdded.generic_field_responses?.claims_documents.push(
        selectedClaimsDocument
      );
      benefitStore.setClaimsDocuments(
        currentClaimsDocuments.map((item) =>
          item.id === selectedClaimsDocument.id ? selectedClaimsDocument : item
        )
      );
      updateClaimsData(prospectId, oldClaimsData.id, oldClaimsData);
      newClaimsYearDataToBeAdded = await createClaimsData(
        prospectId,
        newClaimsYearDataToBeAdded
      );

      const cloneClaimsData = cloneDeep(claimsData);
      cloneClaimsData.push(newClaimsYearDataToBeAdded);
      benefitStore.setClaimsData(cloneClaimsData);
    }
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
            {(!Array.isArray(currentClaimsDocuments) ||
              currentClaimsDocuments.length < 1) && (
              <EmptyTableRow colSpan={3}>
                No documents have been added.
              </EmptyTableRow>
            )}
            {Array.isArray(currentClaimsDocuments) &&
              currentClaimsDocuments.length > 0 &&
              currentClaimsDocuments.map((item) => (
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
                      options={categoryTypeOptions}
                      value={getCategoryTypeValue(item.tags)}
                      onChange={(e) => handleOnChangeType(item.id, e.value)}
                      menuPortalTarget={document.querySelector("body")}
                    />
                  </TableBodyContent>
                  <TableBodyContent>
                    <DocumentTypeSelect
                      options={yearOptions}
                      value={getYearValue(item.year)}
                      onChange={(e) => handleOnChangeYear(item.id, e.value)}
                      menuPortalTarget={document.querySelector("body")}
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
