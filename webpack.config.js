const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const INPUT_DIR = path.resolve(__dirname, 'src');
const OUTPUT_DIR = path.resolve(__dirname, 'dist');

module.exports = {
  entry: path.join(INPUT_DIR, 'main.js'),
  output: {
    path: OUTPUT_DIR,
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(INPUT_DIR, 'index.html'),
      favicon: path.join(INPUT_DIR, 'favicon.ico')
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[name]__[local]--[hash:base64:5]'
              }
            }
          }
        ]
      },
      {
        test: /\.glsl$/,
        loader: 'glsl-shader-loader',
        options: {
          root: path.join(INPUT_DIR, 'shaders')
        }
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'assets/fonts'
        },
      },
      {
        test: /\.(jpg|jpeg|png|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[contenthash].[ext]',
          outputPath: 'assets/images'
        },
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    modules: [INPUT_DIR, 'node_modules']
  },
  optimization: {
    moduleIds: 'hashed',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  stats: {
    children: false,
    modules: false
  },
  devServer: {
    contentBase: OUTPUT_DIR,
    historyApiFallback: true,
    stats: 'errors-warnings'
  }
};
