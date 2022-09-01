import { horizontalAdminNavbarList, horizontalNavbarList } from "src/constants";
import HorizontalNavbar from "../HorizontalNavbar";
import UserDropdown from "./components/UserDropdown";
import {
  DesktopContainer,
  NavigationSection,
  UserProfileSection,
} from "./header.style";

interface IDesktopHeaderProps {
  isGod?: boolean;
}
const DesktopHeader = ({ isGod }: IDesktopHeaderProps) => {
  const navbarList = isGod ? horizontalAdminNavbarList : horizontalNavbarList;

  return (
    <DesktopContainer>
      <NavigationSection>
        <HorizontalNavbar navbarList={navbarList} />
      </NavigationSection>
      <UserProfileSection>
        <UserDropdown />
      </UserProfileSection>
    </DesktopContainer>
  );
};
export default DesktopHeader;
