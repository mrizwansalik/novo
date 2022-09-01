import { useEffect, useMemo, useState } from "react";
import { debounce, get } from "lodash";
import { observer } from "mobx-react";
import { useHistory, useParams } from "react-router";
import { toast } from "react-toastify";
import {
  deleteAllOrgCensusHuman,
  deleteOrgSimpleCensusHuman,
} from "src/api/org";
import Icon from "src/components/Icon";
import InputGroup from "src/components/InputGroup";
import Modal from "src/components/Modal";
import useProspectDetail from "src/hooks/ProspectDetail";
import routes from "src/routes";
import { IOption } from "src/types";
import {
  exportCensusCSV,
  getDownloadSimpleCensusFilename,
  updateHuman,
} from "src/utils/humanCensus";
import useStore from "src/utils/useStore";
import {
  ComponentContainer,
  StyledCol,
  StyledIcon,
  StyledSelect,
  selectControlStyle,
  selectPlaceholderStyle,
  SearchInput,
  PrimaryButton,
  ModalBody,
  SecondaryButton,
} from "./censusTableAction.style";

interface ICensusTableActionProps {
  selectedHumans: Record<string, boolean>;
}

const CensusTableAction = (props: ICensusTableActionProps) => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isClearCensusModalOpen, setIsClearCensusModalOpen] = useState(false);
  const { selectedHumans } = props;

  const history = useHistory();
  const params = useParams();
  const orgId: string = get(params, "orgId", "");

  const selectedHumanList = useMemo(
    () =>
      Object.keys(selectedHumans).filter((humanId) => selectedHumans[humanId]),
    [selectedHumans]
  );

  const censusPageSelectOptions: IOption[] = [
    {
      label: "Manage Templates",
      value: "manage",
    },
    {
      label: "Upload Census",
      value: "upload",
    },
  ];

  const { censusDetailsStore } = useStore();
  const { censusHumans, flatHumans, filteredHumans } = censusDetailsStore;
  const prospectDetail = useProspectDetail();

  const handleSearch = debounce(
    (inputValue) => censusDetailsStore.setSearch(inputValue),
    200
  );

  async function handleDeleteHuman() {
    let deletePromises = [];
    const isDeleteAll = selectedHumanList.length === flatHumans.length;

    if (isDeleteAll) {
      deletePromises = [deleteAllOrgCensusHuman(orgId)];
    } else {
      Object.keys(selectedHumans).forEach((humanId: string) => {
        if (selectedHumans[humanId]) {
          deletePromises.push(deleteOrgSimpleCensusHuman(orgId, humanId));
        }
      });
    }

    toast.info("Removing selected census info...");

    try {
      await Promise.all(deletePromises);

      if (isDeleteAll) {
        censusDetailsStore.updateCensusHumans([]);
      } else {
        selectedHumanList.forEach((humanId) => {
          let updatedHumans = censusDetailsStore.censusHumans;
          updateHuman(updatedHumans, humanId);
          censusDetailsStore.updateCensusHumans(updatedHumans);
        });
      }
      setIsConfirmModalOpen(false);
      toast.success("Selected census info removed.");
    } catch (err) {
      toast.error("There was a problem removing the selected census info.");
    }
  }

  function handleTableSelectAction(selectedOption: IOption) {
    if (selectedOption.value === "manage") {
    }
    if (selectedOption.value === "upload") {
      const hasData = Array.isArray(flatHumans) && flatHumans.length > 0;
      if (hasData) {
        setIsClearCensusModalOpen(true);
      } else {
        history.push(
          routes.dashboard.brokerage.prospects.onBoarding.census.choice.getValue(
            orgId
          )
        );
      }
    }
  }

  function clearCensusAndRedirect() {
    deleteAllOrgCensusHuman(orgId);
    history.push(
      routes.dashboard.brokerage.prospects.onBoarding.census.choice.getValue(
        orgId
      )
    );
  }

  function downloadCensus() {
    const filename = getDownloadSimpleCensusFilename(prospectDetail);
    exportCensusCSV(censusHumans, filename);
  }

  useEffect(() => {
    if (Array.isArray(filteredHumans)) {
      censusDetailsStore.parseHumans(filteredHumans);
    }
  }, [filteredHumans]);

  // TODO: Add download function
  return (
    <ComponentContainer>
      <StyledCol lg={2} md={2} xs={8}>
        <StyledSelect
          value={null}
          options={censusPageSelectOptions}
          placeholder="Census"
          controlStyle={selectControlStyle}
          placeholderStyle={selectPlaceholderStyle}
          onChange={(selected) => handleTableSelectAction(selected)}
        />
      </StyledCol>
      <StyledCol lg={1} md={1} xs={4} isFlex>
        {selectedHumanList.length ? (
          <StyledIcon
            iconName="red-trash.png"
            size={22}
            onClick={() => setIsConfirmModalOpen(true)}
          />
        ) : (
          <StyledIcon iconName="trash-grey.png" size={22} isDisabled />
        )}
        <StyledIcon
          iconName="csv_document.png"
          size={22}
          onClick={downloadCensus}
        />
      </StyledCol>
      <StyledCol lg={4} md={4}></StyledCol>
      <StyledCol lg={3} md={3}>
        <SearchInput>
          <InputGroup
            placeholder="Filter by name"
            onChange={(e) => handleSearch(e.target.value)}
          />
          <span>
            <Icon iconName="spyglass.png" size={18} />
          </span>
        </SearchInput>
      </StyledCol>
      <StyledCol lg={2} md={2}>
        <PrimaryButton
          label="Next"
          onClick={() =>
            history.push(
              routes.dashboard.brokerage.prospects.onBoarding.health.choice.getValue(
                orgId
              )
            )
          }
        />
      </StyledCol>
      <Modal
        isOpen={isConfirmModalOpen}
        toggle={() => setIsConfirmModalOpen(false)}
        body={
          <ModalBody>
            <h5>Are you sure you want to remove the selected people?</h5>
            <div>
              <PrimaryButton
                label="Yes, remove them"
                onClick={() => handleDeleteHuman()}
              />
              <SecondaryButton
                label="No"
                onClick={() => setIsConfirmModalOpen(false)}
              />
            </div>
          </ModalBody>
        }
      />
      <Modal
        isOpen={isClearCensusModalOpen}
        toggle={() => setIsClearCensusModalOpen(false)}
        body={
          <ModalBody>
            <h5>Are you sure you want to remove the selected people?</h5>
            <div>
              <PrimaryButton
                label="Yes, clear it"
                onClick={() => clearCensusAndRedirect()}
              />
              <SecondaryButton
                label="No"
                onClick={() => setIsClearCensusModalOpen(false)}
              />
            </div>
          </ModalBody>
        }
      />
    </ComponentContainer>
  );
};
export default observer(CensusTableAction);
