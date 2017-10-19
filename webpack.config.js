var path = require('path');

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        vendor: ['jquery', 'react', 'react-dom'],
        app: './src/js/main.js'
    },
    output: {
        publicPath: '/',
        path: path.join(__dirname, 'dist'),
        filename: '[name].[hash].js'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [path.join(__dirname, 'src', 'components'), path.join(__dirname, 'src'), 'node_modules']
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                test: /\.js$/,
                include: [path.resolve(__dirname, 'src', 'js')],
                query: {
                    plugins: ['transform-runtime'],
                    presets: ['es2015', 'react']
                }
            },
            {
                include: /\.css$/,
                loaders: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("styles.css"),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.optimize\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: {removeAll: true } },
            canPrint: true
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            minify: false
        }),
        new UglifyJSPlugin()
    ]
};
