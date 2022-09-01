import React, { useEffect, useState } from "react";
import { get } from "lodash";
import { observer } from "mobx-react";
import { useParams } from "react-router-dom";
import { CoverageType } from "src/constants/enum/plan";
import { ICensusHuman } from "src/interfaces/census";
import useStore from "src/utils/useStore";
import { CensusItem, ComponentContainer } from "./censusBox.style";

const CensusBox = () => {
  const [censusData, setCensusData] = useState([]);

  const { censusDetailsStore } = useStore();
  const { censusHumans } = censusDetailsStore;

  const params = useParams();
  const prospectId = get(params, "prospectId");

  function handleCensusData(census: ICensusHuman[]) {
    const numEE = { label: "EE", count: 0 };
    const numES = { label: "ES", count: 0 };
    const numEC = { label: "EC", count: 0 };
    const numEF = { label: "EF", count: 0 };

    census.forEach((human) => {
      const { coverage_type } = human;
      if (coverage_type === CoverageType.EMPLOYEE) {
        numEE.count++;
      }
      if (coverage_type === CoverageType.EMPLOYEE_SPOUSE) {
        numES.count++;
      }
      if (coverage_type === CoverageType.EMPLOYEE_CHILDREN) {
        numEC.count++;
      }
      if (coverage_type === CoverageType.EMPLOYEE_FAMILY) {
        numEF.count++;
      }
    });

    setCensusData([numEE, numES, numEC, numEF]);
  }

  useEffect(() => {
    censusDetailsStore.getCensusHumansList(prospectId);
  }, [prospectId]);

  useEffect(() => {
    handleCensusData(censusHumans);
  }, [censusHumans]);

  return (
    <ComponentContainer>
      <CensusItem>
        <h3>Census</h3>
      </CensusItem>
      {censusData.length === 0 ? (
        <h3>No census data.</h3>
      ) : (
        censusData.map((data) => (
          <CensusItem>
            <h3>
              {data.count} {data.label}
            </h3>
          </CensusItem>
        ))
      )}
    </ComponentContainer>
  );
};
export default observer(CensusBox);
