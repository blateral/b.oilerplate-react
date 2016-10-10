var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

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
        path: './dist/assets',
        publicPath: 'assets/',
        filename: 'app.bundle.js'
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
                loader: 'url?limit=10000&name=[path][name][hash:6].[ext]&context=src/assets'
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: '../index.html',
            template: './src/index.html'
        }),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        })
    ]
}
