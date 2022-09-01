import React from "react";
import { INavbar } from "../../interfaces/common";
import OptionCard from "./components/OptionCard";
import { Container } from "./styles";

export interface IHorizontalNavbarProps {
  navbarList: INavbar[];
}

const HorizontalNavbar = (props: IHorizontalNavbarProps) => {
  const { navbarList = [] } = props;

  return (
    <Container>
      {Array.isArray(navbarList) &&
        navbarList.map((navbar: INavbar, index: number) => (
          <OptionCard key={index} {...navbar} />
        ))}
    </Container>
  );
};

export default HorizontalNavbar;
