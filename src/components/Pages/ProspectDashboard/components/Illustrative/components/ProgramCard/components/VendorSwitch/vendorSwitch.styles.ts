import ColNoSpacing from "src/components/ColNoSpacing";
import Icon from "src/components/Icon";
import { ThemeColor } from "src/constants";
import styled from "styled-components";

export const TitleSection = styled(ColNoSpacing)`
  display: flex;
  justify-content: center;
  cursor: default;
  cursor: pointer;
`;

export const Title = styled.div`
  color: ${ThemeColor.AZURE_RADIANCE};
`;

export const SwitchButton = styled(Icon)<{ active: boolean }>`
  transform: ${(props) => (props?.active ? "scaleY(-1)" : "scaleY(1)")};
  margin-left: 8px;

  img {
    width: 12px;
    height: 12px;
    object-fit: contain;
  }
`;

export const Description = styled(ColNoSpacing)`
  text-align: center;
  color: ${ThemeColor.TOWER_GRAY};
  margin-bottom: 12px;
  cursor: pointer;
`;
