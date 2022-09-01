import { useState } from "react";
import {
  Container,
  TagWrapper,
  Label,
  InputWrapper,
  CommonInput,
  CommonIcon,
} from "./planSetNameTag.styles";

interface IPlanSetNameTagProps {
  active?: boolean;
  label: string;
  onClick: () => void;
}

const PlanSetNameTag = (props: IPlanSetNameTagProps) => {
  const { active, label, onClick } = props;
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Container>
      {!isEditing && (
        <TagWrapper
          onClick={() => {
            if (!active) {
              onClick();
            }
          }}
          active={active}
        >
          <Label active={active}>{label}</Label>
        </TagWrapper>
      )}
      {isEditing && (
        <InputWrapper>
          <CommonInput />
          <CommonIcon
            onClick={() => setIsEditing(false)}
            iconName="tick64px-green.png"
          />
          <CommonIcon
            onClick={() => setIsEditing(false)}
            iconName="trash-grey.png"
          />
          <CommonIcon
            onClick={() => setIsEditing(false)}
            iconName="xCircle64px-drk.png"
          />
        </InputWrapper>
      )}
    </Container>
  );
};

export default PlanSetNameTag;
