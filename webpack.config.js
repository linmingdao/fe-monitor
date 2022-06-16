const { merge } = require("webpack-merge");

const baseConfig = require("./webpack.config.base");
const devConfig = require("./webpack.config.dev");
const prodConfig = require("./webpack.config.prod");

module.exports = (env) => {
  switch (true) {
    case env.development:
      return merge(baseConfig, devConfig);
    case env.production:
      return merge(baseConfig, prodConfig);
    default:
      return new Error("No matching configuration was found");
  }
};
