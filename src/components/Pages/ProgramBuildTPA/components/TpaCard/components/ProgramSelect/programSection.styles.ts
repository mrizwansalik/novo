import RowNoSpacing from "src/components/RowNoSpacing";
import styled from "styled-components";

export const Container = styled(RowNoSpacing)`
  color: #4b565e;
  border-right: 1px solid #e3e9ec;
  padding-bottom: 12px;
  height: 100%;
`;

export const ScrollWrapper = styled.div`
  padding-left: 0px;
  padding-right: 0px;
`;

export const Option = styled.div<{ isActive?: boolean }>`
  font-weight: 500;
  font-size: 16px;
  color: #4b565e;
  cursor: pointer;
  padding: 10px 20px;

  background-color: ${(props) => (props?.isActive ? "#f7f7f7" : "#FFFFFF")};
  border-right: ${(props) => (props?.isActive ? "3px solid #0097f5" : "none")};
`;
