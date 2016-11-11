var webpack = require('webpack'),
    CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

var plugins = [
    //new CommonsChunkPlugin('./public/common.js'),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
];

if (process.env.NODE_ENV === 'production') {
    plugins.push(new webpack.optimize.UglifyJsPlugin({}));
}

module.exports = {
    devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'eval',
    entry: {
        index: './app/app'
    },
    output: {
        filename: 'assets/bin/[name].js',
        path: './public',
        publicPath: '/'
    },
    module: {
        loaders: [
            {
                test: /app(\/|\\).*\.(js|jsx)$/,
                loader: 'babel',
                query: 
                    cacheDirectory: true,
                    presets: ['es2015', 'stage-0', 'react']
                }
            }
        ]
    },
    plugins: plugins,
    resolve: {
        extensions: ['', '.js', '.json', '.jsx']
    }
};
