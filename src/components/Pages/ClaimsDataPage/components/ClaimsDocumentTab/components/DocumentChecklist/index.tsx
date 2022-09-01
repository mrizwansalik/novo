import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import useStore from "src/utils/useStore";
import {
  previousYearChecklist,
  currentYearChecklist,
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
  const [
    currentPreviousYearChecklist,
    setCurrentPreviousYearChecklist,
  ] = useState(previousYearChecklist);
  const [
    currentCurrentYearChecklist,
    setCurrentCurrentYearChecklist,
  ] = useState(currentYearChecklist);
  const { benefitStore } = useStore();
  const { currentClaimsDocuments } = benefitStore;
  const currentYear = new Date().getFullYear();
  const previousYear = new Date().getFullYear() - 1;

  useEffect(() => {
    setCurrentPreviousYearChecklist((currentValue) =>
      mapStoreToState(currentClaimsDocuments, currentValue, previousYear)
    );
    setCurrentCurrentYearChecklist((currentValue) =>
      mapStoreToState(currentClaimsDocuments, currentValue, currentYear)
    );
  }, [currentClaimsDocuments]);
  return (
    <Container>
      <ChecklistTitle>Document Checklist</ChecklistTitle>
      <ChecklistContainer>
        <ChecklistType>{`Previous Year (${previousYear})`}</ChecklistType>
        {currentPreviousYearChecklist.map((item, index) => (
          <ChecklistItem key={index.toString()}>
            <ChecklistName active={item.isComplete}>{item.title}</ChecklistName>
            {item.isComplete && (
              <CheckIcon iconName="green_check_mark.png" size={16} />
            )}
          </ChecklistItem>
        ))}
      </ChecklistContainer>
      <ChecklistContainer>
        <ChecklistType>{`Current Year (${currentYear})`}</ChecklistType>
        {currentCurrentYearChecklist.map((item, index) => (
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
