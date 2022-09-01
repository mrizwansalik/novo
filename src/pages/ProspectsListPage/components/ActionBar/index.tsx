import React from "react";
import { debounce } from "lodash";
import { observer } from "mobx-react";
import { Row, Col } from "reactstrap";
import routes from "src/routes";
import Icon from "../../../../components/Icon";
import SingleSelect from "../../../../components/SingleSelect";
import { PROSPECT_SORT_BY, PROSPECT_TYPE } from "../../../../constants";
import { IOption } from "../../../../types/form";
import useStore from "../../../../utils/useStore";
import { getProspectTypeOption } from "../../utils";
import { sortOptions } from "./constant";
import {
  ComponentContainer,
  StyledCol,
  ActionButton,
  SearchInput,
} from "./style";

const ActionBar = () => {
  // TODO: Add upload function later
  // const [isUploadEmployeeOpen, setIsUploadEmployeeOpen] = useState(false);
  const { brokerProspectsListStore, routerStore, workerStore } = useStore();
  const {
    filteredOrgs,
    sortBy,
    sortType,
    prospectType,
  } = brokerProspectsListStore;
  const { isGod } = workerStore;

  const quotesCount = (Array.isArray(filteredOrgs) && filteredOrgs.length) || 0;

  const prospectTypeOptions = getProspectTypeOption(isGod);
  const defaultProspectTypeOption = prospectTypeOptions.find(
    (option) => option.value === prospectType
  );
  const defaultSortByOption = sortOptions.find(
    (option) => option.value === sortBy
  );

  const handleSearch = debounce(
    (inputValue) => brokerProspectsListStore.setSearch(inputValue),
    200
  );

  function handleSort(sortedByOption: IOption) {
    const sortedByValue = sortedByOption.value as PROSPECT_SORT_BY;
    brokerProspectsListStore.setSortBy(sortedByValue);
  }

  function handleChangeProspectType(prospectTypeOption: IOption) {
    const prospectType = prospectTypeOption.value as PROSPECT_TYPE;
    brokerProspectsListStore.setProspectType(prospectType);
  }

  return (
    <ComponentContainer>
      <Row>
        <Col lg={8} md={12}>
          <Row>
            <StyledCol isFlex lg={4} md={5} sm={12}>
              <SearchInput
                hasNoLabel
                placeholder="Find Quotes"
                onChange={(e) => handleSearch(e.target.value)}
              />
              <span>
                {quotesCount} {quotesCount > 1 ? "Quotes" : "Quote"}
              </span>
            </StyledCol>
            <StyledCol lg={3} md={4} sm={8} xs={8}>
              <SingleSelect
                options={sortOptions}
                defaultValue={defaultSortByOption}
                valueColor="#6d8491"
                onChange={handleSort}
              />
            </StyledCol>
            <StyledCol lg={2} md={3} sm={4} xs={4}>
              <ActionButton
                onClick={() =>
                  brokerProspectsListStore.setSortType(sortType * -1)
                }
              >
                <Icon iconName="updown64px-blue.png" /> Reverse
              </ActionButton>
            </StyledCol>
            <StyledCol isFlex lg={3} md={4}>
              <span>Type:</span>
              <SingleSelect
                options={prospectTypeOptions}
                defaultValue={defaultProspectTypeOption}
                valueColor="#6d8491"
                onChange={handleChangeProspectType}
              />
            </StyledCol>
          </Row>
        </Col>
        <Col lg={4} md={12}>
          <Row>
            <StyledCol>
              {isGod && (
                <ActionButton
                  onClick={() =>
                    routerStore.push(
                      routes.dashboard.brokerage.prospects.onBoarding.profile
                        .value
                    )
                  }
                >
                  <Icon iconName="uploadBlue36px.png" /> Employee Navigator
                </ActionButton>
              )}
            </StyledCol>
            <StyledCol>
              <ActionButton
                onClick={() =>
                  routerStore.push(
                    routes.dashboard.brokerage.prospects.onBoarding.profile
                      .value
                  )
                }
              >
                <Icon iconName="plus64px-blue.png" /> Create a New Quote
              </ActionButton>
            </StyledCol>
          </Row>
        </Col>
      </Row>

      {/* <FileUploader
        isOpen={isUploadEmployeeOpen}
        filePath={BaseFilePath.PRIVATE}
        customAllowFileTypes={["text/xml"]}
        onRequestClose={() => setIsUploadEmployeeOpen(false)}
        onUploadSuccess={onUploadFile}
      /> */}
    </ComponentContainer>
  );
};
export default observer(ActionBar);
