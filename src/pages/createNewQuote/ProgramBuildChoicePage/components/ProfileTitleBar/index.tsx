import { Col, Row } from "reactstrap";
import { ComponentContainer, Description } from "./profileTitleBar.style";

const ProfileTitleBar = () => {
  return (
    <ComponentContainer>
      <div>
        <Row>
          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            <Description>
              You’re all set! Now you are ready to create your programs.
            </Description>
          </Col>
        </Row>
      </div>
    </ComponentContainer>
  );
};
export default ProfileTitleBar;
