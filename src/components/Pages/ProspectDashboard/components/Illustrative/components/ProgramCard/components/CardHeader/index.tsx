import React, { useEffect, useState } from "react";
import { get } from "lodash";
import { useParams, useHistory } from "react-router";
import { toast } from "react-toastify";
import { DropdownItem } from "reactstrap";
import { deletePlanComparison } from "src/api/plan";
import Icon from "src/components/Icon";
import ConfirmModal from "src/components/MainConfirmModal";
import { ICarrierPlan } from "src/interfaces/benefit";
import routes from "src/routes";
import { IParamTypes } from "src/types";
import { truncateLongNames } from "src/utils/common";
import { getUnderwrittenProgramVersions } from "src/utils/prospectPrograms";
import useStore from "src/utils/useStore";
import {
  Container,
  GrayCircle,
  Content,
  ContentTitle,
  ContentDescription,
  MoreMenu,
  DropdownIcon,
  StyledDropdownMenu,
  CheckboxContainer,
} from "./cardHeader.styles";

interface ICardHeaderProps {
  program: ICarrierPlan;
}

const CardHeader = ({ program }: ICardHeaderProps) => {
  const [programName, setProgramName] = useState("");
  const [planSetName, setPlanSetName] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { prospectId } = useParams<IParamTypes>();
  const history = useHistory();

  const { workerStore, prospectProgramsStore } = useStore();
  const { isGod } = workerStore;
  const { allProspectPrograms, canBeUnderwritten } = prospectProgramsStore;

  const underwritingRequested = get(program, "underwriting_requested", false);
  const underwritingReceived =
    getUnderwrittenProgramVersions(program).length > 0;
  const canRequestUnderwriting =
    isGod ||
    (getUnderwrittenProgramVersions(program).length === 0 && canBeUnderwritten);

  const name = get(program, "name");

  function formatProgramName() {
    const nameArray = name.split("/");
    if (nameArray.length === 1) {
      setProgramName(nameArray[0]);
    } else if (nameArray.length > 1) {
      setProgramName(nameArray[0] + "/" + nameArray[1]);
      setPlanSetName(nameArray[3]);
    }
  }

  async function onDeleteConfirm() {
    toast.info("Removing program...");
    try {
      const planId = get(program, "id");
      await deletePlanComparison(prospectId, planId);
      toast.success("Program removed.");

      const newPrograms = allProspectPrograms.filter(
        (program) => program.id !== planId
      );
      prospectProgramsStore.updateProgramList(newPrograms);
    } catch (e) {
      toast.error("There was an error removing the quote.");
    }
  }

  useEffect(() => {
    formatProgramName();
  }, [name]);

  return (
    <Container>
      <CheckboxContainer>
        <GrayCircle
          isHide={underwritingRequested || underwritingReceived}
          disabled={!canRequestUnderwriting}
          onClick={(e) =>
            prospectProgramsStore.notifyProgramSelected(
              program,
              e.target.checked
            )
          }
        />
        {underwritingReceived && <span>Underwritten</span>}
        {underwritingRequested && !underwritingReceived && (
          <span>Requested</span>
        )}
      </CheckboxContainer>
      <Content>
        <ContentTitle>{truncateLongNames(programName)}</ContentTitle>
        <ContentDescription>{planSetName}</ContentDescription>
      </Content>
      <MoreMenu>
        <DropdownIcon>
          <Icon iconName="dots_menu.png" />
        </DropdownIcon>
        <StyledDropdownMenu>
          <DropdownItem
            onClick={() =>
              history.push(
                routes.dashboard.brokerage.prospects.prospectId.programDetail.getValue(
                  prospectId,
                  program.id
                )
              )
            }
          >
            View
          </DropdownItem>
          <DropdownItem onClick={() => setIsDeleteModalOpen(true)}>
            Delete
          </DropdownItem>
        </StyledDropdownMenu>
      </MoreMenu>
      <ConfirmModal
        toggle={() => setIsDeleteModalOpen(!isDeleteModalOpen)}
        isOpen={isDeleteModalOpen}
        title="Are you sure you want to remove BPA/6 Degrees Health (RBP)/Express Scripts/New Plan Set ?"
        acceptText="Yes, remove it"
        rejectText="No, keep it"
        acceptCallback={onDeleteConfirm}
        rejectCallback={() => setIsDeleteModalOpen(false)}
      />
    </Container>
  );
};

export default CardHeader;
