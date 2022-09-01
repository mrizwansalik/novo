import {
  SelectButton,
  Label,
  Description,
  Container,
} from "./selectGroup.styles";

interface ISelectGroupProps {
  label: string;
  description: string;
  onClick: () => void;
}

const SelectGroup = (props: ISelectGroupProps) => {
  const { label, description, onClick } = props;
  return (
    <Container>
      <Label md={12}>{label}</Label>
      <Description md={12}>{description}</Description>
      <SelectButton onClick={onClick} color="primary">
        Choose
      </SelectButton>
    </Container>
  );
};

export default SelectGroup;
