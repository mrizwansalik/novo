import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Row, Col, Container } from "reactstrap";
import useStore from "src/utils/useStore";
import { Header } from "../CarrierListPage/styles";
import ActionBar from "./components/ActionBar";
import ProgramIngredientsList from "./components/ProgramIngredientList";
import { CarrierContainer } from "./styles";
const EmptyCarrier = {
  name: "",
  is_underwriter: false,
};

const ProgramIngredientsListPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [carrier, setCarrier] = useState(EmptyCarrier);
  const { programIngredientStore } = useStore();

  // async function handleCreateCarrier(carrier) {
  //   const data: IStopLossCarrier = await carrierListStore.createStopLossCarrier(
  //     carrier
  //   );
  //   if (data.name) {
  //     toast.success(data.name + " saved.");
  //   } else {
  //     toast.error("There was an error saving " + carrier.name);
  //   }
  //   setOpenModal(false);
  //   setCarrier(EmptyCarrier);
  // }
  useEffect(() => {
    programIngredientStore.getProgramIngredientsList(
      localStorage.getItem("orgId")
    );
  }, []);
  return (
    <Container>
      <CarrierContainer>
        <Row>
          <Col md={{ size: 8, offset: 2 }}>
            <Header>Program Ingredients</Header>
          </Col>
        </Row>
        <Row>
          <Col md={{ size: 8, offset: 2 }}>
            <ActionBar setOpenModal={setOpenModal} />
          </Col>
        </Row>
        <Row>
          <Col md={{ size: 8, offset: 2 }}>
            <ProgramIngredientsList />
          </Col>
        </Row>
      </CarrierContainer>
    </Container>
  );
};

export default observer(ProgramIngredientsListPage);
