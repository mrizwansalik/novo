import ColNoSpacing from "src/components/ColNoSpacing";
import { ThemeColor } from "src/constants";
import styled from "styled-components";

export const Container = styled(ColNoSpacing)`
  background-color: #f7f7f7;
  padding: 30px 20px;
`;

export const Title = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${ThemeColor.BLACK_COLOR};
`;

export const Description = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`;
