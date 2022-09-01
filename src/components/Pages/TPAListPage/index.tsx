import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Row, Col, Container } from "reactstrap";
import useStore from "src/utils/useStore";
import { Header } from "../CarrierListPage/styles";
import ActionBar from "./components/ActionBar";

import TPAList from "./components/TPAList";

const TPAListPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const { tpaStore } = useStore();

  useEffect(() => {
    tpaStore.getTPAList();
  }, []);
  return (
    <Container>
      <Row>
        <Col md={{ size: 8, offset: 2 }}>
          <Header>TPAs</Header>
        </Col>
      </Row>
      <Row>
        <Col md={{ size: 8, offset: 2 }}>
          <ActionBar setOpenModal={setOpenModal} />
        </Col>
      </Row>
      <Row>
        <Col md={{ size: 8, offset: 2 }}>
          <TPAList />
        </Col>
      </Row>
    </Container>
  );
};

export default observer(TPAListPage);
