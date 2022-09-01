import { Fragment, useEffect, useState } from "react";
import { get } from "lodash";
import { cloneDeep } from "lodash";
import { observer } from "mobx-react";
import { useHistory, useParams } from "react-router-dom";
import { updateProspectDetails } from "src/api/prospects";
import PHQStatus from "src/components/Pages/PHQsPage/components/PHQStatus";
import routes from "src/routes";
import { IParamTypes } from "src/types";
import { dynamicNavbar } from "src/utils/navbarList";
import useStore from "src/utils/useStore";
import Header from "../../components/Header";
import PHQsPage from "../../components/Pages/PHQsPage";
import VerticalNavbar from "../../components/VerticalNavbar";
import { navbarList } from "../../constants";
import {
  Container,
  MainContent,
  SideBar,
  TitleContainer,
  Title,
  LinkToClaimsData,
} from "./styles";

const PHQsLayout = () => {
  const { brokerProspectsListStore, orgStore } = useStore();
  const {
    setCurrentProspect,
    setCurrentProspectProgress,
    currentProspectProgress,
    currentProspect,
  } = brokerProspectsListStore;
  const { orgDetail } = orgStore;
  const { prospectId } = useParams<IParamTypes>();
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  async function changeToClaims() {
    const currentProspectNeedUpdate = cloneDeep(currentProspect);
    currentProspectNeedUpdate.census_data.health_history_skipped = false;
    currentProspectNeedUpdate.census_data.health_history_type = "claims";

    await updateProspectDetails(currentProspectNeedUpdate, prospectId);
    await Promise.all([
      brokerProspectsListStore.setCurrentProspect(prospectId),
      brokerProspectsListStore.setCurrentProspectProgress(prospectId),
    ]);
    history.push(
      routes.dashboard.brokerage.prospects.prospectId.claims.documents.getValue(
        prospectId
      )
    );
  }

  useEffect(() => {
    (async () => {
      await Promise.all([
        setCurrentProspect(prospectId),
        setCurrentProspectProgress(prospectId),
      ]);
      setIsLoading(false);
    })();
  }, []);

  return (
    <Fragment>
      <Header />
      <Container>
        <SideBar>
          <VerticalNavbar
            navbarList={dynamicNavbar(
              get(orgDetail, "id"),
              navbarList,
              prospectId,
              currentProspectProgress
            )}
          />
        </SideBar>
        <MainContent>
          <TitleContainer>
            <Title>
              PHQs
              <LinkToClaimsData onClick={changeToClaims}>
                (use Claims Data instead)
              </LinkToClaimsData>
            </Title>
            <PHQStatus />
          </TitleContainer>
          {!isLoading && <PHQsPage />}
        </MainContent>
      </Container>
    </Fragment>
  );
};

export default observer(PHQsLayout);
