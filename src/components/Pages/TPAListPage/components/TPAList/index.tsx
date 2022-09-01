import { observer } from "mobx-react";
import { useHistory } from "react-router-dom";
import { Col, Row, Button } from "reactstrap";
import routes from "src/routes";
import useStore from "src/utils/useStore";

import {
  CarrierBox,
  CarrierLogoNo,
  CarrierText,
  Dotted,
  CarrierLogo,
} from "./styles";

const TPAList = () => {
  const history = useHistory();
  const { tpaStore } = useStore();
  const { TPADisplayList } = tpaStore;
  return (
    <>
      <Row>
        {Array.isArray(TPADisplayList) &&
          TPADisplayList?.map((i) => (
            <Col md={3}>
              <CarrierBox
                onClick={(e) =>
                  history.push(routes.dashboard.god.tpa.edit.getValue(i.id))
                }
              >
                {i.picture_thumbnail_256 ? (
                  <CarrierLogo src={i.picture_thumbnail_256} />
                ) : (
                  <CarrierLogoNo />
                )}
                <Dotted />
                <CarrierText>{i.name}</CarrierText>
                <CarrierText>Group Size Restrictions</CarrierText>
                <CarrierText>
                  Min:{" "}
                  {i.custom_plan_minimum_group_size
                    ? i.custom_plan_minimum_group_size
                    : "None"}
                </CarrierText>
                <CarrierText>
                  {i.is_standard ? (
                    ""
                  ) : (
                    <Button color="danger" outline>
                      Broker Added
                    </Button>
                  )}
                </CarrierText>
              </CarrierBox>
            </Col>
          ))}
      </Row>
    </>
  );
};

export default observer(TPAList);
