import { Container, Label, Divider } from "./rows.styles";

interface IRowsProps {
  title: string;
}

const Rows = (props: IRowsProps) => {
  const { title } = props;

  return (
    <Container>
      <Label>{title}</Label>
      <Divider>
        <hr />
      </Divider>
    </Container>
  );
};

export default Rows;
