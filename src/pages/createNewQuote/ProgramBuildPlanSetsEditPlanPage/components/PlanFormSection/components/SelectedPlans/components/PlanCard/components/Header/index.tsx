import { RefObject, useRef, useState } from "react";
import TooltipOptions, { ITooltipOption } from "../TooltipOptions";
import {
  Container,
  Label,
  LabelWrapper,
  MenuIcon,
  Description,
} from "./header.styles";

interface IHeaderProps {
  handleEditPlan: () => void;
  handleRemovePlan: () => void;
}

const Header = (props: IHeaderProps) => {
  const { handleEditPlan, handleRemovePlan } = props;
  const tooltipRef: RefObject<HTMLDivElement> = useRef();
  const [isOpenTooltip, setIsOpenTooltip] = useState<boolean>(false);

  const options: ITooltipOption[] = [
    {
      label: "Edit",
      handler: handleEditPlan,
    },
    {
      label: "Delete",
      handler: handleRemovePlan,
    },
  ];

  return (
    <Container>
      <LabelWrapper>
        <Label>Matching abc</Label>
        <div ref={tooltipRef}>
          <MenuIcon
            iconName="dots_menu.png"
            onClick={() => setIsOpenTooltip(true)}
          />
        </div>
        {isOpenTooltip && (
          <TooltipOptions
            setIsOpenTooltip={setIsOpenTooltip}
            parentRef={tooltipRef}
            tooltipOptions={options}
          />
        )}
      </LabelWrapper>
      <Description>$222/ 22%/ $33</Description>
    </Container>
  );
};

export default Header;
