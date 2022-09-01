import { Fragment, RefObject, useRef, useEffect } from "react";
import {
  TooltipContainer,
  TooltipContent,
  OptionContainer,
  OptionTextWrapper,
  OptionLabel,
  OptionValue,
  OptionIcon,
} from "./tooltipOptions.styles";

interface ITooltipOptionsProps {
  parentRef: RefObject<HTMLDivElement>;
  setIsOpenTooltip: (isOpenTooltip: boolean) => void;
}

const TooltipOptions = (props: ITooltipOptionsProps) => {
  const contentRef: RefObject<HTMLDivElement> = useRef();
  const { parentRef, setIsOpenTooltip } = props;

  function handleClickOutside(event): void {
    if (contentRef.current && !contentRef.current.contains(event?.target)) {
      setIsOpenTooltip(false);
    }
  }

  useEffect(() => {
    document?.addEventListener("mousedown", handleClickOutside);
    return () => document?.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Fragment>
      {parentRef?.current && (
        <TooltipContainer
          fade={false}
          placement="bottom"
          isOpen={true}
          target={parentRef}
        >
          <TooltipContent ref={contentRef}>
            <OptionContainer>
              <OptionTextWrapper>
                <OptionLabel>abc</OptionLabel>
                <OptionValue>$222/22%/$33</OptionValue>
              </OptionTextWrapper>
              <OptionIcon iconName="plusCircleBlue.png" />
            </OptionContainer>
          </TooltipContent>
        </TooltipContainer>
      )}
    </Fragment>
  );
};

export default TooltipOptions;
