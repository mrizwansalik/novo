import { RefObject, useRef, useState } from "react";
import { observer } from "mobx-react";
import useStore from "src/utils/useStore";
import TooltipOptions from "../TooltipOptions";
import {
  Container,
  Label,
  Description,
  OutlineButton,
} from "./optionCard.styles";

const OptionCard = () => {
  const tooltipRef: RefObject<HTMLDivElement> = useRef();
  const [isOpenTooltip, setIsOpenTooltip] = useState<boolean>(false);

  const { existingPlansStore, programBuildPlanSetsStore } = useStore();
  const { existingPlans } = existingPlansStore;

  return (
    <Container>
      <Label xl="12" lg="12" md="12" sm="12" xs="12">
        Match existing
      </Label>
      <Description xl="12" lg="12" md="12" sm="12" xs="12">
        Start with existing plans and customize
      </Description>
      <div ref={tooltipRef}>
        <OutlineButton
          disabled={!Array.isArray(existingPlans) || existingPlans.length === 0}
          onClick={() => setIsOpenTooltip(!isOpenTooltip)}
          label="Match"
        />
      </div>
      {isOpenTooltip && (
        <TooltipOptions
          existingPlans={existingPlans}
          setIsOpenTooltip={setIsOpenTooltip}
          parentRef={tooltipRef}
        />
      )}
    </Container>
  );
};

export default observer(OptionCard);
