const path = require("path");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  reactOptions: {
    fastRefresh: true,
  },
  addons: [
    "@storybook/react",
    "@storybook/addon-actions",
    "@storybook/addon-essentials",
    "@storybook/addon-links",
    "@storybook/node-logger",
    "@storybook/preset-create-react-app",
  ],
  webpackFinal: async (config, { configType }) => {
    config.resolve.modules.push(path.resolve(__dirname, "../"));

    return config;
  },
};
