import { useEffect } from "react";
import { observer } from "mobx-react";
import { Row, Col, Container } from "reactstrap";
import useStore from "../../../utils/useStore";
import ActionSheet from "./components/ActionSheet";
import BrokerageList from "./components/BrokerageList";
import TopSheet from "./components/TopSheet";
const BrokerageListPage = () => {
  const { orgStore, carrierListStore } = useStore();
  useEffect(() => {
    orgStore.getOrg();
    orgStore.getOrgList();
    carrierListStore.getCarrier();
  }, []);
  return (
    <Container>
      <Row>
        <Col>
          <TopSheet />
        </Col>
      </Row>
      <Row>
        <Col>
          <ActionSheet />
        </Col>
      </Row>
      <Row>
        <BrokerageList />
      </Row>
    </Container>
  );
};

export default observer(BrokerageListPage);
