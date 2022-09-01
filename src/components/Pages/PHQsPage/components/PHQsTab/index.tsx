import React, { useEffect } from "react";
import { observer } from "mobx-react";
import defaultLogo from "src/assets/images/default_logo_x2.png";
import useStore from "src/utils/useStore";
import { Container, PHQCard, PHQImage, PHQName, StyledCol } from "./styles";
const PHQsTab = () => {
  const { healthHistoryStore } = useStore();
  const { displayPHQs } = healthHistoryStore;

  useEffect(() => {
    healthHistoryStore.getDisplayPhqList();
  }, []);

  return (
    <Container>
      {displayPHQs.map((item, index) => (
        <StyledCol xs={12} sm={6} lg={4} xl={3}>
          <PHQCard onClick={() => window.open(item.file)} key={index}>
            <PHQImage src={item.carrier.picture_thumbnail_256 || defaultLogo} />
            <PHQName>{item.name}</PHQName>
          </PHQCard>
        </StyledCol>
      ))}
    </Container>
  );
};

export default observer(PHQsTab);
