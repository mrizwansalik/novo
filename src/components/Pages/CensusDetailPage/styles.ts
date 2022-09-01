import InputGroup from "src/components/InputGroup";
import { ThemeColor } from "src/constants";
import styled from "styled-components";

export const Container = styled.div`
  padding-left: 15px;
  padding-right: 15px;
  font-family: "MuseoSans";
`;

export const TextInput = styled(InputGroup)`
  margin-bottom: 25px;

  label {
    margin-bottom: 16px;
  }

  input {
    height: 36px;
    font-size: 16px;
    font-weight: 300;
    line-height: 24px;
    color: ${ThemeColor.STEEL_GRAY};
    padding: 0 0 5px 0;
    border-top: none !important;
    border-left: none !important;
    border-right: none !important;
    border-bottom: 1px solid #c8c8c8 !important;
    border-radius: 0;
    width: 100%;
    box-shadow: none !important;
  }
`;
