import { useHistory } from "react-router";
import { Col } from "reactstrap";
import logo2 from "src/assets/images/logo2.png";
import routes from "src/routes";
import { IHistory } from "../../../types";
import { LogoSection, TopSheetTitle } from "./style";

export default function TopBar() {
  const history = useHistory<IHistory>();
  return (
    <>
      <TopSheetTitle>
        <Col md={6} xs={6} sm={6}>
          <LogoSection src={logo2} alt="image" />
        </Col>
        <Col md={5}></Col>

        <Col md={1} xs={4} sm={6}>
          <a
            href="#"
            style={{ color: "blue" }}
            onClick={() => {
              localStorage.clear();
              history.push(routes.login.value);
            }}
          >
            Sign out
          </a>
        </Col>
      </TopSheetTitle>
    </>
  );
}
