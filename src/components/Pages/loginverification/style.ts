import { Row } from "reactstrap";
import { ThemeColor } from "src/constants";
import styled from "styled-components";

export const Container = styled(Row)`
  // background-color: ${ThemeColor.TWILIGHT_BLUE};
  --bx-gutter: 0px;
  height: 100%;
  width: 100%;
`;

export const LogoSection = styled.img`
  width: 4rem;
  height: 33px;
`;
