import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { observer } from "mobx-react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Row, Col, Container } from "reactstrap";
import { Modal as ReactStrapModal } from "reactstrap";
import { IStopLossCarrier } from "src/interfaces/carrier";
import useStore from "src/utils/useStore";
import * as yup from "yup";
import ActionBar from "./components/ActionBar";

import CarrierList from "./components/CarrierList";
import { CarrierContainer, Header, StyledInput, WiderButton } from "./styles";

const EmptyCarrier = {
  name: "",
  is_underwriter: false,
};

const schema = yup.object().shape({
  name: yup.string().required(),
});
const CarrierListPage = () => {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const watchShowName = watch("name", true);
  const [openModal, setOpenModal] = useState(false);
  const [carrier, setCarrier] = useState(EmptyCarrier);
  const { carrierListStore } = useStore();

  async function handleCreateCarrier(carrier) {
    const data: IStopLossCarrier = await carrierListStore.createStopLossCarrier(
      carrier
    );
    if (data.name) {
      toast.success(data.name + " saved.");
    } else {
      toast.error("There was an error saving " + carrier.name);
    }
    setOpenModal(false);
    setCarrier(EmptyCarrier);
  }
  useEffect(() => {
    carrierListStore.getCarrierList();
  }, []);

  console.log(watchShowName);

  return (
    <Container>
      <Row>
        <Col md={{ size: 8, offset: 2 }}>
          <Header>Stop Loss Carriers</Header>
        </Col>
      </Row>
      <Row>
        <Col md={{ size: 8, offset: 2 }}>
          <ActionBar setOpenModal={setOpenModal} />
        </Col>
      </Row>
      <Row>
        <Col md={{ size: 8, offset: 2 }}>
          <CarrierList />
        </Col>
      </Row>
      <ReactStrapModal isOpen={openModal} toggle={(e) => setOpenModal(false)}>
        <form onSubmit={handleSubmit(handleCreateCarrier)}>
          <CarrierContainer>
            <Row>
              <Col md={{ size: 2, offset: 10 }}>
                <WiderButton
                  size={"lg"}
                  color={"primary"}
                  label={"x"}
                  onClick={(e) => setOpenModal(false)}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <h3>Carrier Name</h3>
              </Col>
            </Row>
            <Row>
              <Col>
                <StyledInput
                  // value={carrier.name}
                  {...register("name", { required: true })}
                  // onChange={(e) =>
                  //   setCarrier({ ...carrier, name: e.target.value })
                  // }
                />
                <p style={{ color: "red" }}>{errors.name?.message}</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <input
                  checked={carrier.is_underwriter}
                  {...register("is_underwriter")}
                  // onChange={(e) =>
                  //   setCarrier({ ...carrier, is_underwriter: e.target.checked })
                  // }
                  type="checkbox"
                />{" "}
                <label> Is Underwriter</label>
              </Col>
            </Row>
            <Row>
              <Col>
                <WiderButton
                  size={"lg"}
                  label={"Save"}
                  type="submit"
                  // onClick={(e) => handleCreateCarrier(carrier)}
                />
              </Col>
            </Row>
          </CarrierContainer>
        </form>
      </ReactStrapModal>
    </Container>
  );
};

export default observer(CarrierListPage);
