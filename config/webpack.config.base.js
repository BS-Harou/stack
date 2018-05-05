const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const cssNext = require('postcss-cssnext');
const cssReporter = require('postcss-reporter')();
const StyleLintPlugin = require('stylelint-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

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

const VendorCSSPlugin = new ExtractTextPlugin('css/vendor.css');

const publicUrl = 'https://localhost:8080';

module.exports = {
	target: 'web',
	resolve: {
		modules: [SRC_DIR, ASSETS_DIR, 'node_modules'],
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
		filename: 'js/[name].js',
		publicPath: '/',
	},

	plugins: [
		new webpack.DefinePlugin({
			__DEV__: env.development,
			__STAGING__: env.staging,
			__PRODUCTION__: env.production,
			__CURRENT_ENV__: `'${NODE_ENV}'`,
			'process.env': {
				NODE_ENV: `'${NODE_ENV}'`,
				PUBLIC_URL: `'${publicUrl}'`,
			},
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
		// Generate a service worker script that will precache, and keep up to date,
		// the HTML & assets that are part of the Webpack build.
		new SWPrecacheWebpackPlugin({
			// By default, a cache-busting query parameter is appended to requests
			// used to populate the caches, to ensure the responses are fresh.
			// If a URL is already hashed by Webpack, then there is no concern
			// about it being stale, and the cache-busting can be skipped.
			dontCacheBustUrlsMatching: /\.\w{8}\./,
			filename: 'js/service-worker.js',
			logger(message) {
				if (message.indexOf('Total precache size is') === 0) {
					// This message occurs for every build and is a bit too noisy.
					return;
				}
				if (message.indexOf('Skipping static resource') === 0) {
					// This message obscures real errors so we ignore it.
					// https://github.com/facebookincubator/create-react-app/issues/2612
					return;
				}
				console.log(message);
			},
			minify: true,
			// For unknown URLs, fallback to the index page
			navigateFallback: publicUrl + '/index.html',
			// Ignores URLs starting from /__ (useful for Firebase):
			// https://github.com/facebookincubator/create-react-app/issues/2237#issuecomment-302693219
			navigateFallbackWhitelist: [/^(?!\/__).*/],
			// Don't precache sourcemaps (they're large) and build asset manifest:
			staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
		}),
		new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
		VendorCSSPlugin,
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
				test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
				loader: 'file-loader',
				options: {
					name: 'assets/[name].[hash:8].[ext]',
				},
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
	}
};
