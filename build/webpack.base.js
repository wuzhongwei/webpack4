const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const AddAs = require('add-asset-html-webpack-plugin');
const webpack = require('webpack');
//https://github.com/webpack/analyse 打包分析工具
// IgnorePlugin 可以优化moment的语言包
//happypack模块 多进程打包
module.exports = { 
  entry: {
    main: './src/index.js',
  },
  resolve: { // 解析 第三方包
    extensions: ['.js', '.jsx'], // 处理后缀名文件
    alias: {
      img: path.resolve(__dirname, '../src/img') // 取别名方便调用
    }
  },
  noParse: /jquery/, // 不去解析jquery中的依赖
  module: {
    rules: [{
      test: /\.(jpg|png|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'images/',
          limit: 20480
        }
      }
    },
    {
      test: /\.(eot|ttf|svg)$/,
      use: ['file-loader']
    },
    {
      rules: [
        { 
          test: /\.jsx?$/, // js或者jsx
          // exclude: /node_modules/, //排除
          include: path.resolve(__dirname, '../src'),
          use: [
            {
              loader: 'babel-loader'
            },
          ]
        }
      ]
    }],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      // minify: {
      //   removeAttributeQuotes: true, // 去掉html双引号
      //   collapseWhitespace: true // 压缩成一行
      // }
    }),
    new CleanWebpackPlugin(),
    new AddAs({
      filepath: path.resolve(__dirname, '../dll/vendors.dll.js')
    }),
    // new webpack.DllReferencePlugin({ // 如果vendors.dll.json里有react和react-dom, 不用再node_modules里在找
    //   manifest: path.resolve(__dirname, '../dll/vendors.manifest.json')
    // })
    // new webpack.ProvidePlugin({ // 全局jquere
    //   $: 'jquery'
    // })
  ],
  //externals: ['jquery'], // 排除不打包
  optimization: { 
    usedExports: true,  // 设置tree shaking package.json sideEffects 生产环境可以不用写，但sideEffects必须加上
    splitChunks: { // code splitting（同步代码） 代码分割 ，提取公共代码，比如lodash，异步代码分割是通过(import)
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name: 'vendors'
        }
      },
      // cacheGroups: {
      //   vendors: false,
      //   default: false
      // }
    }
  },
  // performance: false, // 去掉警告
  output: {
    path: path.resolve(__dirname, '../dist'),
    // library: 'wzw', // 打包方式 实现自己的库
    // libraryTarget: 'umd' // 打包方式 实现自己的库
  }
}