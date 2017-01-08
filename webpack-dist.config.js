const webpack = require('webpack');

module.exports = {
    entry: {
        "oopify":     './src/Class.js',
        "oopify.all": './src/Class.all.js'
    },
    output: {
        path: './dist',
        filename: '[name].min.js',
        libraryTarget: 'umd'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ]
};