import React, { Fragment } from "react";
import { observer } from "mobx-react";
import { useLocation, useHistory, useParams } from "react-router";
import { IParamTypes } from "src/types";
import useStore from "src/utils/useStore";
import SubHeader from "./components/SubHeader";
import DesktopHeader from "./desktop";
import { Container, EmptyHeader, LogoSection } from "./header.style";
import MobileHeader from "./mobile";

const Header = () => {
  const { tpaId } = useParams<IParamTypes>();
  const history = useHistory();
  const { workerStore } = useStore();
  const { isGod } = workerStore;

  const { pathname } = useLocation();
  const isInGodPage = pathname.includes("god");

  const shouldShowSubHeader = isGod && isInGodPage;
  // const isTPAProgramIngredient;

  return (
    <Fragment>
      <Container>
        <LogoSection
          onClick={() => history.push("/dashboard/god/org/list")}
          imageName="badge-bright-70px.png"
        ></LogoSection>
        <DesktopHeader isGod={isGod} />
        <MobileHeader isGod={isGod} />
      </Container>
      {shouldShowSubHeader && !tpaId ? <SubHeader /> : <EmptyHeader />}
    </Fragment>
  );
};

export default observer(Header);
