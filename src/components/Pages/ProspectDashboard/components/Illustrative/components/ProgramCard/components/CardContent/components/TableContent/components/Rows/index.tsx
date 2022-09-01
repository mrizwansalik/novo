import { Container, Label, Value } from "./rows.styles";

interface IRowsProps {
  title: string;
  value: string;
}

const Rows = (props: IRowsProps) => {
  const { title, value } = props;

  return (
    <Container>
      <Label>{title}</Label>
      <Value>{value}</Value>
    </Container>
  );
};

export default Rows;
