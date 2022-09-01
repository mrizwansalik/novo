import React from "react";
import { MenuArea, OverlayArea } from "./mobileDropDownMenu.style";

interface IMobileDropdownMenuProps {
  children: React.ReactNode;
  isMenuOpen: boolean;
  itemCount?: number;
  setMenuOpen: (isMenuOpen: boolean) => void;
}

const MobileDropdownMenu = (props: IMobileDropdownMenuProps) => {
  const { children, itemCount, isMenuOpen, setMenuOpen } = props;

  return (
    <>
      <OverlayArea isOpen={isMenuOpen} onClick={() => setMenuOpen(false)} />
      <MenuArea itemCount={itemCount} isOpen={isMenuOpen}>
        {children}
      </MenuArea>
    </>
  );
};
export default MobileDropdownMenu;
