module.exports = {
  presets: ["react-app"],
  plugins: [
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    ["@babel/plugin-proposal-class-properties", { loose: true }],
    [
      "babel-plugin-styled-components",
      {
        ssr: true,
        displayName: true,
      },
    ],
  ],
};
