import React, { useEffect, useState } from "react";
import { cloneDeep } from "lodash";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { updateProspectDetails } from "src/api/prospects";
import routes from "src/routes";
import { IParamTypes } from "src/types";
import useStore from "src/utils/useStore";
import EditClaimsModal from "../EditClaimsModal";
import {
  TitleContainer,
  Title,
  LinkToPHQs,
  EditClaimsButton,
  ContentContainer,
  TabsContainer,
  TabItem,
} from "./styles";
import { generateTabRoutes } from "./utils";
interface IClaimsDataContentLayoutProps {
  children?: React.ReactChild;
}

const ClaimsDataContentLayout = (props: IClaimsDataContentLayoutProps) => {
  const { children } = props;
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { benefitStore, brokerProspectsListStore } = useStore();
  const history = useHistory();
  const { pathname } = useLocation();
  const { brokerageId, prospectId } = useParams<IParamTypes>();
  const [isLoading, setIsLoading] = useState(true);
  const { currentProspect } = brokerProspectsListStore;
  function toggle() {
    setIsEditModalOpen(!isEditModalOpen);
  }
  const tabsInfo = generateTabRoutes(prospectId);
  async function changeToPhqs() {
    const currentProspectNeedUpdate = cloneDeep(currentProspect);
    currentProspectNeedUpdate.census_data.health_history_skipped = false;
    currentProspectNeedUpdate.census_data.health_history_type = "phqs";

    await updateProspectDetails(currentProspectNeedUpdate, prospectId);
    await Promise.all([
      brokerProspectsListStore.setCurrentProspect(prospectId),
      brokerProspectsListStore.setCurrentProspectProgress(prospectId),
    ]);
    history.push(
      routes.dashboard.brokerage.prospects.prospectId.phqs.getValue(prospectId)
    );
  }
  useEffect(() => {
    (async () => {
      await Promise.all([benefitStore.getClaimsDetail(prospectId)]);
      setIsLoading(false);
    })();
  }, []);
  return (
    <div>
      <TitleContainer>
        <Title>
          Claims
          <LinkToPHQs onClick={changeToPhqs}>(use PHQs instead)</LinkToPHQs>
        </Title>
        <EditClaimsButton label="Edit Claims" onClick={() => toggle()} />
        <EditClaimsModal isOpen={isEditModalOpen} toggle={toggle} />
      </TitleContainer>
      <TabsContainer>
        {tabsInfo.map((item) => (
          <TabItem
            to={item.route}
            key={item.route}
            isActive={pathname.includes(item.slug)}
          >
            {item.title}
          </TabItem>
        ))}
      </TabsContainer>
      <ContentContainer>{!isLoading && children}</ContentContainer>
    </div>
  );
};
export default ClaimsDataContentLayout;
