const webpack = require('webpack');
const baseConfig = require('./webpack.base');
const merge = require('webpack-merge');
const mergeConfig = {
  mode: 'development', // development production
  devtool: 'cheap-module-eval-source-map', // dev cheap-module-eval-source-map build cheap-module-source-map'
  devServer: {
    contentBase: './dist',
    open: true,
    hot: true, // 开启热更新
    // hotOnly: true // 是否自动刷新
  },
  module: {
    rules: [{
      test: /\.scss$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2,
            modules: true // 开启模块化
          }
        },
        'sass-loader',
        'postcss-loader'
      ]
    },{
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader',
        'postcss-loader'
      ]
    }],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin() // 热更新插件
  ],
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js'
  }
}

module.exports = merge(baseConfig, mergeConfig);