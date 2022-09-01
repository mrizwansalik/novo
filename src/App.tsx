import { Fragment, useEffect } from "react";
import { Chart, registerables } from "chart.js";
import { Provider } from "mobx-react";
import { ToastContainer } from "react-toastify";
import AppRoutes from "./AppRoutes";
import { AuthenticateParams } from "./constants/enum/authenticate";
import { GlobalStyle } from "./globalStyle";
import { useChatlio } from "./hooks/Chatlio";
import initializeStore from "./stores/rootStore";
import useStore from "./utils/useStore";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "./styles/layout.ts";
Chart.register(...registerables);

const mobxStore = initializeStore();

const App = () => {
  useChatlio();
  const { orgStore } = useStore();

  useEffect(() => {
    const accessToken: string = localStorage.getItem(
      AuthenticateParams.AUTH_TOKEN
    );
    if (accessToken) {
      orgStore.getOrg();
    }
  }, []);

  return (
    <Fragment>
      <GlobalStyle />
      {AppRoutes()}
      <ToastContainer />
    </Fragment>
  );
};

const WithStore = () => {
  return (
    <Provider {...mobxStore}>
      <App />
    </Provider>
  );
};

export default WithStore;
