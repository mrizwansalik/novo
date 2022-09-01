import React from "react";
import { Container, DropdownStyle } from "./styles";

interface IDropdownContentProps {
  children: React.ReactNode;
}

const DropdownContent = (props: IDropdownContentProps) => {
  const { children } = props;

  return (
    <Container>
      <DropdownStyle>{children}</DropdownStyle>
    </Container>
  );
};

export default DropdownContent;
