import webpack from "webpack";
import path from "path";

export function buildLoaders(): webpack.RuleSetRule[] {
  const cssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      // Creates `style` nodes from JS strings
      "style-loader",
      // Translates CSS into CommonJS
      "css-loader",
      // Compiles Sass to CSS
      "sass-loader",
    ],
  };

  const typescriptLoader = {
    test: /\.tsx?$/,
    use: "ts-loader",
    exclude: /node_modules/,
  };

  const imagesLoader = {
    test: /\.(svg|png|jpg|jpeg|gif)$/,
    include: path.resolve(__dirname, "/public/icons"),
    use: {
      loader: "file-loader",
      options: {
        name: "[path][name].[ext]",
        outputPath: path.resolve(__dirname, "build", "icons"),
      },
    },
    exclude: /node_modules/,
  };

  return [typescriptLoader, cssLoader, imagesLoader];
}
