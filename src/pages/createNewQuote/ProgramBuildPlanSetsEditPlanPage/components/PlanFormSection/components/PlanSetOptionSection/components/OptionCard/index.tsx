import { RefObject, useRef, useState } from "react";
import { ICard } from "../../constants";
import TooltipOptions from "../TooltipOptions";
import {
  Container,
  Label,
  Description,
  OutlineButton,
} from "./optionCard.styles";

interface IOptionCardProps {
  card: ICard;
}

const OptionCard = (props: IOptionCardProps) => {
  const { card } = props;
  const tooltipRef: RefObject<HTMLDivElement> = useRef();
  const [isOpenTooltip, setIsOpenTooltip] = useState<boolean>(false);

  return (
    <Container>
      <Label xl="12" lg="12" md="12" sm="12" xs="12">
        {card?.title}
      </Label>
      <Description xl="12" lg="12" md="12" sm="12" xs="12">
        {card?.description}
      </Description>
      <div ref={tooltipRef}>
        <OutlineButton
          onClick={() => setIsOpenTooltip(!isOpenTooltip)}
          label={card?.buttonLabel}
        />
      </div>
      {card?.withTooltip && isOpenTooltip && (
        <TooltipOptions
          setIsOpenTooltip={setIsOpenTooltip}
          parentRef={tooltipRef}
        />
      )}
    </Container>
  );
};

export default OptionCard;
