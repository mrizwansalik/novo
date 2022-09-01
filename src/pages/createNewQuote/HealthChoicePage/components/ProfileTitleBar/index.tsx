import get from "lodash/get";
import { useHistory, useParams } from "react-router";
import { Col, Row } from "reactstrap";
import Icon from "src/components/Icon";
import routes from "src/routes";
import {
  ComponentContainer,
  Title,
  Description,
  SwitchPlanButton,
} from "./profileTitleBar.style";

const ProfileTitleBar = () => {
  const params = useParams();
  const history = useHistory();
  const prospectId: string = get(params, "prospectId", "");

  return (
    <ComponentContainer>
      <div>
        <Row>
          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            <Title>How will this group be underwritten?</Title>
            <Description>
              Or go to
              <SwitchPlanButton
                onClick={() =>
                  history.push(
                    routes.dashboard.brokerage.prospects.onBoarding.existingPlans.choice.getValue(
                      prospectId
                    )
                  )
                }
              >
                existing plans <Icon iconName="blue-arrow-right.png" />
              </SwitchPlanButton>
            </Description>
          </Col>
        </Row>
      </div>
    </ComponentContainer>
  );
};
export default ProfileTitleBar;
