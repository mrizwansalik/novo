import React from "react";
import { MobXProviderContext } from "mobx-react";
import { IRootStore } from "../stores/rootStore";

function useStore(): IRootStore {
  return React.useContext(MobXProviderContext) as IRootStore;
}

export default useStore;
