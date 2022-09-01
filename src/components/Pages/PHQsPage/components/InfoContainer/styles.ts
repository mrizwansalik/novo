import Icon from "src/components/Icon";
import { ThemeColor } from "src/constants";
import styled from "styled-components";

export const StatusInfoContainer = styled.div`
  color: #475259;
  font-weight: 500;
`;

export const Description = styled.div``;

export const Instruction = styled.div`
  margin-top: 12px;
`;

export const PublicShareLink = styled.span`
  color: ${ThemeColor.AZURE_RADIANCE};
  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const Link = styled.p`
  margin-bottom: 12px;
  font-size: 14px;
  overflow-x: auto;
`;

export const ReferralLink = styled.a`
  text-decoration: none;
  color: #424152;
  :hover {
    cursor: pointer;
    color: #424152;
    text-decoration: underline;
  }
`;
export const LinkIcon = styled(Icon)`
  display: inline;
  margin-top: 6px;
  margin-right: 8px;
`;
