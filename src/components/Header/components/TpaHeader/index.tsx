import React from "react";
import { useLocation, useParams, useHistory } from "react-router";
import routes from "src/routes";
import { IParamTypes } from "src/types";
import { ComponentContainer, GodButton, HeaderItem, LeftArrow } from "./style";
const TpaSubHeader = (props) => {
  const { title, url } = props;
  const { pathname } = useLocation();
  const { tpaId } = useParams<IParamTypes>();
  const history = useHistory();

  return (
    <>
      {!tpaId ? (
        ""
      ) : (
        <ComponentContainer>
          <LeftArrow
            onClick={() => {
              history.goBack();
            }}
            iconName="leftChevronArrow32px-white-thick.png"
          />

          {title && <GodButton>{title}</GodButton>}

          <HeaderItem
            onClick={() => {
              history.push(
                routes.dashboard.god.tpa.programingredients.getValue(tpaId)
              );
            }}
          >
            Program Ingredients
          </HeaderItem>
        </ComponentContainer>
      )}
    </>
  );
};
export default TpaSubHeader;
