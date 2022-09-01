import ColNoSpacing from "src/components/ColNoSpacing";
import RowNoSpacing from "src/components/RowNoSpacing";
import styled from "styled-components";

export const Container = styled(RowNoSpacing)`
  h3 {
    padding: 10px 20px;
    margin-bottom: 8px;
    font-size: 16px;
    line-height: 24px;
    color: #212135;
    font-weight: 500;
  }
`;

export const SpaceBottomDiv = styled.div`
  margin-bottom: 25px;
  padding: 0;
`;

export const SummarySection = styled.div<{ color?: string }>`
  padding: 0 20px;
  margin-bottom: 10px;
  display: flex;

  div:nth-child(1) {
    margin-right: 8px;
  }

  p::after {
    background-color: ${(props) => props.color};
    content: ".";
    border-radius: 3px;
    height: 6px;
    width: 60px;
    color: transparent;
    overflow: hidden;
    margin-top: 10px;
    display: block;
    font-size: 16px;
  }

  p {
    color: #909096;
    padding: 0 10px 0 0;
    font-weight: 500;
    font-size: 16px;
    display: block;
    white-space: nowrap;
  }

  span {
    color: #4b565e;
    padding-bottom: 10px;
    font-weight: 500;
    display: inline;
  }

  div {
    width: 100%;
    display: flex;
    justify-content: start;
  }
`;

export const NameWrapper = styled.div``;

export const CardWrapper = styled(ColNoSpacing)`
  padding-left: 20px;
  padding-right: 20px;
`;
