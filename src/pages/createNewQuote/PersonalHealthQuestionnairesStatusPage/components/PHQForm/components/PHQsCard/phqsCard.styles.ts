import ColNoSpacing from "src/components/ColNoSpacing";
import RowNoSpacing from "src/components/RowNoSpacing";
import styled from "styled-components";

export const Container = styled(RowNoSpacing)`
  margin-top: 25px;
  margin-left: -10px;
  width: calc(100% + 20px);
`;

export const CardWrapper = styled(ColNoSpacing)`
  margin-bottom: 20px;
`;
