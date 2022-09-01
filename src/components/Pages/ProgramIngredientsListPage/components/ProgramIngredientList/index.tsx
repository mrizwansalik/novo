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
  CarrierContainer,
} from "./styles";

const CarrierList = () => {
  const history = useHistory();
  const { programIngredientStore } = useStore();
  const { programIngredientsDisplayList } = programIngredientStore;
  return (
    <>
      <CarrierContainer>
        <Row>
          {Array.isArray(programIngredientsDisplayList) &&
            programIngredientsDisplayList?.map((i) => (
              <Col md={3}>
                <CarrierBox
                  onClick={(e) =>
                    history.push(
                      routes.dashboard.god.programIngredients.edit.getValue(
                        i.id
                      )
                    )
                  }
                >
                  {i?.org?.picture_thumbnail_256 ? (
                    <CarrierLogo src={i?.org?.picture_thumbnail_256} />
                  ) : (
                    <CarrierLogoNo />
                  )}
                  <Dotted />
                  <CarrierText>{i.name}</CarrierText>
                </CarrierBox>
              </Col>
            ))}
        </Row>
      </CarrierContainer>
    </>
  );
};

export default observer(CarrierList);
