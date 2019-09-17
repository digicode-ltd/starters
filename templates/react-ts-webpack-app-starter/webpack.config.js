const webpack = require('webpack');
const path = require('path');

// variables
const isProduction = process.argv.indexOf('-p') >= 0 || process.env.NODE_ENV === 'production';
const sourcePath = path.join(__dirname /*, './src'*/);
const outPath = path.join(__dirname, './build');

// plugins
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = env => {
  // Use env.<YOUR VARIABLE> here:
  const appTarget = env && env.APP_TARGET || '';
  console.log('APP_TARGET', appTarget);

  return {
    mode: isProduction ? 'production' : 'development', // "production" | "development" | "none"
    entry: {
      app: './src/index.tsx',
    },
    output: {
      filename: '[hash].js',
      path: outPath,
    },
    module: {
      rules: [
        // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
        {
          enforce: 'pre',
          test: /\.js$/,
          loader: 'source-map-loader',
        },
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                // disable type checker - we will use it in fork plugin
                transpileOnly: true,
                happyPackMode: true,
                configFile: 'tsconfig.json',
              },
            },
            // 'awesome-typescript-loader'
          ],
        },
        // css
        {
          test: /\.css$/,
          use: [
            {
              loader: 'style-loader',
              options: {
                sourceMap: !isProduction,
              },
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: !isProduction,
              },
            },
          ],
        },
        // static assets
        {
          test: /\.(a?png|svg|jpe?g|gif|bmp|mp3|mp4|ogg|wav|eot|ttf|woff|woff2)$/,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
        // {
        //   test: /\.(png|gif|jpe?g|svg)$/i,
        //   loader: 'url-loader',
        //   query: {
        //     limit: 1000,
        //     mimetype: 'image/png',
        //     name: 'resources/images/[name].[ext]?h=[hash]',
        //     publicPath: '../../',
        //   },
        // },
        {
          test: /\.html$/,
          loader: 'html-loader',
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json'],
      // Fix webpack's default behavior to not load packages with jsnext:main module
      // (jsnext:main directs not usually distributable es6 format, but es6 sources)
      mainFields: ['module', 'browser', 'main'],
      // alias: {
      //   'react-dnd': 'react-dnd/index.js',
      // },
      plugins: [new TsconfigPathsPlugin({ /*configFile: "./path/to/tsconfig.json" */ })],
    },
    devtool: isProduction ? 'hidden-source-map' : 'cheap-module-eval-source-map', // https://webpack.js.org/configuration/devtool/
    context: sourcePath,
    target: 'web',
    devServer: {
      contentBase: sourcePath,
      hot: true,
      inline: true,
      historyApiFallback: {
        disableDotRule: true,
      },
      stats: 'minimal',
      clientLogLevel: 'warning',
    },
    plugins: [
      new webpack.NormalModuleReplacementPlugin(/@env/, appTarget ? `@env/environment.${appTarget}` : '@env'),
      new webpack.EnvironmentPlugin({
        NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
        DEBUG: false,
        BUILD_DATE: new Date(Date.now()),
      }),
      new ForkTsCheckerWebpackPlugin({
        tslint: true,
        checkSyntacticErrors: true,
        watch: ['./src'], // optional but improves performance (fewer stat calls)
        reportFiles: ['src/**/*', '!node-modules/**/*'],
      }),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './src/index.html',
      }),
      // new webpack.SourceMapDevToolPlugin({
      //   filename: '[file].map',
      //   sourceRoot: '../', // {workspaceRoot} relative to ./dist/
      // }),
    ],
    node: {
      // workaround for webpack-dev-server issue
      // https://github.com/webpack/webpack-dev-server/issues/60#issuecomment-103411179
      fs: 'empty',
      net: 'empty',
      __filename: true,
      __dirname: true,
    },
  };
};
