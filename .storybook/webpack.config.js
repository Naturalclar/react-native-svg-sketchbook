const path = require("path");
const { ESBuildPlugin } = require("esbuild-loader");

const externalLibs = /react-native/;

module.exports = ({ config }) => {
  config.resolve.extensions.unshift(".ts", ".tsx", ".web.js", ".web.tsx");
  config.module.rules = [
    {
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: [
        {
          loader: "esbuild-loader",
          options: {
            loader: "tsx", // Or 'ts' if you don't need tsx
            target: "es2016", // Syntax to compile to (see options below for possible values)
            define: { "process.env.NODE_ENV": "'production'" },
          },
        },
      ],
    },
    {
      test: /\.jsx?$/,
      include: externalLibs,
      use: [
        {
          loader: "esbuild-loader",
          options: {
            loader: "jsx", // Or 'ts' if you don't need tsx
            target: "es2016", // Syntax to compile to (see options below for possible values)
            define: { "process.env.NODE_ENV": "'production'" },
          },
        },
        {
          loader: "babel-loader",
          options: {
            plugins: [
              "@babel/plugin-syntax-flow",
              "@babel/plugin-transform-flow-strip-types",
              "@babel/plugin-proposal-class-properties",
              "@babel/plugin-transform-react-jsx",
            ],
          },
        },
      ],
    },
  ];

  config.plugins.unshift(new ESBuildPlugin());

  config.resolve.alias = {
    // replace `react-native` imports with `react-native-web`
    "react-native$": require.resolve("react-native-web"),
  };

  return config;
};
