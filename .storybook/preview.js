import React from "react";
import { addDecorator } from "@storybook/react";
import { MockMobxStore } from "./mockMobxStore";

addDecorator((storyFn) => <MockMobxStore>{storyFn()}</MockMobxStore>);
