import {
  SelectButton,
  Description,
  Container,
  ButtonLayout,
} from "./selectGroup.styles";

interface ISelectGroupProps {
  description: string[];
  onClick: () => void;
}

const SelectGroup = (props: ISelectGroupProps) => {
  const { description, onClick } = props;
  return (
    <Container>
      {Array.isArray(description) &&
        description.map((text: string, index: number) => (
          <Description key={index} md={12}>
            {text}
          </Description>
        ))}
      <ButtonLayout>
        <SelectButton onClick={onClick} color="primary">
          Let's go
        </SelectButton>
      </ButtonLayout>
    </Container>
  );
};

export default SelectGroup;
