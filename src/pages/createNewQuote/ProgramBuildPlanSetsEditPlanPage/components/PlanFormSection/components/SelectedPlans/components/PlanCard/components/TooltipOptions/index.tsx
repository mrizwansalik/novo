import { Fragment, RefObject, useRef, useEffect } from "react";
import {
  TooltipContainer,
  TooltipContent,
  OptionContainer,
  OptionLabel,
} from "./tooltipOptions.styles";

export interface ITooltipOption {
  label: string;
  handler: () => void;
}

interface ITooltipOptionsProps {
  parentRef: RefObject<HTMLDivElement>;
  setIsOpenTooltip: (isOpenTooltip: boolean) => void;
  tooltipOptions: ITooltipOption[];
}

const TooltipOptions = (props: ITooltipOptionsProps) => {
  const contentRef: RefObject<HTMLDivElement> = useRef();
  const { parentRef, setIsOpenTooltip, tooltipOptions } = props;

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
              {tooltipOptions?.map((option: ITooltipOption, index: number) => (
                <OptionLabel key={index} onClick={option?.handler}>
                  {option?.label}
                </OptionLabel>
              ))}
            </OptionContainer>
          </TooltipContent>
        </TooltipContainer>
      )}
    </Fragment>
  );
};

export default TooltipOptions;
