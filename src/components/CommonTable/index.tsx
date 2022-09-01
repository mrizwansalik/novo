import Table, { ITableProps } from "src/components/Table";
import { Container } from "./commonTable.styles";

const CommonTable = (props: ITableProps) => {
  return (
    <Container>
      <Table {...props} />
    </Container>
  );
};

export default CommonTable;
