// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

// module.exports = {
//   //This property defines where the application starts
//   entry:'./index.js',
//     mode: 'development',
//     output: {
//       path: `${__dirname}/dist`,
//       filename: 'bundle.js',
//     },
    
   
//   //Setup loaders
//   module: {
//     rules: [
//       {
//         test: /\.js$/, 
//         exclude: /node_modules/,
//         use: {
//           loader: 'babel-loader'
//         }
//       }
//     ]
//   },
    
//   // Setup plugin to use a HTML file for serving bundled js files
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: './index.html'
//     })
//   ]
// }


// const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');

// module.exports = {
//   plugins: [
//     new HtmlBundlerPlugin({
//       entry: {
//         // define templates here
//         index: {
//           // => dist/index.html
//           import: './index.js', // template file
//           data: { title: 'Homepage', name: 'Heisenberg' }, // pass variables into template
//         },
//       },
//       js: {
//         // output filename of compiled JavaScript, used if `inline` option is false (defaults)
//         // filename: 'assets/js/[name].[contenthash:8].js',
//         inline: true, // inlines JS into HTML
//       },
//       css: {
//         // output filename of extracted CSS, used if `inline` option is false (defaults)
//         // filename: 'assets/css/[name].[contenthash:8].css',
//         inline: true, // inlines CSS into HTML
//       },
//     }),
//   ],
//   module: {
//     rules: [
//       {
//         test: /\.(css|sass|scss)$/,
//         use: ['css-loader', 'sass-loader'],
//       },
//       {
//         test: /\.(ico|png|jp?g|webp|svg)$/,
//         type: 'asset/resource',
//         generator: {
//           filename: 'assets/img/[name].[hash:8][ext][query]',
//         },
//       },
//     ],
//   },
// };


// const path = require("path");
// const HandlebarsPlugin = require("handlebars-webpack-plugin");

// const webpackConfig = {

//   plugins: [

//     new HandlebarsPlugin({
//       // path to hbs entry file(s). Also supports nested directories if write path.join(process.cwd(), "app", "src", "**", "*.hbs"),
//       entry: path.join(process.cwd(), "app", "src", "*.hbs"),
//       // output path and filename(s). This should lie within the webpacks output-folder
//       // if ommited, the input filepath stripped of its extension will be used
//       output: path.join(process.cwd(), "build", "[name].html"),
//       // you can also add a [path] variable, which will emit the files with their relative path, like
//       // output: path.join(process.cwd(), "build", [path], "[name].html"),
      
//       // data passed to main hbs template: `main-template(data)`
//       data: require("./views/home.hbs"),
//       // or add it as filepath to rebuild data on change using webpack-dev-server
//       data: path.join(__dirname, "./public/data/project_list.json"),
//       // globbed path to partials, where folder/filename is unique
//       partials: [
//         path.join(process.cwd(), "app", "src", "components", "*", "*.hbs")
//       ],

//       // register custom helpers. May be either a function or a glob-pattern
//       helpers: {
//         nameOfHbsHelper: Function.prototype,
//         projectHelpers: path.join(process.cwd(), "app", "helpers", "*.helper.js")
//       },

//       // hooks
//       // getTargetFilepath: function (filepath, outputTemplate) {},
//       // getPartialId: function (filePath) {}
//       onBeforeSetup: function (Handlebars) {},
//       onBeforeAddPartials: function (Handlebars, partialsMap) {},
//       onBeforeCompile: function (Handlebars, templateContent) {},
//       onBeforeRender: function (Handlebars, data, filename) {},
//       onBeforeSave: function (Handlebars, resultHtml, filename) {},
//       onDone: function (Handlebars, filename) {}
//     })
//   ]
// };

// module.exports = {
//   entry: './index.js',
//   mode: 'development',
//   output: {
// 	path: `${__dirname}/dist`,
// 	filename: 'bundle.js',
//   },

//     //Setup loaders
//   module: {
//     rules: [
//       {
//         test: /\.js$/, 
//         exclude: `${__dirname}/node_modules/`,
//         use: {
//           loader: 'babel-loader'
//         }
//       }
//     ]
//   },

//   resolve: {
//     alias: {
//         'express-handlebars': 'handlebars/dist/handlebars.js'
//     }
//  }

// };


const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

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
  ],
  target: 'node',
  mode: 'development',
  externals: [nodeExternals()]
};