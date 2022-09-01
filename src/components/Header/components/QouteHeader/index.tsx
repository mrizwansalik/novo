import React from "react";
import { useLocation, useParams, useHistory } from "react-router";
import { IParamTypes } from "src/types";
import { ComponentContainer, GodButton, LeftArrow } from "../TpaHeader/style";
const TpaSubHeader = (props) => {
  const { title, url } = props;
  const { pathname } = useLocation();
  const { tpaId } = useParams<IParamTypes>();
  const history = useHistory();

  return (
    <ComponentContainer>
      {title && <GodButton>{title}</GodButton>}
      <LeftArrow
        onClick={() => {
          history.goBack();
        }}
        iconName="leftChevronArrow32px-white-thick.png"
      />
    </ComponentContainer>
  );
};
export default TpaSubHeader;
