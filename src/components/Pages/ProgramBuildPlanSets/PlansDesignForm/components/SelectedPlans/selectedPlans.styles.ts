import ColNoSpacing from "src/components/ColNoSpacing";
import RowNoSpacing from "src/components/RowNoSpacing";
import styled from "styled-components";

export const Container = styled(RowNoSpacing)`
  margin-top: 28px;
  margin-bottom: 20px;
`;

export const CardWrapper = styled(ColNoSpacing)`
  padding-left: 14px;
  padding-right: 14px;
  margin-bottom: 20px;
`;

export const HeaderText = styled.h2`
  text-align: center;
  color: #4b565e;
  font-size: 18px;
  line-height: 27px;
  font-weight: 700;
  margin-top: 30px;
  margin-bottom: 8px;
`;

export const NoPlanText = styled.p`
  text-align: center;
  color: #a6a6a6;
  font-size: 16px;
  font-weight: 300;
  line-height: 24px;
`;
