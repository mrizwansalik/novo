import { useState } from "react";
import get from "lodash/get";
import {
  Container,
  WrapperButton,
  LeftButton,
  RightButton,
} from "./switchButton.styles";

export interface ISwitchButtonProps {
  options: ISwitchOption[];
  onChange: (value: string) => void;
}

export interface ISwitchOption {
  label: string;
  value: string;
}

const SwitchButton = (props: ISwitchButtonProps) => {
  const { options, onChange } = props;
  const leftOption: ISwitchOption = get(options, "[0]", {});
  const rightOption: ISwitchOption = get(options, "[1]", {});
  const [selected, setSelected] = useState<string>(leftOption?.value);

  return (
    <Container>
      <WrapperButton>
        <LeftButton
          onClick={() => {
            setSelected(leftOption?.value);
            onChange && onChange(leftOption?.value);
          }}
          active={selected === leftOption?.value}
        >
          {leftOption?.label}
        </LeftButton>
        <RightButton
          onClick={() => {
            setSelected(rightOption?.value);
            onChange && onChange(rightOption?.value);
          }}
          active={selected === rightOption?.value}
        >
          {rightOption?.label}
        </RightButton>
      </WrapperButton>
    </Container>
  );
};

export default SwitchButton;
