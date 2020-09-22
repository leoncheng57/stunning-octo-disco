const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const pug = {
    test: /\.pug$/,
    use: ['html-loader', 'pug-html-loader']
};

const js = {
    test: /\.js$/,
    exclude: /(node_modules)/,
    use: {
        loader: 'babel-loader',
        options: {
            presets: ['@babel/preset-env']
        }
    }
}

const scss = {
    test: /\.(sa|sc|c)ss$/,
    // Loaders are applying from right to left(!)
    use: [
        {loader: MiniCssExtractPlugin.loader},
        {loader: "css-loader"},
        {loader: "postcss-loader"},
        {
            // First we transform SASS to standard CSS
            loader: "sass-loader",
            options: {
                implementation: require("sass")
            }
        }
    ]
}

const config = {
    entry: './src/app.js',
    output: {
      path: path.resolve(__dirname, 'docs'),
      filename: '[name].js'
    },
    devServer: {
        port: 3000,
    },
    module: {
      rules: [pug, js, scss]
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
        }),
        new MiniCssExtractPlugin({
            filename: "bundle.css"
        })
    ]
};

module.exports = config;