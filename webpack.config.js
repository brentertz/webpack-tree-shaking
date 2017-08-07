const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');
const path = require('path');

const uglifyJsPlugin = new UglifyJSPlugin();

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.join(process.cwd(), 'dist')
  },
  devtool: false,
  externals: {
    react: {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react'
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['env', {
                'useBuiltIns': false,
                'loose': true,
                'modules': false,
                'debug': false
              }],
              'react'
            ],
            plugins: [
              'annotate-pure-call-in-variable-declarator',
              // path.resolve(__dirname, 'babel-plugin-pure-module.js')
            ]
          }
        }
      }
    ]
  },
  plugins: [
    uglifyJsPlugin  // FIXME: requires uglify-es and "pure" comment, but does exclude classes
    // new BabiliPlugin() // FIXME: does not exclude es classes
  ]
};
