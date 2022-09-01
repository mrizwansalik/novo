import { useState } from "react";
import { Input } from "reactstrap";
import { ISubNetwork } from "src/interfaces/network";
import {
  Container,
  CheckboxSection,
  ProgramImage,
  ProgramName,
  ButtonWrapper,
  CollapseButton,
  CollapseContent,
} from "./style";

interface IProgramCardProps {
  subNetwork: ISubNetwork;
  isChecked: boolean;
  onClick: () => void;
}

const VendorCard = (props: IProgramCardProps) => {
  const { subNetwork, isChecked, onClick } = props;
  const [collapsed, setCollapsed] = useState<boolean>(true);

  return (
    <Container>
      <div onClick={onClick}>
        <CheckboxSection>
          <Input type="checkbox" checked={isChecked} />
        </CheckboxSection>
        <ProgramImage source={""} />
        <ProgramName>{"New Test"}</ProgramName>
        <CollapseContent isOpen={!collapsed}>
          {subNetwork?.description}
        </CollapseContent>
      </div>
      {subNetwork?.description && (
        <ButtonWrapper>
          <CollapseButton
            onClick={() => setCollapsed(!collapsed)}
            iconName="chevron.png"
            isCollapsed={collapsed}
          />
        </ButtonWrapper>
      )}
    </Container>
  );
};

export default VendorCard;
