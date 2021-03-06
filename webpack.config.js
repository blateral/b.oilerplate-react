var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');

function getBabelPresets(defaultPresets) {
    var presets = defaultPresets;

    if(!process.env.NODE_ENV) {
        presets.push('react-hmre')
    }

    return presets;
}

function getDevtool() {
    if(process.env.NODE_ENV === 'production') {
        return 'cheap-module-source-map'
    } else {
        return 'eval'
    }
}

module.exports = {
    devtool: getDevtool(),
    entry: {
        app: './src/index.js',
        vendor: [
            'react',
            'react-dom'
        ]
    },

    output: {
        path: './dist',
        filename: 'js/app.bundle.js'
    },

    module: {

        preLoaders: [
            {
                test: /\.js$/,
                loader: 'eslint-loader',
                exclude: /node_modules/
            }
        ],

        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: getBabelPresets(['es2015', 'react'])
                }
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'url?limit=10000&name=assets/[path][name][hash:6].[ext]&context=src/assets'
            },
            {
                test: /\.scss$/,
                loader: process.env.NODE_ENV === 'production' ? ExtractTextPlugin.extract('style', 'css?modules=true&localIdentName=[local]---[hash:6]!postcss!sass') : 'style!css?modules=true&localIdentName=[local]---[hash:6]!postcss!sass'
            }
        ]
    },

    postcss: function() {
        return [autoprefixer]
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'js/vendor.bundle.js'),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new ExtractTextPlugin('css/main.css'),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
    ]
}
