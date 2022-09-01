import React, { useEffect } from "react";
import { observer } from "mobx-react";
import useStore from "src/utils/useStore";
import ActionSheet from "../ActionSheet";
import WorkerList from "../WorkerList";
import { Container, WorkerContainer, StyledCol } from "./styles";
import { processUsers } from "./utils";
const EmployeesTab = () => {
  const { healthHistoryStore } = useStore();

  const {
    workerList,
    documentList,
    waivedUserList,
    awaitingWorkers,
    unsubmittedWorkers,
    submittedWorkers,
  } = healthHistoryStore;
  async function initData() {
    const {
      awaitingWorkers,
      unsubmittedWorkers,
      submittedWorkers,
      workersHasSignedDocuments,
    } = processUsers(workerList, documentList, waivedUserList);
    healthHistoryStore.setAwaitingWorkers(awaitingWorkers);
    healthHistoryStore.setUnsubmittedWorkers(unsubmittedWorkers);
    healthHistoryStore.setSubmittedWorkers(submittedWorkers);
    healthHistoryStore.setWorkersHasSignedDocuments(workersHasSignedDocuments);
  }

  useEffect(() => {
    initData();
  }, [workerList, documentList]);
  return (
    <Container>
      <ActionSheet />
      <WorkerContainer>
        <StyledCol xs={12} md={4}>
          <WorkerList
            title="Awaiting User"
            workerList={awaitingWorkers}
            submissionType="awaiting"
          />
        </StyledCol>
        <StyledCol xs={12} md={4}>
          <WorkerList
            title="Submit Forms"
            workerList={unsubmittedWorkers}
            submissionType="unsubmitted"
          />
        </StyledCol>
        <StyledCol xs={12} md={4}>
          <WorkerList
            title="Submitted"
            workerList={submittedWorkers}
            submissionType="submitted"
          />
        </StyledCol>
      </WorkerContainer>
    </Container>
  );
};

export default observer(EmployeesTab);
