const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
 
const pug = {
    test: /\.pug$/,
    use: ['html-loader', 'pug-html-loader']
};

const config = {
    entry: './src/app.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js'
    },
    devServer: {
        port: 3000,
    },
    module: {
      rules: [pug]
    },
    plugins: [
        new LiveReloadPlugin({
            appendScriptTag: true
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.pug'
        }),
        new HtmlWebpackPlugin({
            filename: 'projects.html',
            template: 'src/projects.pug'
        })
    ]
};

module.exports = config;