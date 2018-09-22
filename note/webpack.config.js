const path = require('path')

const srcDir  = path.resolve(__dirname, 'src')
const dstDir = path.resolve(__dirname, 'public')

module.exports = {
  mode: 'development',
  entry: path.join(srcDir, 'index.js'),
  output: {
    path: dstDir,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: '/node_modules/',
        loader: 'babel-loader'
      }
    ]
  }
}
