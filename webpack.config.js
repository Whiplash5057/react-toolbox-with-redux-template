const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractPlugin = new ExtractTextPlugin({
  filename: 'main.css'
});
const HTMLWebpackPlugin = require('html-webpack-plugin');
const htmlplugin = new HTMLWebpackPlugin({
      template: 'src/www/index.html'
      // baseUrl: './'
    });
const settings = {
  entry: {
    bundle: [
      'react-hot-loader/patch',
      './src/frontend/index.js'
    ]
  },
  output: {
    filename: '[name].js',
    // publicPath: 'build',
    path: path.resolve('build')
  },
  resolve: {
    extensions: ['.js', '.json', '.css']
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        options: {
          presets: [
            ['es2015', { modules: false }],
            'stage-2',
            'react'
          ],
          plugins: [
            'transform-node-env-inline'
          ],
          env: {
            development: {
              plugins: ['react-hot-loader/babel']
            }
          }
        }
      },
      {
        test: /\.sass$/,
        use: extractPlugin.extract({
          use: [{
            loader: 'css-loader',
            options: {
              minimize: true
            }
          },
          'sass-loader']
        })
      },
      {
        test: /\.(jpg|jpeg|gif|png)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'img/',
              publicPath: ''
            }
          }
        ]
      },
      {
        test: /\.(css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 1,
              localIdentName: '[name]--[local]--[hash:base64:8]'
            }
          },
          'postcss-loader' // has separate config, see postcss.config.js nearby
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.resolve('src/www'),
    publicPath: 'http://localhost:8080/', // full URL is necessary for Hot Module Replacement if additional path will be added.
    quiet: false,
    hot: true,
    historyApiFallback: true,
    inline: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    htmlplugin,
    extractPlugin,
    new CleanWebpackPlugin(['build'])
  ]
};

module.exports = settings;
