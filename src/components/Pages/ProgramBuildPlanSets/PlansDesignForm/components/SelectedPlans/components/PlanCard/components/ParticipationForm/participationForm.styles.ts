import Select from "react-select";
import ColNoSpacing from "src/components/ColNoSpacing";
import Icon from "src/components/Icon";
import RowNoSpacing from "src/components/RowNoSpacing";
import styled from "styled-components";

export const Container = styled(RowNoSpacing)``;

export const TitleWrapper = styled(ColNoSpacing)``;

export const CommonLabel = styled.div`
  font-size: 16px;
  line-height: 24px;
  color: #212135;
  font-weight: 500;
`;

export const InputWrapper = styled(ColNoSpacing)``;

export const CommonInputField = styled.div`
  width: 100px;
  font-size: 16px;
  line-height: 24px;
  color: #212135;
  font-size: 16px;
  font-weight: bold;
  line-height: 30px;

  margin-right: 18px;
`;

export const CommonInputFieldLabel = styled.div``;

export const CommonInput = styled.input`
  font-size: 16px;
  font-weight: bold;
  height: 40px;
  border: 1px solid #e3e9ec !important;
  border-radius: 3px;
  padding: 20px 10px;
  width: 80%;
  background-color: transparent;

  &:focus {
    border-color: #ffa500;
    box-shadow: 0 0 6px 0 rgb(33 33 53 / 0.15);
  }
`;

export const FormGroup = styled(ColNoSpacing)`
  display: flex;
  flex-direction: row;
  margin-top: 16px;
`;

export const EditWrapper = styled(ColNoSpacing)`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
`;

export const EditIcon = styled(Icon)`
  img {
    width: 24px;
    height: 24px;
    margin-bottom: 8px;
    opacity: 0.7;

    &:hover {
      opacity: 1;
      cursor: pointer;
    }
  }
`;

export const Divider = styled.hr`
  margin-top: 26px;
  margin-bottom: 21px;
`;

export const CommonSelect = styled(Select)`
  > div {
    background-color: white !important;
  }
`;

export const MediumSpacing = styled.div`
  margin-bottom: 16px;
`;
