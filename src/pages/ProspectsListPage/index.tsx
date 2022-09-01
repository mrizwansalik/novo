import { useEffect, useState } from "react";
import { get } from "lodash";
import { observer } from "mobx-react";
import moment from "moment";
import { useHistory, useParams } from "react-router-dom";
import SubHeader from "src/components/Header/components/SubHeader";
import { IOrg } from "src/interfaces/org";
import routes from "src/routes";
import Icon from "../../components/Icon";
import PageLayout from "../../components/PageLayout";
import SingleSelect from "../../components/SingleSelect";
import { IPagination } from "../../components/Table";
import useStore from "../../utils/useStore";
import ActionBar from "./components/ActionBar";
import {
  AdvisorLink,
  GrayText,
  PageContainer,
  ProspectName,
  ProspectTable,
} from "./style";
import {
  getHeaderList,
  getProspectTypeOption,
  TABLE_LIMIT_PAGE,
} from "./utils";

const ProspectsListPage = () => {
  const history = useHistory();
  const { orgStore, brokerProspectsListStore, brokerStore } = useStore();
  const { orgDetail, isGodOrg } = orgStore;
  const {
    currentOrgs,
    filteredOrgs,
    sortedOrgs,
    search,
    sortBy,
    sortType,
    prospectType,
  } = brokerProspectsListStore;
  const { brokerageBrokers, getBrokerageBrokers } = brokerStore;
  const { id } = useParams<any>();
  let filters = [];
  let obj = { label: "", value: "" };
  for (let i = 0; i <= brokerageBrokers?.length; i++) {
    obj.label = brokerageBrokers[i]?.name;
    obj.value = brokerageBrokers[i]?.id;

    filters.push(obj);
    obj = { label: "", value: "" };
  }

  const [pageIndex, setPageIndex] = useState(1);
  const rowCounts = (Array.isArray(sortedOrgs) && sortedOrgs.length) || 0;
  const pagination: IPagination = {
    rowPerPage: TABLE_LIMIT_PAGE,
    includePagination: rowCounts > TABLE_LIMIT_PAGE,
    pageCount: Math.ceil(rowCounts / TABLE_LIMIT_PAGE),
    pageIndex: pageIndex,
    goNextPage: () => setPageIndex(pageIndex + 1),
    goPreviousPage: () => setPageIndex(pageIndex - 1),
  };

  const headerList = getHeaderList(isGodOrg);
  const prospectTypeOptions = getProspectTypeOption(isGodOrg);

  //TODO: Integrate later
  // const brokerOptions = getOptionListFromArray(brokerageBrokers, "id", "name");

  function handleTableData(sortedProspects: IOrg[], pagination: IPagination) {
    if (!Array.isArray(sortedProspects)) {
      return [];
    }

    const pageIndex = get(pagination, "pageIndex", 1);
    const prospects = sortedProspects.slice(
      (pageIndex - 1) * TABLE_LIMIT_PAGE,
      pageIndex * TABLE_LIMIT_PAGE
    );
    const tableData = prospects.map((prospect: IOrg) => {
      const name = (
        <ProspectName
          onClick={async () => {
            history.push(
              routes.dashboard.brokerage.brokerageId.prospects.prospectId.dashboard.getValue(
                orgDetail.id,
                prospect.id
              )
            );
          }}
        >
          <Icon iconName="rightChevronArrow64px-blue.png" />
          <AdvisorLink isBold>{get(prospect, "name", "")}</AdvisorLink>
        </ProspectName>
      );

      const created = get(prospect, "created");
      const added = (
        <GrayText>
          {(created && moment(created).format("MMM DD, YYYY")) || ""}
        </GrayText>
      );

      const effective = get(prospect, "census_data.health_plan.effective_date");
      const effectiveDate = (
        <GrayText>
          {(effective && moment(effective).format("MMM DD, YYYY")) || ""}
        </GrayText>
      );

      const primaryBroker = {
        value: get(prospect, "primary_broker.id"),
        label: get(prospect, "primary_broker.name", ""),
      };
      //TODO: Add logic for god mode here
      const primaryBrokerName = (
        <AdvisorLink
          onClick={() =>
            history.push(
              `/dashboard/brokerage/${primaryBroker.value}/prospects/list`
              // routes.dashboard.brokerage.withBrokerList.getValue(
              //   primaryBroker.value
              // )
            )
          }
        >
          {primaryBroker.label}
        </AdvisorLink>
      );
      // const primaryBrokerName = <SingleSelect defaultValue={primaryBroker} />

      let additionalStatus = "";
      if (isGodOrg) {
        if (!get(prospect, "user_access_enabled")) {
          additionalStatus = "User Access Disabled";
        }
        if (get(prospect, "is_demo")) {
          additionalStatus = "Demo";
        }
      }

      //TODO: Add logic to change org status in god mod
      const orgStatus = get(prospect, "org_status", "active");
      const currentStatusOption = prospectTypeOptions.find(
        (option) => option.value === orgStatus
      );
      const status = (
        <SingleSelect
          options={id ? filters : prospectTypeOptions}
          defaultValue={id ? primaryBroker?.label : currentStatusOption}
        />
      );

      const numModels = get(prospect, "num_models", 0);
      const modelsCount = (
        <GrayText>
          {numModels !== 0 &&
            `${numModels} ${numModels > 1 ? "programs" : "program"}`}
        </GrayText>
      );

      return {
        name,
        added,
        effectiveDate,
        primaryBrokerName,
        additionalStatus,
        status,
        modelsCount,
      };
    });

    return tableData;
  }

  useEffect(() => {
    const orgId = get(orgDetail, "id");
    if (orgId) {
      brokerProspectsListStore.getOrgsToFilter(id || orgId, prospectType);
      getBrokerageBrokers(id || orgId);
    }
  }, [orgDetail]);

  useEffect(() => {
    if (Array.isArray(currentOrgs)) {
      brokerProspectsListStore.filterOrgs(search);
    }
  }, [currentOrgs]);

  useEffect(() => {
    if (Array.isArray(filteredOrgs)) {
      brokerProspectsListStore.sortOrgs(sortBy, sortType);
    }
  }, [filteredOrgs]);

  return (
    <PageLayout title="Quotes | Novo Connection" hasGrayBackground>
      <PageContainer>
        <SubHeader />
        <ActionBar />
        <ProspectTable
          headerList={headerList}
          data={handleTableData(sortedOrgs, pagination)}
          pagination={pagination}
        />
      </PageContainer>
    </PageLayout>
  );
};
export default observer(ProspectsListPage);
