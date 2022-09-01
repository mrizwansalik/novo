import { useState } from "react";
import get from "lodash/get";
import { observer } from "mobx-react";
import { useHistory, useParams } from "react-router";
import Icon from "src/components/Icon";
import MainConfirmModal from "src/components/MainConfirmModal";
import { IPhqDocument } from "src/interfaces/benefit";
import { handleDeletePhqDocument } from "src/pages/createNewQuote/PersonalHealthQuestionnairesPage/utils";
import routes from "src/routes";
import useStore from "src/utils/useStore";
import {
  Container,
  CardLayout,
  Title,
  DescriptionSection,
  RefLinkTitle,
  CommonButton,
  DeleteModalTitle,
  LabelWithIcon,
} from "./assignCard.styles";

const AssignCard = () => {
  const history = useHistory();
  const { benefitStore } = useStore();
  const params = useParams();
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [editingDocument, setEditingDocument] = useState<IPhqDocument>();
  const prospectId: string = get(params, "prospectId", "");
  const { selectedPhqDocuments } = benefitStore;

  return (
    <Container md="12">
      <CardLayout>
        <Title md="12">Assign more PHQs</Title>
        <DescriptionSection md="12">
          <RefLinkTitle>
            <div>You have included the following questionnaires:</div>
            {Array.isArray(selectedPhqDocuments) &&
              selectedPhqDocuments.map(
                (selectedPhqDocument: IPhqDocument, index: number) => (
                  <LabelWithIcon
                    onClick={() => {
                      setEditingDocument(selectedPhqDocument);
                      setOpenDeleteModal(true);
                    }}
                    key={index}
                  >
                    <span>{selectedPhqDocument?.name}</span>
                    <Icon iconName="trash-grey.png" />
                  </LabelWithIcon>
                )
              )}
          </RefLinkTitle>
        </DescriptionSection>
        <CommonButton
          onClick={() =>
            history.push(
              routes.dashboard.brokerage.prospects.onBoarding.health.phqs.assignPhqs.value(
                prospectId
              )
            )
          }
          md="12"
          label="Assign more"
        />
      </CardLayout>
      <MainConfirmModal
        isOpen={openDeleteModal}
        title={
          <DeleteModalTitle>
            Are you sure you want to remove
            <span> {editingDocument?.name}</span>?
          </DeleteModalTitle>
        }
        acceptText="Yes, remove it"
        rejectText="Cancel"
        rejectCallback={() => {
          setEditingDocument({} as IPhqDocument);
          setOpenDeleteModal(false);
        }}
        acceptCallback={() => {
          handleDeletePhqDocument(benefitStore, editingDocument, prospectId);
          setOpenDeleteModal(false);
        }}
      />
    </Container>
  );
};

export default observer(AssignCard);
