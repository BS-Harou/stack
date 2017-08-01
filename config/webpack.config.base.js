var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
var cssNext = require('postcss-cssnext');
var cssReporter = require('postcss-reporter')();
var StyleLintPlugin = require('stylelint-webpack-plugin');

var NODE_ENV = process.env.NODE_ENV || 'development';

var env = {
	production: NODE_ENV === 'production',
	staging: NODE_ENV === 'staging',
	test: NODE_ENV === 'test',
	development: NODE_ENV === 'development' || typeof NODE_ENV === 'undefined'
};

Object.assign(env, {
	build: (env.production || env.staging)
});

const appDirectory = fs.realpathSync(process.cwd());
// const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
	target: 'web',
	resolve: {
		modules: [
			path.join(appDirectory, 'client'),
			'node_modules'
		],
		extensions: ['.js', '.jsx', '.json']
	},

	context: appDirectory,

	entry: [
		'babel-polyfill',
		'./client/main.jsx'
	],

	output: {
		path: path.join(appDirectory, 'dist'),
		filename: 'main.js',
		publicPath: '/static/',
		pathinfo: false
	},

	plugins: [
		new webpack.DefinePlugin({
			__DEV__: env.development,
			__STAGING__: env.staging,
			__PRODUCTION__: env.production,
			__CURRENT_ENV__: '\'' + (NODE_ENV) + '\''
		}),
		new LodashModuleReplacementPlugin({
			'collections': true,
			'shorthands': true
		}),
		new StyleLintPlugin({
			files: ['./client/**/*.css']
		})
	],

	module: {
		rules: [
			//{test: /\.scss$/, loader: 'style!css!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded'}
			{
				test: /(\.js|\.jsx)$/,
				enforce: 'pre',
				include: path.join(appDirectory, 'client'),
				loader: 'eslint-loader',
				options: {
					configFile: '.eslintrc.js'
				}
			},
			{
				test: /(\.js|\.jsx)$/,
				loader: 'babel-loader',
				include: path.join(appDirectory, 'client')
			},
			{
				test: /(\.css)$/,
				include: path.join(appDirectory, 'client'),
				use: [
					{
						loader: 'style-loader',
						options: {
							sourceMap: !env.production
						}
					},
					{
						loader: 'css-loader',
						options: {
							modules: true,
							importLoaders: 1,
							localIdentName: '[name]--[local]--[hash:base64:8]',
							sourceMap: !env.production
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							plugins: [
								cssNext,
								cssReporter
							],
							sourceMap: !env.production
						}
					}
				]
			}
		],

		noParse: [/\.min\.js/]
	}
};
