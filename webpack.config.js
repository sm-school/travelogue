const path = require('path');

module.exports = {
	entry: './frontend/src/index.js',
	devtool: 'source-map',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'backend/static/dist'),
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				loader: 'babel-loader',
			}, {
				test: /\.js$/,
				exclude: /(node_modules)/,
				loader: 'eslint-loader',
				options: {
					fix: true,
				},
			}, {
				test: /\.scss$/,
				use: [
					'style-loader',
					'css-loader',
					'sass-loader',
				],
			},
		],
	},
};
