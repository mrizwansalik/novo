import { Col, Row } from "reactstrap";
import { ThemeColor } from "src/constants";
import styled from "styled-components";

interface IRowProps {
  isLastRow?: boolean;
}

export const PageContainer = styled.div``;

export const UploadTemplateForm = styled.form`
  max-width: 1080px;
  padding: 0 15px;
  width: 100%;
  margin: auto;
  box-sizing: border-box;
  position: relative;
`;

export const StyledRow = styled(Row)<IRowProps>`
  background-color: #fafafa;
  padding: 24px 12px;
  margin: 0;
  margin-bottom: ${(props) => (props.isLastRow ? "25px" : "0px")};
`;

export const StyledCol = styled(Col)`
  h2 {
    font-size: 18px;
    line-height: 27px;
    color: #212135;
    font-weight: 700;
    margin-bottom: 25px;
  }
`;

export const LinkWithIcon = styled.button`
  background: none !important;
  border: none;
  padding: 0 !important;
  height: 24px;
  font-size: 16px;
  line-height: 24px;
  color: ${ThemeColor.AZURE_RADIANCE} !important;
  font-weight: 700;
  cursor: pointer;
  text-decoration: none;
  display: flex;

  :hover {
    text-decoration: underline;
  }

  img {
    transform: scaleX(-1);
    margin-right: 7px;
    margin-bottom: 1px;
  }
`;

export const LightText = styled.div`
  font-size: 14px;
  font-weight: 300;
  line-height: 24px;
  color: #212135;
`;
