const path = require("path");

module.exports = {
  devtool: "inline-source-map",
  mode: "development",
  devServer: {
    static: path.resolve(__dirname, "dist"),
  },
};
