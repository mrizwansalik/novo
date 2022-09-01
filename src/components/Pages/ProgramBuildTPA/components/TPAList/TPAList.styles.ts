import ColNoSpacing from "src/components/ColNoSpacing";
import RowNoSpacing from "src/components/RowNoSpacing";
import styled from "styled-components";

export const Container = styled(RowNoSpacing)<{
  withSpacing: boolean;
}>`
  padding-left: 5px;
  padding-right: 5px;
  padding-top: ${(props) => (props?.withSpacing ? "10px" : "0px")};
`;

export const CardWrapper = styled(ColNoSpacing)`
  padding-left: 15px;
  padding-right: 15px;
  margin-bottom: 20px;
`;

export const ProgramReference = styled.h2`
  padding-left: 15px;
  padding-right: 15px;

  font-size: 18px;
  line-height: 27px;
  color: #212135;
  font-weight: 700;
  margin-bottom: 24px;
`;
