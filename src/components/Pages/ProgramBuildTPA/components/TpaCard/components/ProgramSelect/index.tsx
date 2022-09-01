import { observer } from "mobx-react";
import { tpaHasIngredientsOfType } from "src/components/Pages/ProgramBuildTPA/utils";
import { ITpa } from "src/interfaces/benefit";
import { Container, ScrollWrapper, Option } from "./programSection.styles";

interface IProgramSelectProps {
  tpa: ITpa;
  ingredientTypes: any;
  activeTab: string;
  setActiveTab: (tabName: string) => void;
}

const ProgramSelect = (props: IProgramSelectProps) => {
  const { tpa, ingredientTypes, activeTab, setActiveTab } = props;

  return (
    <Container>
      <ScrollWrapper>
        {Object.keys(ingredientTypes).map((shortName: string) => {
          if (tpaHasIngredientsOfType(tpa, ingredientTypes[shortName])) {
            return (
              <Option
                isActive={activeTab === shortName}
                onClick={() => setActiveTab(shortName)}
              >
                {shortName}
              </Option>
            );
          }
          return null;
        })}
      </ScrollWrapper>
    </Container>
  );
};

export default observer(ProgramSelect);
