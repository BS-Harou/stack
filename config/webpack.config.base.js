const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const cssNext = require('postcss-cssnext');
const cssReporter = require('postcss-reporter')();
const StyleLintPlugin = require('stylelint-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';

let env = {
	production: NODE_ENV === 'production',
	staging: NODE_ENV === 'staging',
	test: NODE_ENV === 'test',
	development: NODE_ENV === 'development' || typeof NODE_ENV === 'undefined'
};

Object.assign(env, {
	build: (env.production || env.staging)
});

const appDirectory = fs.realpathSync(process.cwd());
const SRC_DIR = path.resolve(appDirectory, 'client/src');
const ASSETS_DIR = path.resolve(appDirectory, 'client/assets');
const DIST_DIR = path.resolve(appDirectory, 'dist');
const MODULES_DIR = path.resolve(appDirectory, 'node_modules');

const VendorCSSPlugin = new ExtractTextPlugin('vendor.css');
const MainCSSPlugin = new ExtractTextPlugin('main.css');

module.exports = {
	target: 'web',
	resolve: {
		modules: [SRC_DIR, 'node_modules'],
		extensions: ['.js', '.jsx', '.json']
	},

	context: appDirectory,

	entry: {
		main: [
			'@babel/polyfill',
			path.resolve(SRC_DIR, 'main.jsx'),
		]
	},

	output: {
		path: DIST_DIR,
		filename: '[name].js',
		publicPath: '/'
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
		}),
		new HtmlWebpackPlugin({
			title: 'Nájem',
			favicon: path.resolve(ASSETS_DIR, 'favicon.png')
		}),
		VendorCSSPlugin,
		MainCSSPlugin
	],

	optimization: {
		runtimeChunk: 'single',
		splitChunks: {
			cacheGroups: {
				default: false,
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendor',
					chunks: 'initial'
				}
			}
		}
	},

	module: {
		rules: [
			//{test: /\.scss$/, loader: 'style!css!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded'}
			{
				test: /(\.js|\.jsx)$/,
				enforce: 'pre',
				include: SRC_DIR,
				loader: 'eslint-loader',
				type: 'javascript/auto',
				options: {
					configFile: '.eslintrc.js'
				}
			},
			{
				test: /(\.js|\.jsx)$/,
				loader: 'babel-loader',
				type: 'javascript/auto',
				options: {
					cacheDirectory: true,
				},
				include: SRC_DIR
			},
			{
				test: /(\.css)$/,
				include: MODULES_DIR,
				use: VendorCSSPlugin.extract({
					fallback: 'style-loader',
					use: {
						loader: 'css-loader',
						options: {minimize: env.production}
					},
				})
			},
			{
				test: /(\.css)$/,
				include: SRC_DIR,
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
							camelCase: true,
							importLoaders: 1,
							localIdentName: '[name]--[local]--[hash:base64:8]',
							sourceMap: !env.production,
							minimize: env.production
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
