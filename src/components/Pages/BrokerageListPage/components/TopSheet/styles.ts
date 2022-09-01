import styled from "styled-components";
import InputGroup from "../../../../InputGroup";

export const Container = styled.div`
  padding-top: 40px;
  padding-left: 24px;
  padding-right: 24px;
  margin-bottom: 15px;
`;

export const TopSheetTitle = styled.h1`
  margin-bottom: 25px;
  font-size: 44px;
  line-height: 54px;
  font-weight: 300;
`;

export const TopSheetInputField = styled(InputGroup)`
  input {
    background-color: #f6f6f6f6;
  }
  input:focus {
    background-color: #f6f6f6f6;
  }
`;
