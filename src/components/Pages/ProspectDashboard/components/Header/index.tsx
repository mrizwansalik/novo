import { useLocation, useParams } from "react-router-dom";
import { IParamTypes } from "src/types";
import { HeaderContainer, HeaderLayout, TabItem } from "./header.styles";
import { getTabs } from "./utils";

const Header = () => {
  // TODO: need god logic here
  // const { workerStore } = useStore();
  // const { isGod } = workerStore;
  const { brokerageId, prospectId, planId = "" } = useParams<IParamTypes>();
  const { pathname } = useLocation();

  const tabs = getTabs(true, brokerageId, prospectId);

  function getActiveStatus(keyword: string): boolean {
    if (pathname.includes(keyword)) {
      return true;
    }
    return false;
  }

  return (
    <HeaderContainer>
      <HeaderLayout xl="12" lg="12" md="12" sm="12" xs="12">
        {tabs.map((tab) => {
          return (
            <TabItem
              to={tab.route}
              key={tab.keyword}
              isActive={getActiveStatus(tab.keyword)}
            >
              {tab.label}
            </TabItem>
          );
        })}
      </HeaderLayout>
    </HeaderContainer>
  );
};

export default Header;
