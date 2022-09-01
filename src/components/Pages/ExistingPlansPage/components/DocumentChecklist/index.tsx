import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import useStore from "src/utils/useStore";
import {
  requiredChecklist,
  optionalChecklist,
  mapStoreToState,
} from "../../utils";
import {
  ChecklistContainer,
  ChecklistItem,
  CheckIcon,
  ChecklistTitle,
  ChecklistType,
  Container,
  ChecklistName,
} from "./styles";
const DocumentChecklist = () => {
  const [currentRequiredChecklist, setCurrentRequiredChecklist] = useState(
    requiredChecklist
  );
  const [currentOptionalChecklist, setCurrentOptionalChecklist] = useState(
    optionalChecklist
  );
  const { brokerProspectsListStore } = useStore();
  const { currentPlanDocuments } = brokerProspectsListStore;
  useEffect(() => {
    setCurrentRequiredChecklist((currentValue) =>
      mapStoreToState(currentPlanDocuments, currentValue)
    );
    setCurrentOptionalChecklist((currentValue) =>
      mapStoreToState(currentPlanDocuments, currentValue)
    );
  }, [currentPlanDocuments]);
  return (
    <Container>
      <ChecklistTitle>Document Checklist</ChecklistTitle>
      <ChecklistContainer>
        <ChecklistType>Required</ChecklistType>
        {currentRequiredChecklist.map((item, index) => (
          <ChecklistItem key={index.toString()}>
            <ChecklistName active={item.isComplete}>{item.title}</ChecklistName>
            {item.isComplete && (
              <CheckIcon iconName="green_check_mark.png" size={16} />
            )}
          </ChecklistItem>
        ))}
      </ChecklistContainer>
      <ChecklistContainer>
        <ChecklistType>Optional</ChecklistType>
        {currentOptionalChecklist.map((item, index) => (
          <ChecklistItem key={index.toString()}>
            <ChecklistName active={item.isComplete}>{item.title}</ChecklistName>
            {item.isComplete && (
              <CheckIcon iconName="green_check_mark.png" size={16} />
            )}
          </ChecklistItem>
        ))}
      </ChecklistContainer>
    </Container>
  );
};

export default observer(DocumentChecklist);
