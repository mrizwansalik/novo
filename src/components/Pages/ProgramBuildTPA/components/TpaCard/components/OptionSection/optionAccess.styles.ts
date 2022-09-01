import { Input } from "reactstrap";
import RowNoSpacing from "src/components/RowNoSpacing";
import styled from "styled-components";

export const Container = styled(RowNoSpacing)`
  height: 100%;
  border-right: 1px solid #e3e9ec;
  padding-bottom: 12px;
  align-content: flex-start;
`;

export const Title = styled.div`
  padding: 10px 20px;
  font-size: 16px;
  line-height: 24px;
  color: #212135;
  font-weight: 500;
`;

export const OptionContainer = styled.label<{ isBold: boolean }>`
  padding: 10px 20px;
  font-size: 14px;
  line-height: 20px;
  color: #4b565e;
  vertical-align: middle;
  cursor: pointer;
  display: flex;
  font-weight: ${(props) => (props?.isBold ? "600" : "normal")};

  input {
    margin-top: 0px;
    margin-right: 16px;
    width: 16px;
    height: 16px;
    min-width: 16px;
    min-height: 16px;

    &:disabled {
      background-color: #6d8491 !important;
      border-color: #6d8491;
      cursor: not-allowed;
      pointer-events: all;
      opacity: 1;
    }
  }
`;

export const Checkbox = styled(Input)``;

export const ScrollWrapper = styled.div`
  padding-left: 0px;
  padding-right: 0px;
`;
