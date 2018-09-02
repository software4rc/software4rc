const webpack = require('webpack')
const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const WEB = path.join(__dirname, 'web')
const PUBLIC_DIR = path.join(__dirname, 'public')

const STYLES = path.join(WEB, 'styles')
const SCRIPTS = path.join(WEB, 'scripts')

module.exports = {

  mode: 'development',

  entry: {
    app: [
      `${SCRIPTS}/index.js`,
      `${STYLES}/index.less`,
    ]
  },

  output: {
    path: `${PUBLIC_DIR}`,
    filename: 'public.js'
  },

  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              noIeCompat: true
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(['public']),
    new HtmlWebPackPlugin({
      template: WEB + '/index.html',
      minify: true,
      hash: true
    }),
    new MiniCssExtractPlugin({
      filename: 'public.css'
    })
  ]
}