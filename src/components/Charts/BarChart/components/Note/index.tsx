import { Container, SmallDot, BarTitle, BarValue } from "./note.styles";

interface INoteProps {
  label: string;
  value: string;
  color: string;
}

const Note = (props: INoteProps) => {
  const { label, value, color } = props;
  return (
    <Container>
      <SmallDot dotColor={color} />
      <BarTitle>{label}</BarTitle>
      <BarValue>{value}</BarValue>
    </Container>
  );
};

export default Note;
