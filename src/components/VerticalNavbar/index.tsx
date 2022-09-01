import React from "react";
import { INavbar } from "../../interfaces/common";
import OptionCard from "./components/OptionCard";
import { Container } from "./styles";

export interface IVerticalNavbarProps {
  navbarList: INavbar[];
}

const VerticalNavbar = (props: IVerticalNavbarProps) => {
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

export default VerticalNavbar;
