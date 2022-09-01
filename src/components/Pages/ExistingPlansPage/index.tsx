import React from "react";
import { observer } from "mobx-react";
import { Col, Row } from "reactstrap";
import DocumentProgress from "./components/DocumentProgress";
import DocumentTable from "./components/DocumentTable";
const ExistingPlansPage = () => {
  return (
    <>
      <Row>
        <Col md={8}>
          <DocumentTable />
        </Col>
        <Col md={2}>
          <DocumentProgress />
        </Col>
        <Col md={2}></Col>
      </Row>
    </>
  );
};

export default observer(ExistingPlansPage);
