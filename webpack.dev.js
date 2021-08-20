const { merge } = require('webpack-merge')
const path = require('path')
const commonConfiguration = require('./webpack.common')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(commonConfiguration, {
  mode: 'development',
  devServer: {
    static: {
      publicPath: '/',
      directory: path.resolve(__dirname, 'build'),
      watch: true
    },
    watchFiles: ['public/**/*']
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              injectType: 'lazyStyleTag'
            }
          },
          {
            loader: 'css-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/home.html'),
      filename: 'index.html',
      minify: false
    })
  ]
})
