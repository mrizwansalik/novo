import { observer } from "mobx-react";
import {
  AddButton,
  ActionSheetContainer,
  AddIcon,
  ActionSheetLayout,
  BrokerageCount,
  AddLabel,
} from "./style";
const ActionSheet = ({ display }) => {
  return (
    <ActionSheetContainer>
      <ActionSheetLayout md={12}>
        <BrokerageCount>
          {" "}
          {display
            ? "Documents"
            : "Customize, send and manage Request for each carrier"}
        </BrokerageCount>
        {display ? (
          <AddButton>
            <AddIcon iconName="uploadBlue36px.png" size={18} />
            <AddLabel>Upload Documents</AddLabel>
          </AddButton>
        ) : (
          <>
            <AddIcon iconName="send-arrow.png" size={24} />
            <AddIcon iconName="trash-grey.png" size={24} />
          </>
        )}
      </ActionSheetLayout>
    </ActionSheetContainer>
  );
};

export default observer(ActionSheet);
