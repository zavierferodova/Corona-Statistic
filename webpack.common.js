const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  resolve: {
    modules: [__dirname, 'node_modules'],
    alias: {
      '@src': path.resolve(__dirname, './src')
    }
  },
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
    })
  ]
}
