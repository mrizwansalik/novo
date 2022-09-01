import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { ISideMenu, ISideMenuChildren } from "../../interfaces";
import CheckMark from "../CheckMark";
import SubMenu from "../SubMenu";
import {
  Container,
  LabelSection,
  Title,
  TitleText,
  IconSection,
  ArrowIcon,
  CollapseSection,
} from "./menuCard.styles";

interface IMenuCardProps {
  sideMenuDetail: ISideMenu;
  onDelete: (sideMenuChildren: ISideMenuChildren) => void;
}

const MenuCard = (props: IMenuCardProps) => {
  const { sideMenuDetail, onDelete } = props;
  const history = useHistory();
  const isActive: boolean = history?.location?.pathname?.includes(
    sideMenuDetail?.routeUrl
  );
  const [collapsed, setCollapsed] = useState<boolean>(false);

  useEffect(() => {
    setCollapsed(isActive);
  }, [isActive]);

  return (
    <Container
      onClick={() => history.push(sideMenuDetail?.routeUrl)}
      active={isActive}
    >
      <LabelSection>
        <Title>
          <CheckMark checked={sideMenuDetail?.checked} />
          <TitleText>{sideMenuDetail?.title}</TitleText>
        </Title>
        <IconSection
          onClick={(event) => {
            event?.stopPropagation();
            event?.nativeEvent?.stopImmediatePropagation();
            setCollapsed(!collapsed);
          }}
        >
          <ArrowIcon
            iconName={
              collapsed
                ? "upChevronArrow64px-blue.png"
                : "downChevronArrow64px-blue.png"
            }
          />
        </IconSection>
      </LabelSection>
      <CollapseSection isOpen={collapsed}>
        {Array.isArray(sideMenuDetail?.children) &&
          sideMenuDetail?.children?.map(
            (sideMenuChildren: ISideMenuChildren, index: number) => (
              <SubMenu
                onDelete={onDelete}
                sideMenuChildren={sideMenuChildren}
                key={index}
              />
            )
          )}
      </CollapseSection>
    </Container>
  );
};

export default MenuCard;
