import React, { useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
// import VerticalNavbar from "../../components/VerticalNavbar";
// import HomePage from "../../components/Pages/HomePage";
// import Header from "../../components/Header";
// import { navbarList } from "../../constants";
import { useLocation, useHistory } from "react-router";
import routes from "../../routes";
const DashboardPage = (props) => {
  const { organizationStore, workerStore } = props;
  const { fetchCurrentOrganization } = organizationStore;
  const { fetchCurrentWorker } = workerStore;
  const [isRedirectToSetupPassword, setIsRedirectToSetupPassword] = useState(
    false
  );

  const query = new URLSearchParams(useLocation().search);
  const jwt = query.get("jwt");
  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      await Promise.all([fetchCurrentOrganization(), fetchCurrentWorker()]);
      setIsRedirectToSetupPassword(true);
    }
    if (jwt) {
      localStorage.setItem("token", jwt);
      fetchData();
    }
  }, []);

  if (isRedirectToSetupPassword) {
    history.push(routes.dashboard.brokerage.changePassword.value);
  }

  return <div></div>;
};

export default inject(
  "organizationStore",
  "workerStore"
)(observer(DashboardPage));
