'use strict';

var webpack = require('webpack'),
	path = require('path'),
	HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	devtool: 'eval-source-map',
	entry: [
		'webpack-hot-middleware/client?reload=true',
		path.resolve(__dirname, 'app', 'app.js')
	],
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel"
			},
			{
				test: /\.(jpe|jpg|woff|woff2|eot|ttf|svg)(\?.*$|$)/,
				exclude: /node_modules/,
				loader: 'url-loader?importLoaders=1&limit=100000'
			},
			{
				test: /\.scss$/,
				loaders: ['style', 'css', 'autoprefixer-loader?browsers=last 2 versions', 'sass']
			}
		]
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'build'),
		publicPath: '/'
	},
	plugins: [
		new HtmlWebpackPlugin({
			inject: true,
			template: 'app/index.html'
		}),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development')
		})
	],
	resolve: {
		root: path.resolve(__dirname, 'app'),
		extensions: ["", ".js"],
		modulesDirectories: ['node_modules', 'app']
	}
};
