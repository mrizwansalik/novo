import React from "react";
import { useLocation } from "react-router";
import { subHeaderItems } from "./constants";
import { ComponentContainer, GodButton, HeaderItem } from "./subHeader.style";
const SubHeader = () => {
  const { pathname } = useLocation();
  return (
    <>
      <ComponentContainer>
        <GodButton>God Mode</GodButton>
        {subHeaderItems.map((item) => (
          <HeaderItem
            key={item.title}
            to={item.url}
            isActive={pathname === item.url}
          >
            {item.title}
          </HeaderItem>
        ))}
      </ComponentContainer>
    </>
  );
};
export default SubHeader;
