import { useState } from "react";
import { observer } from "mobx-react";
import moment from "moment";
import { useParams } from "react-router";
import { IParamTypes } from "src/types";
import useStore from "src/utils/useStore";
import {
  HeaderLayout,
  ActionSheetContainer,
  HeaderContainer,
  InputLabel,
  TextBox,
  RightContainer,
  RightContainerSection,
  DueDateButton,
  RightContainerHeaders,
  Content,
  AddButton,
  AddButtonGroup,
  AddLabel,
  CancelButton,
  UpdateMenu,
  ContentHead,
  SearchInput,
  SearchIcon,
  MessageBox,
  BoxItem,
  ComposeButoom,
  UpdateButton,
} from "./style";

const EmptyMessage = {
  subject: "",
  message: "",
  sender: "",
};

const ActionSheet = () => {
  const { qouteRFPsStore, orgStore, workerStore } = useStore();
  const {
    qouteMessages,
    qouteRFPs,
    broker,
    createQouteMessage,
    createQouteMessageWithRfps,
  } = qouteRFPsStore;
  const [compose, setCompose] = useState(false);
  const [message, setMessage] = useState(EmptyMessage);
  const { prospectId, rfpId } = useParams<IParamTypes>();
  const { orgDetail } = orgStore;
  const { currentWorker } = workerStore;
  const rfp = qouteRFPs.find((item) => item.id === rfpId);

  const handleSaveAll = () => {
    const rfpIds = [];
    const res = qouteRFPs.map((item) => {
      rfpIds.push(item.id);
    });
    const data = {
      ...message,
      sender: localStorage.getItem("orgId"),
      all_rfp_ids: rfpIds,
    };
    createQouteMessageWithRfps(prospectId, rfpId, data);
    setCompose(false);
  };

  const handleSave = () => {
    const data = {
      ...message,
      sender: localStorage.getItem("orgId"),
    };
    createQouteMessage(prospectId, rfpId, data);
    setCompose(false);
  };
  return (
    <HeaderContainer>
      <UpdateMenu md={2}>
        <>
          <ContentHead md={12} style={{ padding: "10%" }}>
            <SearchInput placeholder="Search" />
            <SearchIcon size={18} iconName="spyglass.png" />
          </ContentHead>
          <div style={{ height: "86%" }}>
            {Array.isArray(qouteMessages) &&
              qouteMessages.map((item) => {
                return (
                  <MessageBox>
                    <BoxItem>{item?.created}</BoxItem>
                    <BoxItem>{item?.subject}</BoxItem>
                    <BoxItem>{item?.message}</BoxItem>
                  </MessageBox>
                );
              })}
          </div>
        </>

        <ComposeButoom md={12}>
          <UpdateButton onClick={() => setCompose(true)}>
            Compose Update
          </UpdateButton>
        </ComposeButoom>
      </UpdateMenu>
      <HeaderLayout md={10}>
        <HeaderContainer>
          <ContentHead
            md={12}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <BoxItem>From : {" Me"}</BoxItem>
            <BoxItem>
              <AddButton>
                <AddLabel>Download</AddLabel>
              </AddButton>
            </BoxItem>
          </ContentHead>
          <HeaderLayout md={9}>
            <ContentHead md={12}>
              Subject:
              {!compose ? (
                qouteMessages ? (
                  qouteMessages[0]?.subject
                ) : (
                  ""
                )
              ) : (
                <TextBox
                  placeholder="Type Message Here"
                  onChange={(e) =>
                    setMessage({
                      ...message,
                      subject: e.target.value,
                    })
                  }
                />
              )}{" "}
            </ContentHead>
            <ActionSheetContainer>
              {compose ? (
                <TextBox
                  placeholder="Type Message Here"
                  onChange={(e) =>
                    setMessage({
                      ...message,
                      message: e.target.value,
                    })
                  }
                />
              ) : (
                <>
                  <InputLabel>Company Description</InputLabel>
                  <div>{rfp?.description}</div>
                  <InputLabel>Reason for Quoting</InputLabel>
                  <div>{rfp?.reason}</div>
                  <InputLabel>Important for Underwriters</InputLabel>
                  <div>{rfp?.underwriter_note}</div>
                  <InputLabel>Plan Design</InputLabel>
                  <div>{rfp?.plan_design}</div>
                </>
              )}
            </ActionSheetContainer>
            {compose && (
              <AddButtonGroup>
                <CancelButton onClick={() => setCompose(false)}>
                  Cancel
                </CancelButton>
                <AddButton>
                  <AddLabel onClick={() => handleSave()}>Save</AddLabel>
                </AddButton>
                <AddButton>
                  <AddLabel onClick={() => handleSaveAll()}>
                    Send To All
                  </AddLabel>
                </AddButton>
              </AddButtonGroup>
            )}
          </HeaderLayout>
          <RightContainer md={3}>
            <RightContainerSection>
              <DueDateButton>{`Due Date (${moment(
                qouteRFPs?.find((item) => item.id === rfpId)?.due_date
              ).format("MMMM DD, YYYY")})`}</DueDateButton>
              <RightContainerHeaders>Company</RightContainerHeaders>
              <InputLabel>Client</InputLabel>
              <Content>{orgDetail?.name}</Content>
              <InputLabel>Effective Date</InputLabel>
              <Content>
                {moment(orgDetail?.effective_date).format("MMMM DD, YYYY")}
              </Content>
              <InputLabel>Address</InputLabel>
              <Content>{orgDetail?.city_region_postal_code}</Content>
              <InputLabel>SIC</InputLabel>
              <Content>{orgDetail?.naics_description}</Content>
              <RightContainerHeaders>Broker</RightContainerHeaders>
              <InputLabel>Name</InputLabel>
              <Content>{currentWorker?.name}</Content>
              <InputLabel>Contact Info</InputLabel>
              <Content>{currentWorker?.email}</Content>
              <InputLabel>Firm</InputLabel>
              <Content>{broker?.name}</Content>
            </RightContainerSection>
          </RightContainer>
        </HeaderContainer>
      </HeaderLayout>
    </HeaderContainer>
  );
};

export default observer(ActionSheet);
