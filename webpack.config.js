const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
let WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
// publicPath = '../../';
module.exports = {
	entry: './src/app.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/app.js',
		publicPath:WEBPACK_ENV==='dev'? '/dist/': 'http://47.107.53.57/root/www/dist/'
	},
	resolve:{
		alias:{
			pages:path.resolve(__dirname,'src/pages')
		}
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env','react','stage-2']
					}
				}
			},
			{
				test: /\.css$/,
				exclude:/(node_modules|antd\.css)/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: "css-loader?modules&localIdentName=[name]-[hash:base64:5]"
				})
			 },
			 {
				test: /\.scss$/,
				exclude:/(node_modules)/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader?modules&localIdentName=[name]-[hash:base64:5]', 'sass-loader']
				})
		 	},
			{
						test: /\.css$/,
						include:/(node_modules|antd\.css)/,
		        use: ExtractTextPlugin.extract({
		          fallback: "style-loader",
		          use: "css-loader"
		        })
		   },
		   {
						test: /\.scss$/,
						include:/(node_modules|antd\.css)/,
		        use: ExtractTextPlugin.extract({
		          fallback: 'style-loader',
		          use: ['css-loader', 'sass-loader']
		        })
	     	},
	     	{
		        test: /\.(png|jpg|gif)$/,
		        use: [
		          {
		            loader: 'url-loader',
		            options: {
		              limit: 8192,
		              name:'resource/[name]-[hash:base64:5].[ext]'
		            }
		          }
		        ]
		    },
		    {
		        test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
		        use: [
		          {
		            loader: 'url-loader',
		            options: {
		              limit: 8192,
		              name:'resource/[name].[ext]'
		            }
		          }
		        ]
		    }
		    
		]
	},
	resolve:{
		alias:{
			components : path.resolve(__dirname,'src/components'),
			pages      : path.resolve(__dirname,'src/pages'),
			common		 : path.resolve(__dirname,'src/common'),
			store 		 : path.resolve(__dirname,'src/store'),
			util			 : path.resolve(__dirname,'src/util'),
			api				 : path.resolve(__dirname,'src/api'),
			images 		 : path.resolve(__dirname,'src/images'),
			config 		 : path.resolve(__dirname,'src/config'),
			base       : path.resolve(__dirname,'src')
		}
	},
	devServer: {
			 port:8087,
			 historyApiFallback:{
				index:'/dist/index.html'
			}
  },
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			favicon:'./favicon.ico'
		}),
		new ExtractTextPlugin("css/[name].css"),
		//提出公共模块
		new webpack.optimize.CommonsChunkPlugin({
			name:'common',
			filename:'js/base.js'
		})
	]
};