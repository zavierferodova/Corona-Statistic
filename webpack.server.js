const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { InjectManifest } = require('workbox-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path')

module.exports = {
  mode: 'production',
  entry: {
    bundle: path.resolve(__dirname, 'index.js')
  },
  output: {
    path: path.resolve(__dirname, 'server/build'),
    filename: 'bundle/[name].js'
  },
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
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public'),
          to: path.resolve(__dirname, 'server/build')
        }
      ]
    }),
    new InjectManifest({
      swSrc: path.resolve(__dirname, 'javascript/worker/service-worker.js'),
      swDest: 'service-worker.js',
      maximumFileSizeToCacheInBytes: 4000000, // 4 MB
      exclude: [/server\.js$/]
    })
  ]
}
