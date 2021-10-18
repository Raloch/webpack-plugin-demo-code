const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExamplePlugin = require('./ExamplePlugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')

module.exports = {
  cache: {
    type: 'filesystem'
  },
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(css|less)$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: path.resolve(__dirname, './exampleLoader.js'),
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    // new CaseSensitivePathsPlugin(),
    new ExamplePlugin()
  ],
}
