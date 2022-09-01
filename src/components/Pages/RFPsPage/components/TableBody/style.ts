import { Badge } from "reactstrap";
import styled from "styled-components";
import { ThemeColor } from "../../../../../constants/index";
export const AddButton = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;
  border: 1px solid ${ThemeColor.MYSTIC};
  align-items: center;
  padding: 2px 12px;
  border-radius: 3px;
  width: fit-content;
`;
export const Avatarstyle = styled.div`
  width: 90px;
`;
export const IconSection = styled(Badge)`
  position: relative;
  display: inline-block;
  height: 26px;
  width: 26px;
  border-radius: 13px;
  border: 1px solid #fff;
  color: #fff;
  font-size: 11px;
  line-height: 21px;
  font-weight: 700;
  text-align: center;
  vertical-align: middle;
  padding-top: 2px;
  padding-left: 5%;
  margin-left: -4px;
  cursor: pointer;
  background-color: ${ThemeColor.AZURE_RADIANCE};
`;
