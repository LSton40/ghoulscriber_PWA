const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest, GenerateSW} = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.join(__dirname, 'index.html'),
        favicon: './favicon.ico'
      }),
      new GenerateSW(),
      new InjectManifest({
        swSrc: './src-sw.js'
      }),
      new WebpackPwaManifest({
        name: 'JATE PWA',
        short_name: 'JATE',
        description: 'JATE Text Editor!',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        inject: true,
        fingerprints: false,
        start_url: '/',
        publicPath: '/',
        ios: true,
        icons: [{
            src: path.resolve('./src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
            ios: true,
            output: {
              filename: 'logo.png'
            }
          },
        ]
      })
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
        
      ],
    },
  };
};
