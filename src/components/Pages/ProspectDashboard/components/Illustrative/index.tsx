import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { useParams } from "react-router";
import Icon from "src/components/Icon";
import { ITpa } from "src/interfaces/benefit";
import { IParamTypes } from "src/types";
import { checkCanBeUnderwritten } from "src/utils/prospectPrograms";
import useStore from "src/utils/useStore";
import Header from "./components/Header";
import TPALayout from "./components/TPALayout";
import { Container, Layout, NoProgramWrapper } from "./illustrative.styles";
import { shouldShowTpa } from "./utils";

const Illustrative = () => {
  const [showUnderwrittenPrograms, setShowUnderwrittenPrograms] = useState(
    false
  );
  const {
    workerStore,
    prospectDashboardStore,
    prospectProgramsStore,
  } = useStore();
  const { prospectId } = useParams<IParamTypes>();

  const { isGod } = workerStore;
  const { currentProspectProgress } = prospectDashboardStore;
  const {
    filterText,
    allProspectPrograms,
    programsByTpa,
  } = prospectProgramsStore;

  useEffect(() => {
    prospectProgramsStore.getProgramList(prospectId);
  }, [prospectId]);

  useEffect(() => {
    if (Array.isArray(allProspectPrograms) && allProspectPrograms.length) {
      prospectProgramsStore.createTpaList();
    }
  }, [allProspectPrograms]);

  useEffect(() => {
    const canBeUnderwritten = checkCanBeUnderwritten(
      isGod,
      currentProspectProgress
    );
    prospectProgramsStore.setCanBeUnderwritten(canBeUnderwritten);
  }, [isGod, currentProspectProgress]);

  return (
    <Container>
      <Layout>
        <Header
          showUnderwrittenPrograms={showUnderwrittenPrograms}
          setShowUnderwrittenPrograms={setShowUnderwrittenPrograms}
        />
        {Array.isArray(programsByTpa) && programsByTpa.length ? (
          <>
            {programsByTpa.map((tpa: ITpa) => {
              if (shouldShowTpa(tpa, filterText)) {
                return <TPALayout key={tpa.id} tpa={tpa} />;
              }
              return <></>;
            })}
          </>
        ) : (
          <NoProgramWrapper>
            <h3>No program results.</h3>
            <Icon iconName="program_empty.jpg" width={222} height={245} />
          </NoProgramWrapper>
        )}
      </Layout>
    </Container>
  );
};

export default observer(Illustrative);
