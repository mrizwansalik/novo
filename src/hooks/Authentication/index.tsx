import { useEffect, useState } from "react";
import { get } from "lodash";
import { fetchCurrentWorker } from "src/api/fetchWorker";
import { getOrgDetail } from "src/api/org";
import { IOrg } from "src/interfaces/org";
import { IWorker } from "src/interfaces/worker";
import { checkAndResetToken } from "src/utils/authentication";
// import { IBrokerage } from "src/interfaces/broker";

function useAuthentication() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  const [orgDetail, setOrgDetail] = useState<IOrg>();
  const [currentWorker, setCurrentWorker] = useState<IWorker>();
  // const [brokerage, setBrokerage] = useState<IBrokerage>();

  const authToken = localStorage.getItem("authToken");

  async function handleFetchOrg() {
    const fetchedOrg = await getOrgDetail();
    if (get(fetchedOrg, "id")) {
      setOrgDetail(fetchedOrg);

      localStorage.setItem("orgId", get(fetchedOrg, "id", ""));
    }
  }

  async function handleFetchWorker() {
    const fetchedWorker = await fetchCurrentWorker();
    if (get(fetchedWorker, "id")) {
      setCurrentWorker(fetchedWorker);
      localStorage.setItem("workerEmail", get(fetchedWorker, "email", ""));
    }
  }

  // async function handleFetchBrokerage() {}

  useEffect(() => {
    if (authToken) {
      checkAndResetToken(authToken);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [authToken]);

  useEffect(() => {
    if (isAuthenticated && authToken) {
      handleFetchOrg();
      handleFetchWorker();
    }
  }, [isAuthenticated, authToken]);

  return {
    isAuthenticated,
    orgDetail,
    currentWorker,
  };
}

export default useAuthentication;
