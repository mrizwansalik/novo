import { Col, Row } from "reactstrap";
import Icon from "src/components/Icon";
import { ComponentContainer, RowSeparator } from "./profileTitleBar.style";

const ProfileTitleBar = () => {
  return (
    <ComponentContainer>
      <div>
        <RowSeparator />
        <Row>
          <Col lg={6} md={6}>
            <h1>Client Profile</h1>
            <h3>Fill out the information below</h3>
          </Col>
          <Col lg={4} md={4}>
            <p>
              Did you know you can use Employee Navigator to directly upload a
              group ?
            </p>
            <a
              target="_blank"
              href="https://answers.allay.io/article/81-how-to-export-a-group-from-employee-navigator-directly-to-allay"
              rel="noreferrer"
            >
              Follow our guide{" "}
              <Icon iconName="blue-arrow-right.png" size={18} />
            </a>
          </Col>
        </Row>
      </div>
    </ComponentContainer>
  );
};
export default ProfileTitleBar;
