import React from 'react'
import { Provider } from "mobx-react";
import initializeStore from "../src/stores/rootStore";

const mobxStore = initializeStore();

function MockMobxStore({ children }) {
    return <Provider {...mobxStore}>{children}</Provider>
}

export { MockMobxStore }
