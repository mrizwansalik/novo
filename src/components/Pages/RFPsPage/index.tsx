import { useEffect } from "react";
import { observer } from "mobx-react";
import { Row, Col, Container } from "reactstrap";
import useStore from "src/utils/useStore";
import BrokerageList from "./components/BrokerageList";
import TopSheet from "./components/TopSheet";
const RFPsPage = () => {
  const { rfpStore } = useStore();
  useEffect(() => {
    rfpStore.rfpList();
  }, []);
  return (
    <Container>
      <Row>
        <Col>
          <TopSheet />
        </Col>
      </Row>
      <Row>
        <BrokerageList />
      </Row>
    </Container>
  );
};

export default observer(RFPsPage);
