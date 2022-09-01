import { useEffect, useState } from "react";
import get from "lodash/get";
import Icon from "src/components/Icon";
import { IOption } from "src/interfaces/common";
import {
  Container,
  Label,
  ArrowSection,
  LeftArrow,
  RightArrow,
  CenterSection,
  DotSymbol,
} from "./arrowSelect.styles";

interface IArrowSelectProps {
  options: IOption[];
  defaultOption?: IOption;
  onChange?: (value?: string) => void;
}

const ArrowSelect = (props: IArrowSelectProps) => {
  const { options, defaultOption, onChange } = props;
  const [selected, setSelected] = useState<IOption>();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const firstOption: IOption = get(options, "[0]", {});
  const lastOption: IOption = get(options, `[${options?.length - 1}]`, {});

  useEffect(() => {
    onChange && onChange(String(selected?.value));
  }, [selected]);

  useEffect(() => {
    const defaultValue = get(options, "[0]", {}) || defaultOption;
    setSelected(defaultValue);
  }, [options]);

  return (
    <Container>
      <Label md="12">{selected?.label}</Label>
      <ArrowSection md="12">
        <LeftArrow
          onClick={() => {
            if (selected?.value === firstOption?.value) return;
            setSelected(options[selectedIndex - 1]);
            setSelectedIndex((oldState: number) => oldState - 1);
          }}
        >
          <Icon
            iconName={
              selected?.value === firstOption?.value
                ? "rightArrow32px-lgt.png"
                : "blue-arrow-right.png"
            }
          />
        </LeftArrow>
        <CenterSection>
          {Array.isArray(options) &&
            options.map((option: IOption, index: number) => {
              const isActive: boolean = selected?.value === option.value;
              return <DotSymbol isActive={isActive} key={index} />;
            })}
        </CenterSection>
        <RightArrow
          onClick={() => {
            if (selected?.value === lastOption?.value) return;
            setSelected(options[selectedIndex + 1]);
            setSelectedIndex((oldState: number) => oldState + 1);
          }}
        >
          <Icon
            iconName={
              selected?.value === lastOption?.value
                ? "rightArrow32px-lgt.png"
                : "blue-arrow-right.png"
            }
          />
        </RightArrow>
      </ArrowSection>
    </Container>
  );
};

export default ArrowSelect;
