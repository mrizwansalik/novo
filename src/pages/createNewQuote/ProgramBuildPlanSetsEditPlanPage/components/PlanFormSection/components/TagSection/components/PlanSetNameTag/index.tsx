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
  editingIndex?: number;
  setEditingIndex?: (editingIndex: number) => void;
  order?: number;
  onClick: () => void;
}

const PlanSetNameTag = (props: IPlanSetNameTagProps) => {
  const {
    active,
    label,
    editingIndex,
    setEditingIndex,
    order,
    onClick,
  } = props;
  const isEditMode: boolean = editingIndex === order;

  return (
    <Container>
      {!isEditMode && (
        <TagWrapper
          onClick={() => {
            if (!active) {
              onClick();
            }
            if (active) {
              setEditingIndex(order);
            }
          }}
          active={active}
        >
          <Label active={active}>{label}</Label>
        </TagWrapper>
      )}
      {isEditMode && (
        <InputWrapper>
          <CommonInput />
          <CommonIcon
            onClick={() => setEditingIndex(-1)}
            iconName="tick64px-green.png"
          />
          <CommonIcon
            onClick={() => setEditingIndex(-1)}
            iconName="trash-grey.png"
          />
          <CommonIcon
            onClick={() => setEditingIndex(-1)}
            iconName="xCircle64px-drk.png"
          />
        </InputWrapper>
      )}
    </Container>
  );
};

export default PlanSetNameTag;
