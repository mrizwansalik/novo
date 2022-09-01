import { Fragment, useEffect, useRef, useState } from "react";
import { get } from "lodash";
import { observer } from "mobx-react";
import Icon from "src/components/Icon";
import useStore from "src/utils/useStore";
import { userProfileNavbarList } from "../../../../constants";
import { INavbar } from "../../../../interfaces/common";
import DropdownContent from "../DropdownContent";
import Option from "../Option";
import {
  Container,
  NameSection,
  DropdownIcon,
  OrganizationName,
  OrganizationType,
  IconSection,
  DesktopWrapper,
  MobileWrapper,
} from "./styles";

const UserDropdown = () => {
  const optionRef = useRef(null);
  const [open, setOpen] = useState<boolean>(false);

  const { workerStore, orgStore } = useStore();
  const { currentWorker } = workerStore;
  const { orgDetail } = orgStore;
  const workerFirstName = get(currentWorker, "first_name", "");
  const workerLastName = get(currentWorker, "last_name", "");
  const workerShortName = workerFirstName[0] + workerLastName[0];
  const orgName = get(orgDetail, "name", "");

  function handleClickOutside(event: { target: EventTarget }): void {
    if (optionRef?.current && !optionRef?.current?.contains(event?.target)) {
      setOpen(false);
    }
  }

  useEffect(() => {
    document?.addEventListener("click", handleClickOutside, true);
    return () => {
      document?.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <Fragment>
      <div ref={optionRef}>
        <Container onClick={() => setOpen(!open)}>
          <DesktopWrapper>
            <IconSection>{workerShortName}</IconSection>
            <NameSection>
              <OrganizationType>{workerFirstName}</OrganizationType>
              <OrganizationName>{orgName}</OrganizationName>
            </NameSection>
            <DropdownIcon iconName="downChevronArrow64px-blue.png" />
          </DesktopWrapper>
          <MobileWrapper>
            <Icon iconName="vertical-dots-32px-blue.png" size={18} />
          </MobileWrapper>
        </Container>
        {open && (
          <DropdownContent>
            {userProfileNavbarList.map((navbar: INavbar, index: number) => (
              <Option key={index} navbar={navbar} setOpen={setOpen} />
            ))}
          </DropdownContent>
        )}
      </div>
    </Fragment>
  );
};

export default observer(UserDropdown);
