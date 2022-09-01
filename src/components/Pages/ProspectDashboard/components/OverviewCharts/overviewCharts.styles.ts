import { Row, Col } from "reactstrap";
import Icon from "src/components/Icon";
import { breakpoints } from "src/styles/layout";
import styled from "styled-components";
import "../../../../../styles/layout.ts";

export const Container = styled(Row)`
  margin-left: 12px;
  margin-right: 12px;
  padding-bottom: 24px;
  margin: auto;
  max-width: 1357px;
`;

export const EmptyGraphIcon = styled(Icon)`
  img {
    width: 195px;
    height: 93px;
  }
`;

export const NoDataText = styled.h3`
  color: #8d959c;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 24px;
  margin-top: 8px;
`;

export const EnrollmentLayout = styled(Col)``;

export const DemographicLayout = styled(Col)`
  order: 2 !important;
  ${breakpoints("margin-top", [
    {
      lg: "24px",
    },
  ])}
`;

export const ClientOverviewLayout = styled(Col)`
  ${breakpoints("margin-top", [
    {
      sm: "24px",
    },
  ])}
`;
