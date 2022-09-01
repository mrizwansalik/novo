import RowNoSpacing from "src/components/RowNoSpacing";
import { ThemeColor } from "src/constants";
import Header from "src/pages/createNewQuote/components/NetworkForm/Header";
import styled from "styled-components";

export const Container = styled(RowNoSpacing)`
  border-left: 1px solid ${ThemeColor.SILVER};
  background-color: ${ThemeColor.WHITE_COLOR};
  padding-bottom: 30px;
`;

export const HeaderWrapper = styled(Header)``;

export const Description = styled.div`
  font-size: 18px;
  font-weight: normal;
  color: #4b565e;
  line-height: 20px;

  div {
    margin-top: 10px;
    margin-bottom: 10px;

    a {
      height: 24px;
      font-size: 16px;
      line-height: 24px;
      color: #0097f5 !important;
      cursor: pointer;

      :hover {
        text-decoration: underline !important;
      }
    }
  }
`;
