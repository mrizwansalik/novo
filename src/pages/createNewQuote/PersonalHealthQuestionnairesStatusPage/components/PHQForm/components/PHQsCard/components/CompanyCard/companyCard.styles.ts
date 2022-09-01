import Image from "src/components/Image";
import { ThemeColor } from "src/constants";
import styled from "styled-components";

export const Container = styled.div`
  padding: 10px 30px;
  border: 1px solid ${ThemeColor.MYSTIC};
  border-radius: 3px;
  margin-left: 10px;
  margin-right: 10px;

  &:hover {
    box-shadow: 0 0 6px 0 rgb(33 33 53 / 15%);
  }
`;

export const Avatar = styled(Image)`
  img {
    width: 100%;
  }
`;

export const Label = styled.div`
  font-size: 16px;
  color: ${ThemeColor.RIVER_BED};
  text-align: center;
  padding: 15px 0 0 0;
  font-weight: 500;
`;
