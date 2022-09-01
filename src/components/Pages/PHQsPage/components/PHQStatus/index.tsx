import React, { useState } from "react";
import { observer } from "mobx-react";
import { useParams } from "react-router-dom";
import { updateProspectPhqStatus } from "src/api/broker";
import { IParamTypes } from "src/types";
import useStore from "src/utils/useStore";
import {
  StyledButtonDropdown,
  StyledDropdownToggle,
  StyledDropdownItem,
  StyledDropdownMenu,
  StatusIcon,
  Outline,
} from "./styles";

const displayStatus = {
  open: "Incomplete",
  completed: "Complete",
  locked: "Locked",
};
const PHQStatus = () => {
  const { prospectId } = useParams<IParamTypes>();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  function toggle() {
    setDropdownOpen(!dropdownOpen);
  }
  const { brokerProspectsListStore } = useStore();
  const { currentProspectProgress } = brokerProspectsListStore;

  async function handleSelectStatus(status: string) {
    const requestData = {
      census_data: {
        health_history_skipped: false,
        health_history_type: "phqs",
        uploaded_format: null,
      },
      org_status: "active",
      phq_status: status,
    };
    await updateProspectPhqStatus(prospectId, requestData);
    await brokerProspectsListStore.setCurrentProspectProgress(prospectId);
  }
  return (
    <StyledButtonDropdown
      isOpen={dropdownOpen}
      toggle={toggle}
      direction="left"
    >
      <StyledDropdownToggle>
        {displayStatus[currentProspectProgress?.phq_status] || ""}
        <StatusIcon status={displayStatus[currentProspectProgress?.phq_status]}>
          <Outline></Outline>
        </StatusIcon>
      </StyledDropdownToggle>
      <StyledDropdownMenu>
        <StyledDropdownItem onClick={() => handleSelectStatus("open")}>
          <StatusIcon status={displayStatus.open} />
          Incomplete
        </StyledDropdownItem>
        <StyledDropdownItem onClick={() => handleSelectStatus("completed")}>
          <StatusIcon status={displayStatus.completed} />
          Complete
        </StyledDropdownItem>
        <StyledDropdownItem onClick={() => handleSelectStatus("locked")}>
          <StatusIcon status={displayStatus.locked} />
          Locked
        </StyledDropdownItem>
      </StyledDropdownMenu>
    </StyledButtonDropdown>
  );
};

export default observer(PHQStatus);
