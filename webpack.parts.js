/** configuration parts */

const path = require("path");
const cssnano = require("cssnano");
const modernizr = require("modernizr");
const webpack = require("webpack");

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const PurifyCSSPlugin = require("purifycss-webpack");
const MinifyPlugin = require("babel-minify-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

exports.loadImages = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [{
      test: /\.(jpg|png|svg|gif)$/,
      include,
      exclude,

      use: {
        loader: "url-loader",
        options,
      },
    }, ],
  },
});

exports.loadCSS = ({ include, exclude } = {}) => ({
  module: {
    rules: [{
      test: /\.scss$/,
      include,
      exclude,

      use: [
        "style-loader",
        {
          loader: "css-loader",
          options: {
            sourceMap: true,
          }
        },
        {
          loader: "postcss-loader",
          options: {
            sourceMap: true,
            plugins: () => ([
              require("postcss-cssnext")()
            ])
          }
        },
        {
          loader: "sass-loader",
          options: {
            sourceMap: true
          }
        }
      ],
    }, ],
  },
});

exports.extractCSS = ({ include, exclude, use } = {}) => {
  // output extracted CSS to a file
  const plugin = new ExtractTextPlugin({
    filename: "../css/main.css",
  });

  return {
    module: {
      rules: [{
        test: /\.scss$/,
        include,
        exclude,

        use: plugin.extract({
          fallback: "style-loader",
          use: [
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                sourceMap: true,
                plugins: () => ([
                  require("postcss-cssnext")(),
                  require("postcss-flexibility")
                ])
              }
            },
            "sass-loader"
          ],
        }),
      }, ],
    },

    plugins: [plugin],
  };
};

exports.purifyCSS = ({ paths }) => ({
  plugins: [
    new PurifyCSSPlugin({
      paths,
      // minimize: true,
    }),
  ],
});

exports.minifyCSS = ({ options }) => ({
  plugins: [
    new OptimizeCSSAssetsPlugin({
      cssProcessor: cssnano,
      cssProcessorOptions: options,
      canPrint: false,
    })
  ],
});

exports.loadJavaScript = ({ include, exclude }) => ({
  module: {
    rules: [{
      test: /\.js$/,
      include,
      exclude,

      loader: "babel-loader",
      options: {
        // enable caching for improved performance during development
        cacheDirectory: true,
      },
    }, ],
  },
});


exports.minifyJavaScript = () => ({
  plugins: [
    // new MinifyPlugin(),
    new UglifyJsPlugin()
  ],
});

exports.loadModernizr = () => ({
  module: {
    rules: [{
      loader: 'webpack-modernizr-loader',
      options: {
        options: [
          "setClasses"
        ],
        "feature-detects": [
          "test/css/flexbox",
          "test/es6/promises",
          "test/serviceworker"
        ]
      },
      test: /modernizr-alias\.js$/
    }]
  },
  resolve: {
    alias: {
      modernizr$: path.resolve(__dirname, "js/misc//modernizr-alias.js")
    }
  }
});

exports.generateSourceMaps = ({ type }) => ({
  devtool: type,
});

exports.setGlobaVariable = ({ name }) => ({
  plugins: [
    new webpack.DefinePlugin({
      [name]: true
    })
  ],
});
