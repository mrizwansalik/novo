import React from "react";
import { observer } from "mobx-react";
import { Redirect, Route } from "react-router";
import useAuthentication from "src/hooks/Authentication";
import routes from "src/routes";
import useStore from "src/utils/useStore";

const PrivateRoute = ({ children, ...rest }) => {
  const { isAuthenticated, orgDetail, currentWorker } = useAuthentication();

  const { orgStore, workerStore } = useStore();

  orgStore.setOrg(orgDetail);
  workerStore.setCurrentWorker(currentWorker);

  return (
    <Route
      exact={true}
      {...rest}
      render={({ location }) => {
        return isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: routes.login.value,
              state: { redirectFrom: location },
            }}
          />
        );
      }}
    />
  );
};

export default observer(PrivateRoute);
