import { useEffect } from "react";
import { observer } from "mobx-react";
import { Row, Col, Container } from "reactstrap";
import useStore from "src/utils/useStore";
import SavedProgramList from "./components/SavedProgramList";
const RFPsPage = () => {
  const { savedProgramStore } = useStore();
  useEffect(() => {
    savedProgramStore.savedProgramList(localStorage.getItem("orgId"));
  }, []);
  return (
    <Container>
      <Row>
        <Col>
          <SavedProgramList />
        </Col>
      </Row>
    </Container>
  );
};

export default observer(RFPsPage);
