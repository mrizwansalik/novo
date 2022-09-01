import React from "react";
import { useHistory } from "react-router";
import { INavbar } from "../../../../interfaces/common";
import { IHistory } from "../../../../types";
import { OptionContainer, NameStyle } from "./styles";

interface IOptionProps {
  navbar: INavbar;
  setOpen: (open: boolean) => void;
}

const Option = (props: IOptionProps) => {
  const { navbar, setOpen } = props;
  const history = useHistory<IHistory>();

  return (
    <OptionContainer
      onClick={() => {
        if (navbar.title === "Signout") {
          localStorage.clear();
          history.push(navbar.routingUrl);
          setOpen(false);
          return;
        }
        history.push(navbar.routingUrl);
        setOpen(false);
      }}
    >
      <NameStyle>{navbar.title}</NameStyle>
    </OptionContainer>
  );
};

export default Option;
