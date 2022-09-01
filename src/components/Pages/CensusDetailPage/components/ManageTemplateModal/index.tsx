import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Modal as ReactStrapModal } from "reactstrap";
import { deleteOrgSimpleCensusFormat } from "src/api/org";
import Modal from "src/components/Modal";
import routes from "src/routes";
import { IParamTypes } from "src/types";
import useStore from "src/utils/useStore";
import {
  ModalContainer,
  ModalBody,
  CloseIcon,
  TableBody,
  TableBodyRow,
  TableHead,
  TableHeadContent,
  TableHeadRow,
  TemplateTable,
  AddNewTemplateButton,
  TemplateName,
  TemplateAction,
  ActionIcon,
  PrimaryButton,
  SecondaryButton,
} from "./manageTemplateModal.style";
import { exportSimpleCensusTemplateCSV } from "./utils";
interface IManageTemplateModalProps {
  isOpen: boolean;
  toggle: () => void;
}

const ManageTemplateModal = (props: IManageTemplateModalProps) => {
  const [isDeleteTemplateModalOpen, setIsDeleteTemplateModalOpen] = useState(
    false
  );
  const [selectedTemplateId, setSelectedTemplateId] = useState("");
  const { censusDetailsStore } = useStore();
  const { censusTemplates } = censusDetailsStore;
  const { prospectId } = useParams<IParamTypes>();
  const history = useHistory();
  async function handleDeleteTemplate(templateId: string) {
    try {
      await deleteOrgSimpleCensusFormat(prospectId, templateId);
      const newTemplates = censusTemplates.filter(
        (template) => template.id !== templateId
      );
      censusDetailsStore.setTemplates(newTemplates);
      toast.success("Custom template deleted.");
      setIsDeleteTemplateModalOpen(false);
    } catch (err) {
      toast.error("There was a problem deleting the custom template.");
    }
  }

  useEffect(() => {
    censusDetailsStore.getAllTemplates(prospectId);
  }, [prospectId]);
  const { isOpen, toggle } = props;
  return (
    <ModalContainer>
      <ReactStrapModal isOpen={isOpen} centered toggle={toggle}>
        <ModalBody>
          <TemplateTable>
            <TableHead>
              <TableHeadRow>
                <TableHeadContent>Census Template Name</TableHeadContent>
                <TableHeadContent>Actions</TableHeadContent>
              </TableHeadRow>
            </TableHead>
            <TableBody>
              <TableBodyRow>
                <TemplateName>Novo Template</TemplateName>
                <TemplateAction>
                  <ActionIcon
                    iconName="grey-download-tray.png"
                    onClick={() =>
                      exportSimpleCensusTemplateCSV("NovoCensusTemplate")
                    }
                    size={24}
                  />
                </TemplateAction>
              </TableBodyRow>
              {Array.isArray(censusTemplates) &&
                censusTemplates.map((item, index) => {
                  return (
                    <TableBodyRow key={index.toString()}>
                      <TemplateName>{item.name}</TemplateName>
                      <TemplateAction>
                        <ActionIcon
                          iconName="red-trash.png"
                          onClick={() => {
                            setIsDeleteTemplateModalOpen(true);
                            setSelectedTemplateId(item.id);
                          }}
                          size={24}
                        />
                        <ActionIcon
                          iconName="black_pencil.png"
                          onClick={() =>
                            history.push(
                              routes.dashboard.brokerage.prospects.prospectId.census.template.templateId.value(
                                prospectId,
                                item.id
                              )
                            )
                          }
                          size={24}
                        />
                      </TemplateAction>
                    </TableBodyRow>
                  );
                })}

              <TableBodyRow>
                <TemplateName></TemplateName>
                <TemplateAction>
                  <AddNewTemplateButton
                    label="Add new template"
                    onClick={() => {
                      history.push(
                        routes.dashboard.brokerage.prospects.prospectId.census.template.value(
                          prospectId
                        )
                      );
                    }}
                  />
                </TemplateAction>
              </TableBodyRow>
            </TableBody>
          </TemplateTable>
          <CloseIcon iconName="cross-blue.png" onClick={toggle} size={10} />
        </ModalBody>
      </ReactStrapModal>
      <Modal
        isOpen={isDeleteTemplateModalOpen}
        toggle={() => setIsDeleteTemplateModalOpen(false)}
        body={
          <ModalBody>
            <h5>Are you sure you want to delete this custom template?</h5>
            <div>
              <PrimaryButton
                label="Yes, delete it"
                onClick={() => handleDeleteTemplate(selectedTemplateId)}
              />
              <SecondaryButton
                label="Cancel"
                onClick={() => setIsDeleteTemplateModalOpen(false)}
              />
            </div>
          </ModalBody>
        }
      />
    </ModalContainer>
  );
};

export default observer(ManageTemplateModal);
