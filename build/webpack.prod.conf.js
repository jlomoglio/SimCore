var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
var waterfall = require('async-waterfall')
var chalk = require('chalk')

var env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : config.build.env

var strip_block = {
    module: {
        rules: [
            {
                test: /\.(js|vue)$/,
                enforce: 'pre',
                exclude: /(node_modules|bower_components|\.spec\.js)/,
                use: [
                    {
                        loader: 'webpack-strip-block'
                    }
                ]
            }
        ]
    }
};

var webpackConfig = merge(baseWebpackConfig, strip_block, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    // new StripCodeBlockPlugin (),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true
      },
      sourceMap: true
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css')
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: process.env.NODE_ENV === 'testing'
        ? 'index.html'
        : config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../src/assets'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}


var PostCompile = require('post-compile-webpack-plugin')
var shell = require('shelljs')
webpackConfig.plugins.push(
    new PostCompile(() => {
        if (!shell.which('git')) {
            shell.echo('Sorry, this script requires git')
            shell.exit(1)
        }
        shell.cd('./dist')
        waterfall([
            function (done) {
                shell.exec('find . -name \'*.css\' -print0 | xargs -0 sed -i \'\' \'s/\\/assets\\//..\\/..\\/assets\\//g\'', function(code, output) {
                    done()
                })
            },
            function (done) {
                shell.exec('find . -name \'app.*.js\' -print0 | xargs -0 sed -i \'\' \'s/\\"..\\/assets\\/audio\\//\\".\\/assets\\/audio\\//g\'', function(code, output) {
                    done()
                })
            },
            function (done) {
                shell.exec('find . -name \'app.*.js\' -print0 | xargs -0 sed -i \'\' \'s/\\"\\/assets\\/audio\\//\\".\\/assets\\/audio\\//g\'', function(code, output) {
                    done()
                })
            },
            function (done) {
                shell.exec('find . -name \'app.*.js\' -print0 | xargs -0 sed -i \'\' \'s/\\/assets\\/img\\//.\\/assets\\/img\\//g\'', function(code, output) {
                    done()
                })
            },
            function (done) {
                shell.exec('find . -name \'app.*.js\' -print0 | xargs -0 sed -i \'\' \'s/\\..\\/assets\\/video\\//.\\/assets\\/video\\//g\'', function(code, output) {
                    done()
                })
            },
            function (done) {
                shell.cd('./assets/video')
                shell.exec('find . -name \'*.html\' -print0 | xargs -0 sed -i \'\' \'s/\\/assets\\//..\\//g\'', function(code, output) {
                    done()
                });
            }
        ], function () {
            console.log(chalk.yellow(
                '  Tip #2: Copy the files from the dist folder located in the project.\n' +
                '  Paste the files in the folder on the server. Voila!'
            ))
        })
    })
)

if (config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
