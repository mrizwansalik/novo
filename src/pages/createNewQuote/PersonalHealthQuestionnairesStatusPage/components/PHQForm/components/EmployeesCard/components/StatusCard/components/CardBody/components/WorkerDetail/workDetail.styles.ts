import { Input } from "reactstrap";
import Icon from "src/components/Icon";
import { ThemeColor } from "src/constants";
import { DocumentSubmitStatus } from "src/constants/enum/document";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
`;

export const InputSection = styled(Input)`
  cursor: pointer;
  margin-right: 8px;
`;

export const InformationSection = styled.div`
  flex: 1;
`;

export const WorkerName = styled.div`
  color: ${ThemeColor.STEEL_GRAY};
  font-size: 18px;
  line-height: 24px;
  font-weight: 500;
`;

export const WorkerEmail = styled.a`
  color: ${ThemeColor.RIVER_BED};
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    color: ${ThemeColor.RIVER_BED};
  }
`;

export const StatusBadge = styled.div<{ submitStatus: DocumentSubmitStatus }>`
  display: flex;
  flex-direction: row;
  align-items: center;

  margin-top: 8px;

  width: fit-content;
  border-radius: 2px;
  padding-left: 8px;
  padding-right: 8px;

  ${(props) =>
    props?.submitStatus === DocumentSubmitStatus.PENDING &&
    "background-color: #0097f5;"}
  ${(props) =>
    props?.submitStatus === DocumentSubmitStatus.REJECTED &&
    "background-color: #e84c3d;"}
  ${(props) =>
    props?.submitStatus === DocumentSubmitStatus.ACCEPTED &&
    "background-color: #00aa00;"}

  img {
    width: 12px;
    height: 12px;
  }

  span {
    margin-left: 8px;
    color: ${ThemeColor.WHITE_COLOR};
    font-size: 12px;
    line-height: 14px;
  }
`;

export const ArrowSection = styled(Icon)`
  cursor: pointer;
  img {
    width: 24px;
    height: 24px;
  }
`;
