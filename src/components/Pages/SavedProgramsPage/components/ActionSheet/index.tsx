import React, { useState } from "react";
import { EditOutlined, ClearOutlined } from "@material-ui/icons";
import { observer } from "mobx-react";
import { useHistory } from "react-router-dom";
import { Dropdown, DropdownMenu, DropdownItem } from "reactstrap";
import routes from "src/routes";
import useStore from "../../../../../utils/useStore";
import {
  AddButton,
  ActionSheetContainer,
  AddLabel,
  ActionSheetLayout,
  BrokerageCount,
  EditButton,
} from "./styles";
const ActionSheet = ({ setOpen, program, version }) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const { brokerageListStore } = useStore();
  const history = useHistory();
  // const versionId = "";
  // const programId = "";

  return (
    <ActionSheetContainer>
      <ActionSheetLayout md={12}>
        <BrokerageCount>
          <Dropdown
            isOpen={openDropdown}
            toggle={() => setOpenDropdown(!openDropdown)}
          >
            <EditButton color="white">
              Edit
              <EditOutlined />
            </EditButton>
            <DropdownMenu>
              <DropdownItem
                onClick={() =>
                  history.push(
                    routes.dashboard.brokerage.editTemplatePrograms.getValue(
                      program,
                      version
                    )
                  )
                }
              >
                <EditOutlined />
                Stop loss
              </DropdownItem>
              <DropdownItem>
                <EditOutlined />
                Expenses
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </BrokerageCount>
        <AddButton onClick={() => setOpen(true)}>
          <ClearOutlined />
          <AddLabel>Delete</AddLabel>
        </AddButton>
      </ActionSheetLayout>
    </ActionSheetContainer>
  );
};

export default observer(ActionSheet);
