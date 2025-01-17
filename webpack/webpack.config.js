const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const HandlebarsPlugin = require("handlebars-webpack-plugin");

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, './index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    assetModuleFilename: '[name][ext]'
  },
  devServer: {
    open: true,
    hot: true,
    compress: true
  },
  module: {
    rules: [
      {
        test: /\.(handlebars)$/,
        loader: 'handlebars-template-loader',
        options: {
          partialDirs: path.resolve(__dirname, 'partials')
        },
      },
      {
        test: /\.(scss|css|sass)$/,
        use: ['style-loader', 
              'css-loader',
              {
                loader: "postcss-loader",
                options: {
                  plugins: () => [
                    require("autoprefixer")()
                  ],
                },
              }, 
              'sass-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          },
        },
      },
      {
        test: /\.(png|svg|jpg)$i/,
        type: 'asset/resource'
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './views/home.hbs',
      filename: 'index.html',
    }),
    // new HtmlWebpackPlugin({
    //   template: './views/about.hbs',
    //   filename: 'about/index.html',
    // }),
    // new HtmlWebpackPlugin({
    //   template: './views/projects.hbs',
    //   filename: 'projects/index.html',
    // }),
    // new HtmlWebpackPlugin({
    //   template: './views/connect.hbs',
    //   filename: 'connect/index.html',
    // }),

    new HandlebarsPlugin({
      entry: path.join(process.cwd(), "views", "*.hbs"),
      output: path.join(process.cwd(), "build", "[name].html"),
      partials: [
        path.join(process.cwd(), "views", "partials", "*.hbs")
      ],
      helpers: {
        nameOfHbsHelper: Function.prototype,
        projectHelpers: path.join(process.cwd(), "app", "helpers", "*.helper.js")
      },
 
      // hooks
      // getTargetFilepath: function (filepath, outputTemplate) {},
      // getPartialId: function (filePath) {}
      onBeforeSetup: function (Handlebars) {},
      onBeforeAddPartials: function (Handlebars, partialsMap) {},
      onBeforeCompile: function (Handlebars, templateContent) {},
      onBeforeRender: function (Handlebars, data, filename) {},
      onBeforeSave: function (Handlebars, resultHtml, filename) {},
      onDone: function (Handlebars, filename) {}
    })
  ],
  target: 'node',
  mode: 'development',
  externals: [nodeExternals()]
};