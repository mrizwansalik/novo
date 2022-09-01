import { ThemeColor } from "src/constants";
import styled from "styled-components";

export const ComponentContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: left;

  width: 100%;
  min-height: 138px;
  background-color: ${ThemeColor.WILD_SAND};

  padding-top: 22px;
  padding-bottom: 22px;
  padding-left: 16px;
  padding-right: 16px;

  > div {
    display: flex;
    justify-content: space-between;
    position: relative;
    max-width: 1150px;

    > div {
      justify-content: space-between;
    }

    div {
      align-items: center;
    }
  }
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
`;
