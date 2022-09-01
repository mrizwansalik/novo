import { observer } from "mobx-react";
import { useHistory } from "react-router-dom";
import { Col, Row } from "reactstrap";
import routes from "src/routes";
import useStore from "src/utils/useStore";
import {
  CarrierBox,
  CarrierLogoNo,
  CarrierText,
  Dotted,
  CarrierLogo,
} from "./styles";

const CarrierList = () => {
  const history = useHistory();
  const { carrierListStore } = useStore();
  const { carrierDisplayList } = carrierListStore;
  return (
    <>
      <Row>
        {Array.isArray(carrierDisplayList) &&
          carrierDisplayList?.map((i) => (
            <Col md={3}>
              <CarrierBox
                onClick={(e) =>
                  history.push(
                    routes.dashboard.god.carriers.edit.getValue(i.id)
                  )
                }
              >
                {i.picture_thumbnail_256 ? (
                  <CarrierLogo src={i.picture_thumbnail_256} />
                ) : (
                  <CarrierLogoNo />
                )}
                <Dotted />
                <CarrierText>{i.name}</CarrierText>
              </CarrierBox>
            </Col>
          ))}
      </Row>
    </>
  );
};

export default observer(CarrierList);
