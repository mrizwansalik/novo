import { observer } from "mobx-react";
import useStore from "../../../../../utils/useStore";
import OrganizationCard from "../OrganizationCard";
import { Container } from "./styles";
const BrokerageList = () => {
  const { brokerageListStore } = useStore();
  const { brokerageDisplayList } = brokerageListStore;
  return (
    <Container>
      {Array.isArray(brokerageDisplayList) &&
        brokerageDisplayList.map((item, index) => (
          <OrganizationCard data={item} key={index} />
        ))}
    </Container>
  );
};

export default observer(BrokerageList);
