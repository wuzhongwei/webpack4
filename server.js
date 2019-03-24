const ex = require('express');
const webpack = require('webpack');
const webpackDevMidd = require('webpack-dev-middleware');
const config = require('./webpack.config');
const complier = webpack(config);
const app = ex();

app.use(webpackDevMidd(complier, {
  publicPath: config.output.publicPath
}))
app.listen(3000, () => {
  console.log('成功')
});