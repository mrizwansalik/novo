import ColNoSpacing from "src/components/ColNoSpacing";
import RowNoSpacing from "src/components/RowNoSpacing";
import styled from "styled-components";

export const Container = styled(RowNoSpacing)`
  display: flex;
  margin-top: 25px;
  width: 100%;
  margin-left: -13px;
`;

export const CardWrapper = styled(ColNoSpacing)`
  padding-left: 13px;
  padding-right: 13px;
`;
