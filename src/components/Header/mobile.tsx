import { useState } from "react";
import { horizontalAdminNavbarList, horizontalNavbarList } from "src/constants";
import { INavbar } from "../../interfaces/common";
import OptionCard from "../HorizontalNavbar/components/OptionCard";
import { ShowOnMobile } from "../Responsive";
import MobileDropdownMenu from "./components/MobileDropDownMenu";
import { DotMenu, HamburgerMenu, MobileContainer } from "./header.style";

interface IMobileHeaderProps {
  isGod?: boolean;
}
const MobileHeader = ({ isGod }: IMobileHeaderProps) => {
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);

  const navbarList = isGod ? horizontalAdminNavbarList : horizontalNavbarList;
  const menuItemCount = navbarList.length;

  return (
    <ShowOnMobile>
      <MobileContainer>
        <HamburgerMenu
          iconName="hamburger64px-blue.png"
          size={25}
          onClick={() => setMenuOpen(!isMenuOpen)}
        />
        <DotMenu />
      </MobileContainer>
      <MobileDropdownMenu
        itemCount={menuItemCount}
        isMenuOpen={isMenuOpen}
        setMenuOpen={setMenuOpen}
      >
        <>
          {navbarList.map((navbar: INavbar, index: number) => (
            <OptionCard key={index} {...navbar} />
          ))}
        </>
      </MobileDropdownMenu>
    </ShowOnMobile>
  );
};
export default MobileHeader;
