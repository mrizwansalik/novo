import { Table } from "@material-ui/core";
import { observer } from "mobx-react";
import useStore from "../../../../../utils/useStore";
import Tableboday from "../TableBody";
import TableHeader from "../TableHeader";
import { Container } from "./styles";
const BrokerageList = () => {
  const { rfpStore } = useStore();
  const { rfpDisplayList } = rfpStore;
  return (
    <Container>
      <Table style={{ border: "1px solid black" }}>
        <TableHeader />
        {Array.isArray(rfpDisplayList) &&
          rfpDisplayList.map((item, index) => (
            <Tableboday data={item} index={index} />
          ))}
      </Table>
    </Container>
  );
};

export default observer(BrokerageList);
