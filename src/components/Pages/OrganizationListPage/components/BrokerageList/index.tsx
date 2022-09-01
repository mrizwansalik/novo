import { observer } from "mobx-react";
import useStore from "../../../../../utils/useStore";
import OrganizationCard from "../OrganizationCard";
import { Container } from "./styles";
const BrokerageList = () => {
  const { orgStore } = useStore();
  const { orgDisplayList } = orgStore;
  return (
    <Container>
      {Array.isArray(orgDisplayList) &&
        orgDisplayList.map((item, index) => (
          <OrganizationCard data={item} key={index} />
        ))}
    </Container>
  );
};

export default observer(BrokerageList);
