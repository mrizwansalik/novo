import { Container, Label, CloseIcon } from "./yearTag.styles";

interface IYearTagProps {
  active?: boolean;
  includeIcon?: boolean;
  label: string;
  onClick: () => void;
  onRemove: () => void;
}

const YearTag = (props: IYearTagProps) => {
  const { active, includeIcon, label, onClick, onRemove } = props;

  return (
    <Container onClick={onClick} active={active}>
      <Label active={active}>{label}</Label>
      {includeIcon && (
        <CloseIcon
          onClick={onRemove}
          iconName={active ? "xCircleLightBlue.png" : "large_blue_x.png"}
        />
      )}
    </Container>
  );
};

export default YearTag;
