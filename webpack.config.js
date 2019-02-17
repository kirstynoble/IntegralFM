/** main configuration file */

const webpack = require("webpack");
const path = require("path");
const glob = require("glob-all");
const merge = require("webpack-merge");

const CopyWebpackPlugin = require('copy-webpack-plugin');

const parts = require("./webpack.parts");

const PATHS = {
  src: path.join(__dirname, "src"), // source
  dist: path.join(__dirname, "web"), // build
};

// configuration object common from development and production
const commonConfig = merge([{
    entry: "./src/index.js",
    output: {
      path: PATHS.dist + "/assets/js",
      filename: "bundle.js"
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
      }),
      // copy static assets to dist
      new CopyWebpackPlugin([{
          from: PATHS.src + "/js/ie",
          to: PATHS.dist + "/assets/js/ie"
        },
        {
          from: PATHS.src + "/img/",
          to: PATHS.dist + "/assets/img/"
        },
        {
          from: PATHS.src + "/icons/",
          to: PATHS.dist + "/assets/icons/"
        },
        {
          from: PATHS.src + "/fonts/",
          to: PATHS.dist + "/assets/fonts"
        },
        {
          from: PATHS.src + "/js/misc/dummy",
          to: PATHS.dist + "/assets/css/main.css"
        },
      ]),
    ],
  },
  parts.loadJavaScript({
    include: PATHS.dist
  }),
  parts.loadModernizr()
]);

// development specific configuration
const developmentConfig = merge([{
    output: {
      devtoolModuleFilenameTemplate: "webpack:///[absolute-resource-path]"
    },
    watch: true,
  },
  parts.setGlobaVariable({
    name: "DEVELOPMENT"
  }),
  parts.loadCSS(),
  parts.loadImages(),
  //parts.generateSourceMaps({ type: 'cheap-module-eval-source-map'}),
]);


// production specific configuration
const productionConfig = merge([{
    // performance budget for entry point and assets
    performance: {
      hints: "warning",
      maxEntrypointSize: 450000,
      maxAssetSize: 450000,
    }
  },
  // extract CSS from the bundle
  parts.extractCSS(),
  // inline smaller images
  parts.loadImages({
    options: {
      limit: 15000, // images above this size won't be inlined
      name: "./../img/[name].[ext]"
    }
  }),
  // remove unused CSS
  parts.purifyCSS({
    paths: glob.sync([
      `${PATHS.dist}/templates/**/*.html`,
      `${PATHS.dist}/assets/js/bundle.js`,
    ])
  }),
  // TODO: adds 500kB overhead to bundle - inspect
  // parts.generateSourceMaps({ type: "source-map"}),
  parts.minifyJavaScript(),
  parts.minifyCSS({
    options: {
      discardComments: {
        removeAll: true
      },
      // run nano in safe mode
      safe: true
    },
  }),
]);

module.exports = (env) => {
  if (env === "production") {
    return merge(commonConfig, productionConfig);
  }

  return merge(commonConfig, developmentConfig);
};
