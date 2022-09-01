import React, { useState } from "react";
import { cloneDeep } from "lodash";
import { observer } from "mobx-react";
import Icon from "src/components/Icon";
import useStore from "src/utils/useStore";
import { IWorkerList, IWorker } from "../../utils";
import EmployeeProfileModal from "../EmployeeProfileModal";
import {
  Container,
  ListTitle,
  StyledCheckbox,
  StyledIcon,
  EmptyList,
  ListItem,
  WorkerInfoContainer,
  WorkerName,
  Email,
  ProfileButton,
  Status,
} from "./styles";
const WorkerList = (props: IWorkerList) => {
  const { title, workerList, submissionType } = props;
  const [isEmployeeProfileModalOpen, setIsEmployeeProfileModalOpen] = useState(
    false
  );
  const [selectedWorker, setSelectedWorker] = useState<IWorker>();
  const { healthHistoryStore } = useStore();
  const { selectedWorkers } = healthHistoryStore;

  function toggle() {
    setIsEmployeeProfileModalOpen((currentValue) => !currentValue);
  }
  function handleProfileButton(profileInfo: IWorker) {
    setSelectedWorker(profileInfo);
    toggle();
  }
  function getStatusComponent(status: string) {
    switch (status) {
      case "accepted":
        return (
          <Status status="accepted">
            <Icon iconName="tick64px-white.png" size={20} /> Accepted
          </Status>
        );
      case "rejected":
        return (
          <Status status="rejected">
            <Icon iconName="x-no.png" size={20} /> Rejected
          </Status>
        );
      case "pending":
        return (
          <Status status="pending">
            <Icon iconName="clock-white.png" size={14} />
            &nbsp;Pending
          </Status>
        );
      case "waived":
        return <Status status="waived">Waiving</Status>;
      default:
    }
  }
  function onSelectAll(isSelectAll: boolean) {
    const selected = cloneDeep(selectedWorkers);
    if (isSelectAll) {
      workerList.forEach((document) => {
        selected[document.id] = true;
      });
    } else {
      workerList.forEach((document) => {
        selected[document.id] = false;
      });
    }
    healthHistoryStore.setSelectedWorker(selected);
  }

  function onSelectDocument(documentId: string, isSelect: boolean) {
    const selected = cloneDeep(selectedWorkers);
    if (isSelect) {
      selected[documentId] = true;
    } else {
      selected[documentId] = false;
    }
    healthHistoryStore.setSelectedWorker(selected);
  }
  return (
    <Container>
      <ListTitle>
        <StyledCheckbox
          onClick={(e) => {
            onSelectAll(e.currentTarget.checked);
          }}
        />
        <StyledIcon iconName="grey-flag.png" size={24} />
        {title}
      </ListTitle>
      {Array.isArray(workerList) && workerList.length > 0 ? (
        workerList.map((item, index) => (
          <ListItem key={index}>
            <StyledCheckbox
              checked={selectedWorkers[item.id]}
              onClick={(e) =>
                onSelectDocument(item.id, e.currentTarget.checked)
              }
            />
            <WorkerInfoContainer>
              <WorkerName>{item.name}</WorkerName>
              <Email href={`mailto:${item.email}`}>{item.email}</Email>
              {item.status && getStatusComponent(item.status)}
            </WorkerInfoContainer>
            <ProfileButton
              iconName="blue-circle-arrow-right.png"
              size={24}
              onClick={() => handleProfileButton(item)}
            />
          </ListItem>
        ))
      ) : (
        <EmptyList>None</EmptyList>
      )}
      <EmployeeProfileModal
        isOpen={isEmployeeProfileModalOpen}
        toggle={toggle}
        data={selectedWorker}
        submissionType={submissionType}
      />
    </Container>
  );
};

export default observer(WorkerList);
