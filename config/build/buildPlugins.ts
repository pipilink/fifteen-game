import HTMLWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";
import { BuildOptions } from "./types/config";
import Dotenv from "dotenv-webpack";

export function buildPlugins({
  paths,
}: BuildOptions): webpack.WebpackPluginInstance[] {
  return [
    new HTMLWebpackPlugin({
      template: paths.html,
      favicon: "./public/icons/favicon.ico",
    }),
    new Dotenv(),
    new webpack.ProgressPlugin(),
  ];
}
