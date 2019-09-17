const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default;
const path = require('path')

module.exports = (env, argv) => ({
  mode: argv.mode === 'production' ? 'production' : 'development',

  // This is necessary because Figma's 'eval' works differently than normal eval
  devtool: argv.mode === 'production' ? false : 'inline-source-map',

  entry: {
    ui: './public/bundle.js', // The entry point for your UI code
    style: ["./public/bundle.css", "./public/global.css"]
    // code: './src/code.ts', // The entry point for your plugin code
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      }
    ]

  },
  output: {
    filename: '[name]-webpack.js',
    path: path.resolve(__dirname, 'dist'), // Compile into a folder called "dist"
  },

  // Tells Webpack to generate "ui.html" and to inline "ui.ts" into it
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inlineSource: '.(js|css)$',
      chunks: ['ui', 'style'],

    }),
    new HtmlWebpackInlineSourcePlugin(),
    // new HTMLInlineCSSWebpackPlugin({
    //   replace: {
    //     removeTarget: true,
    //     target: '<!-- inline_css_plugin -->',
    //   },
    // })
  ],
})