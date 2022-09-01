import { Row } from "reactstrap";
import RowNoSpacing from "src/components/RowNoSpacing";
import styled from "styled-components";
import { ThemeColor } from "../../../../../../../constants";

export const Container = styled(Row)`
  margin-left: 0px;
  margin-right: 0px;
  border: 1px solid ${ThemeColor.MYSTIC};
  border-radius: 3px;
  min-height: 582px;
`;

export const ContentLayout = styled(RowNoSpacing)`
  min-height: 430px;
`;
