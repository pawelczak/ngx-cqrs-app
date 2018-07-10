const webpack = require('webpack'),
	webpackMerge = require('webpack-merge'),
	commonConfig = require('./webpack.common.js'),
	DefinePlugin = require('webpack/lib/DefinePlugin'),
	LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
	UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

const config = webpackMerge(commonConfig, {

	mode: 'production',

	devtool: 'source-map',

	plugins: [
		new DefinePlugin({
			'ENV': JSON.stringify(ENV)
		}),
		new LoaderOptionsPlugin({
			minimize: true,
			debug: false,
			options: {
				tslint: {
					emitErrors: false,
					failOnHint: false,
					resourcePath: 'src'
				}
			}
		})
	],

	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				uglifyOptions: {
					compress: true,
					ecma: 6,
					output: {
						comments: false
					},
					compress: {
						dead_code: true,
						drop_console: false
					}
				},
				sourceMap: false
			})
		]
	}

});

module.exports = config;
