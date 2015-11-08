'use strict';

var webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    TransferWebpackPlugin = require('transfer-webpack-plugin'),
    path = require('path'),
    nodeModulesPath = path.resolve(__dirname, 'node_modules'),
    srcPath = path.join(__dirname, 'src');

module.exports = {
    target: 'web',
    cache: true,
    entry: {
        app: path.join(srcPath, 'app.js'),
        common: ['react']
    },
    resolve: {
        root: srcPath,
        extensions: ["", ".js", ".jsx"],
        modulesDirectories: ['node_modules', 'src']
    },
    output: {
        path: path.join(__dirname, 'tmp'),
        publicPath: '',
        filename: '[name].js',
        library: ['Example', '[name]'],
        pathInfo: true
    },
    module: {
        preLoaders: [
            {
                //Eslint loader
                test: /\.(js|jsx)$/,
                loader: 'eslint-loader',
                include: [path.resolve(__dirname, "src/app")],
                exclude: [nodeModulesPath]
            }
        ],
        loaders: [
            {
                test: /\.js?$/,
                exclude: [nodeModulesPath],
                loader: 'babel',
                query: {
                    cacheDirectory: true,
                    optional: ['es7.decorators', 'es7.classProperties']
                }
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass']
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('common', 'common.js'),
        new HtmlWebpackPlugin({
            inject: true,
            template: 'src/index.html'
        }),
        new TransferWebpackPlugin([
            { from: 'src/fonts', to: 'fonts' }
        ]),
        new webpack.NoErrorsPlugin()
    ],
    debug: true,
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        contentBase: './tmp',
        historyApiFallback: true
    },
    eslint: {
        configFile: '.eslintrc'
    }
};