'use strict';

var path = require('path'),
	webpack = require('webpack'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	ExtractTextPlugin = require('extract-text-webpack-plugin'),
	StatsPlugin = require('stats-webpack-plugin');

module.exports = {
	entry: [
		path.join(__dirname, 'app/app.js')
	],
	output: {
		path: path.join(__dirname, '/build/'),
		filename: '[name]-[hash].min.js'
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new HtmlWebpackPlugin({
			template: 'app/index.html',
			inject: 'body',
			filename: 'index.html'
		}),
		new ExtractTextPlugin('[name]-[hash].min.css'),
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: false,
				screw_ie8: true
			}
		}),
		new StatsPlugin('webpack.stats.json', {
			source: false,
			modules: false
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
		})
	],
	module: {
		loaders: [
			{
				test: /\.js?$/,
				exclude: /node_modules/,
				loader: 'babel'
			},
			{
				test: /\.(jpe|jpg|woff|woff2|eot|ttf|svg)(\?.*$|$)/,
				exclude: /node_modules/,
				loader: 'url-loader?importLoaders=1&limit=100000&name=[path][name]-[hash].[ext]'
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract('style', 'css!autoprefixer-loader?browsers=last 2 versions!sass!')
			}
		]
	},
	resolve: {
		root: path.resolve(__dirname, 'app'),
		extensions: ["", ".js"],
		modulesDirectories: ['node_modules', 'app']
	}
};
