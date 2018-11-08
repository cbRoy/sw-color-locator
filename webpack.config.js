const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/client/index.js",
  optimization: {
    nodeEnv: "production",
    minimize: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["env"] }
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          { loader: "css-loader", options: { minimize: true } }
        ]
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
    alias: {
      react: "preact-compat",
      "react-dom": "preact-compat"
    }
  },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist",
    filename: "bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "dist/"),
    port: 3000,
    publicPath: "/",
    hotOnly: true,
    proxy: { "/colors": "http://localhost:3001" }
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};
