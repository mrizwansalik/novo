import { debounce } from "lodash";
import { observer } from "mobx-react";
import { Row, Col } from "reactstrap";
import useStore from "../../../../../utils/useStore";
import SingleSelect from "../../../../SingleSelect";
import { Container, StyledInput } from "./styles";

const TopSheet = () => {
  const { rfpStore } = useStore();
  const {
    filterDisplayList,
    filterStatusDisplayList,
    filterBrokerDisplayList,
    filterCarrierDisplayList,
    rfpDisplayList,
  } = rfpStore;
  const handleSearch = debounce((inputValue) => {
    filterDisplayList(inputValue.trim());
  }, 200);

  const sortOptions = [
    {
      value: "",
      label: "Open",
    },
    {
      value: "draft",
      label: "Draft",
    },
    {
      value: "closed",
      label: "Closed",
    },
    {
      value: "active",
      label: "Active",
    },
    {
      value: "pending",
      label: "Pending",
    },
  ];

  function handleSort(sortedByOption: any) {
    const sortedByValue = sortedByOption.value;
    filterStatusDisplayList(sortedByValue);
  }

  let filters = [{ label: "All", value: "" }];
  let carriers = [{ label: "All", value: "" }];
  let carrierObj = { label: "", value: "" };
  let obj = { label: "", value: "" };

  for (let i = 0; i <= rfpDisplayList.length; i++) {
    obj.label = rfpDisplayList[i]?.brokerage?.name;
    obj.value = rfpDisplayList[i]?.brokerage?.id;
    if (filters.find((item) => item.value === obj.value)) {
      //nothing do
    } else {
      if (obj.label === undefined || obj?.label?.length < 1) {
      } else {
        filters.push(obj);
        obj = { label: "", value: "" };
      }
    }
    for (let j = 0; j <= rfpDisplayList[i]?.rfps?.length; j++) {
      carrierObj.label = rfpDisplayList[i]?.rfps[j]?.stop_loss_carrier?.name;
      carrierObj.value = rfpDisplayList[i]?.rfps[j]?.stop_loss_carrier?.id;
      if (carriers.find((item) => item.value === carrierObj.value)) {
        //nothing do
      } else {
        if (carrierObj.label === undefined || carrierObj?.label?.length < 1) {
        } else {
          carriers.push(carrierObj);
          carrierObj = { label: "", value: "" };
        }
      }
    }
  }

  return (
    <Container>
      <Row>
        <Col md={4}>
          <StyledInput
            placeholder="Find RFP"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </Col>
        <Col md={2}>
          {" "}
          {/* <StyledCol lg={2} md={3} sm={8} xs={8}> */}
          <SingleSelect
            options={sortOptions}
            valueColor="#6d8491"
            defaultValue={sortOptions[0]}
            onChange={handleSort}
          />
          {/* </StyledCol> */}
        </Col>
        <Col md={3}>
          {/* <StyledCol lg={2} md={3} sm={8} xs={8}> */}
          <SingleSelect
            options={filters}
            valueColor="#6d8491"
            onChange={(e) => filterBrokerDisplayList(e.value)}
          />
          {/* </StyledCol> */}
        </Col>
        <Col md={3}>
          {/* <StyledCol lg={2} md={3} sm={8} xs={8}> */}
          <SingleSelect
            options={carriers}
            valueColor="#6d8491"
            onChange={(e) => filterCarrierDisplayList(e.value)}
          />
          {/* </StyledCol> */}
        </Col>
      </Row>
    </Container>
  );
};

export default observer(TopSheet);
