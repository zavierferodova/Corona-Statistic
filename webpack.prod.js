const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { InjectManifest } = require('workbox-webpack-plugin')
const commonConfiguration = require('./webpack.common')
const path = require('path')

module.exports = merge(commonConfiguration, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        ]
      },
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
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/home.html'),
      filename: 'index.html',
      minify: true
    }),
    new InjectManifest({
      swSrc: path.resolve(__dirname, 'src/worker/service-worker.js'),
      swDest: 'service-worker.js',
      maximumFileSizeToCacheInBytes: 4000000, // 4 MB
      exclude: [/server\.js$/]
    })
  ]
})
