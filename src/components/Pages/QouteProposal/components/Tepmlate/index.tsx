import { useState } from "react";
import { observer } from "mobx-react";
import moment from "moment";
import DatePicker from "react-datepicker";
import { useParams, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import routes from "src/routes";
import { IParamTypes } from "src/types";
import useStore from "src/utils/useStore";
import {
  HeaderLayout,
  ActionSheetContainer,
  Header,
  HeaderContainer,
  Pill,
  CarrierWraper,
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
} from "./style";

const EmptyQoute = {
  carrier: null,
  due_date: "",
  description: "",
  reason: "",
  underwriter_note: "",
  plan_design: "",
  underwriter: "",
  contacts: [],
};

const Update = () => {
  const {
    qouteProposalStore,
    orgStore,
    workerStore,
    qouteRFPsStore,
  } = useStore();
  const [proposal, setProposal] = useState(EmptyQoute);
  const [datePick, setDatePick] = useState(false);
  const [connection, setConnection] = useState([]);
  const { underwriters, qouteProposal } = qouteProposalStore;
  const { orgDetail } = orgStore;
  const { currentWorker } = workerStore;
  const { prospectId, brokerageId } = useParams<IParamTypes>();
  const history = useHistory();
  const handleSave = () => {
    if (connection.length > 0) {
      const res = connection.map((item) => {
        const data = {
          ...proposal,
          due_date: moment(proposal.due_date).format("YYYY-MM-DD"),
          underwriter: item,
        };
        qouteProposal(prospectId, data);
      });

      toast.success("Request Created");
      history.push(
        routes.dashboard.brokerage.brokerageId.prospects.prospectId.rfps.rfpList.getValue(
          brokerageId,
          prospectId
        )
      );
    }
    toast.error("Please fill out the form and select due date");
  };
  const handleChange = (id) => {
    if (connection.find((item) => item === id)) {
      let value = connection.filter((val) => val !== id);
      setConnection(value);
    } else {
      setConnection((connection) => [...connection, id]);
    }
  };
  return (
    <HeaderContainer>
      <HeaderLayout md={9}>
        <ActionSheetContainer>
          <Header>Underwriters</Header>
          <br />
          <CarrierWraper>
            {Array.isArray(underwriters) &&
              underwriters?.map((item) => {
                return (
                  <Pill
                    isActive={
                      connection?.find((val) => val === item.id) ? true : false
                    }
                    onClick={() => handleChange(item.id)}
                  >
                    {item?.name}
                  </Pill>
                );
              })}
          </CarrierWraper>
          <br />
          <InputLabel>Company Description</InputLabel>
          <TextBox
            placeholder="Type Here ..."
            onChange={(e) => {
              setProposal({
                ...proposal,
                description: e.target.value,
              });
            }}
          />
          <InputLabel>Reason for Qouting</InputLabel>
          <TextBox
            placeholder="Type Here ..."
            onChange={(e) => {
              setProposal({
                ...proposal,
                reason: e.target.value,
              });
            }}
          />
          <InputLabel>Important for Underwriters</InputLabel>
          <TextBox
            placeholder="Type Here ..."
            onChange={(e) => {
              setProposal({
                ...proposal,
                underwriter_note: e.target.value,
              });
            }}
            style={{ height: "184px" }}
          />
          <InputLabel>Plan Design</InputLabel>
          <TextBox
            placeholder="Type Here ..."
            onChange={(e) => {
              setProposal({
                ...proposal,
                plan_design: e.target.value,
              });
            }}
            style={{ height: "184px" }}
          />
        </ActionSheetContainer>
        <AddButtonGroup>
          <CancelButton
            onClick={() =>
              history.push(
                routes.dashboard.brokerage.brokerageId.prospects.prospectId.rfps.rfpList.getValue(
                  brokerageId,
                  prospectId
                )
              )
            }
          >
            Cancel
          </CancelButton>
          <AddButton onClick={() => handleSave()}>
            <AddLabel>Save</AddLabel>
          </AddButton>
        </AddButtonGroup>
      </HeaderLayout>
      <RightContainer md={3}>
        <RightContainerSection>
          <DatePicker
            selected={new Date()}
            onChange={(date) => {
              setProposal({
                ...proposal,
                due_date: date,
              });
            }}
            customInput={
              <DueDateButton>
                {proposal.due_date
                  ? `Due Date (${moment(proposal.due_date).format(
                      "MMMM DD, YYYY"
                    )})`
                  : "Set Due Date"}
              </DueDateButton>
            }
          />

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
          <Content>{qouteRFPsStore?.broker?.name}</Content>
        </RightContainerSection>
      </RightContainer>
    </HeaderContainer>
  );
};

export default observer(Update);
