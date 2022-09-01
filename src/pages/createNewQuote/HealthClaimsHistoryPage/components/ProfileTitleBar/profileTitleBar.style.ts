import ColNoSpacing from "src/components/ColNoSpacing";
import { ThemeColor } from "src/constants";
import styled from "styled-components";

export const ComponentContainer = styled.div`
  width: 100%;
  min-height: 138px;
  background-color: #f5f5f5;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: left;

  padding-top: 22px;
  padding-bottom: 22px;
  padding-left: 16px;
  padding-right: 16px;

  > div {
    display: flex;
    justify-content: space-between;
    position: relative;

    > div {
      justify-content: space-between;
    }

    div {
      align-items: center;
    }
  }
`;

export const Layout = styled(ColNoSpacing)`
  max-width: 1150px;
`;

export const Title = styled.h1`
  font-size: 24px;
  line-height: 36px;
  margin-bottom: 8px;
  color: ${ThemeColor.STEEL_GRAY};
  font-weight: 700;
`;

export const Description = styled.div`
  font-size: 16px;
  line-height: 24px;
  color: ${ThemeColor.STEEL_GRAY};
  font-weight: 500;
  margin-bottom: 8px;

  span {
    font-weight: bold;
  }
`;
