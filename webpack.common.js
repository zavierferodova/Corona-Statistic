const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { InjectManifest } = require('workbox-webpack-plugin')

module.exports = {
  entry: {
    bundle: path.resolve(__dirname, 'index.js')
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle/[name].js'
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public'),
          to: path.resolve(__dirname, 'build/')
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
