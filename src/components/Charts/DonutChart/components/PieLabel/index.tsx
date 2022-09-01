import { Container, SmallDot, PieTitle, PieValue } from "./pieLabel.styles";

interface IPieLabelProps {
  label: string;
  value: number;
  color: string;
  hiddenValue?: boolean;
}

const PieLabel = (props: IPieLabelProps) => {
  const { label, value, color, hiddenValue } = props;
  return (
    <Container>
      <SmallDot dotColor={color} />
      <PieTitle>{label}</PieTitle>
      {!hiddenValue && <PieValue>{value}</PieValue>}
    </Container>
  );
};

export default PieLabel;
