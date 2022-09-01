import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Collapse } from "reactstrap";
import ColNoSpacing from "src/components/ColNoSpacing";
import { ITpa } from "src/interfaces/benefit";
import useStore from "src/utils/useStore";
import Contents from "./components/Contents";
import Header from "./components/Header";
import { Container } from "./programCard.styles";

interface ITpaCardProps {
  tpa: ITpa;
}

const TpaCard = (props: ITpaCardProps) => {
  const { tpa } = props;
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const { programBuildTpaStore } = useStore();
  const { collapseAll } = programBuildTpaStore;

  useEffect(() => {
    if (isExpanded) {
      programBuildTpaStore.setCollapseAll(false);
    }
  }, [isExpanded]);

  useEffect(() => {
    if (collapseAll) {
      setIsExpanded(false);
    }
  }, [collapseAll]);

  return (
    <Container>
      <ColNoSpacing xl="12" lg="12" md="12" sm="12" xs="12">
        <Header
          tpa={tpa}
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
        />
      </ColNoSpacing>
      <ColNoSpacing xl="12" lg="12" md="12" sm="12" xs="12">
        <Collapse isOpen={isExpanded}>
          <Contents tpa={tpa} />
        </Collapse>
      </ColNoSpacing>
    </Container>
  );
};

export default observer(TpaCard);
