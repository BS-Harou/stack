var path = require('path');
var webpack = require('webpack');

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

module.exports = {
	target: 'web',

	resolve: {
		modules: [
			path.join(__dirname, "client"),
			'node_modules'
		],
		extensions: ['.js', '.jsx', '.json']
	},

	context: __dirname,

	entry: [
		'babel-polyfill',
		'./client/main.jsx'
	],

	output: {
		path: path.join(__dirname, 'dist'),
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
		})
	],

	module: {
		rules: [
			//{test: /\.scss$/, loader: 'style!css!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded'}
			{
				test: /(\.js|\.jsx)$/,
				enforce: "pre",
				include: path.join(__dirname, "client"),
				loader: 'eslint-loader',
				options: {
					configFile: '.eslintrc.js'
				}
			},
			{
				test: /(\.js|\.jsx)$/,
				loader: 'babel-loader',
				include: path.join(__dirname, 'client')
			},
			{
				test: /(\.css)$/,
				include: path.join(__dirname, "client"),
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: true,
							localIdentName: '[name]--[local]--[hash:base64:8]'
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							plugins: []
						}
					}
				]
			},
			{
				test: /(\.css)$/,
				include: path.join(__dirname, "node_modules/bootstrap"),
				use: [
					'style-loader', 'css-loader'
				]
			}
		],

		noParse: [/\.min\.js/]
	}
};
