import React from "react";
import { debounce } from "lodash";
import { observer } from "mobx-react";
import { Row, Col } from "reactstrap";
import useStore from "../../../../../utils/useStore";
import { Container, TopSheetTitle, TopSheetInputField } from "./styles";

const TopSheet = () => {
  const { brokerageListStore } = useStore();
  const { filterDisplayList } = brokerageListStore;
  const handleSearch = debounce((inputValue) => {
    filterDisplayList(inputValue.trim());
  }, 200);
  return (
    <Container>
      <Row>
        <Col md={9}>
          <TopSheetTitle>Brokerages</TopSheetTitle>
        </Col>
        <Col md={3}>
          <TopSheetInputField
            placeholder={`Find brokerages`}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default observer(TopSheet);
