import { Row, Col } from "reactstrap";
import styled from "styled-components";
export const Container = styled(Row)`
  color: #475259;
  font-weight: 500;
`;

export const PHQCard = styled.div`
  padding: 10px 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  align-items: center;
  border-radius: 3px;
  border: 1px solid rgb(227, 233, 236);
  :hover {
    box-shadow: 0 0 6px 0 rgba(33, 33, 53, 0.15);
    cursor: pointer;
  }
`;

export const PHQImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: contain;
`;
export const PHQName = styled.div`
  padding-top: 15px;
  text-align: center;
`;

export const StyledCol = styled(Col)`
  padding: 12px;
`;
