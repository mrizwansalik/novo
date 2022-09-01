import React from "react";
import { observer } from "mobx-react";
import { Col, Row } from "reactstrap";
import DocumentProgress from "./components/DocumentProgress";
import DocumentTable from "./components/DocumentTable";
const ClaimsDocumentTab = () => {
  return (
    <>
      <Row>
        <Col xs={12} md={7} lg={8} xl={8}>
          <DocumentTable />
        </Col>
        <Col xs={12} md={5} lg={4} xl={3}>
          <DocumentProgress />
        </Col>
        <Col xs={0} xl={1}></Col>
      </Row>
    </>
  );
};

export default observer(ClaimsDocumentTab);
