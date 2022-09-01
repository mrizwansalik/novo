import Icon from "src/components/Icon";
import InputCheckbox from "src/components/InputCheckbox";
import { ThemeColor } from "src/constants";
import styled from "styled-components";

interface IStatusProps {
  status?: string;
}

const handleColorType = (status) => {
  switch (status) {
    case "accepted":
      return "color: #ffffff; background-color: #00aa00;";
    case "rejected":
      return "color: #ffffff; background-color: #e84c3d;";
    case "pending":
      return "color: #ffffff; background-color: #0097f5; padding: 4px 8px 4px 4px;";
    case "waived":
      return "color: #4B565E; background-color: #e3e9ec; padding: 4px 8px;";
    default:
  }
};

export const Container = styled.div`
  border: 1px solid rgb(200, 200, 200);
  border-radius: 3px;
`;

export const ListTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding: 15px 14px 22px 15px;
  color: ${ThemeColor.STEEL_GRAY};
  font-size: 18px;
  line-height: 27px;
  background-color: #f5f9fc;
  text-align: center;
`;

export const StyledCheckbox = styled(InputCheckbox)`
  width: 16px;
  display: inline;
  label {
    display: none;
  }
`;

export const StyledIcon = styled(Icon)`
  margin: 0px 12px;
  cursor: pointer;
`;

export const EmptyList = styled.div`
  color: ${ThemeColor.STEEL_GRAY};
  font-size: 18px;
  line-height: 24px;
  font-weight: 500;
  padding: 16px;
  border-bottom: 1px solid rgb(227, 233, 236);
`;

export const ListItem = styled.div`
  padding: 16px;
  border-bottom: 1px solid rgb(227, 233, 236);
  display: flex;
  flex-direction: row;
`;

export const WorkerInfoContainer = styled.div`
  margin: 0px 8px;
  flex: 1;
  overflow-x: auto;
`;

export const WorkerName = styled.div`
  color: ${ThemeColor.STEEL_GRAY};
  font-size: 18px;
  line-height: 24px;
  font-weight: 500;
`;

export const Email = styled.a`
  color: ${ThemeColor.RIVER_BED};
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  text-decoration: none;
  display: block;
  :hover {
    color: ${ThemeColor.RIVER_BED};
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const ProfileButton = styled(Icon)`
  align-self: center;
  cursor: pointer;
`;

export const Status = styled.div<IStatusProps>`
  font-size: 12px;
  font-weight: 300;
  line-height: 14px;
  padding: 4px 8px 4px 1px;
  display: flex;
  flex-direction: row;
  border-radius: 2px;
  width: fit-content;
  height: 22px;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
  ${(props) => handleColorType(props.status)}
`;
