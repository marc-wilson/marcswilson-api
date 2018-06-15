import * as webpack from 'webpack';
import * as copywebpack from 'copy-webpack-plugin';

module.exports = {
    plugins: [
        new webpack.IgnorePlugin(/vertx/),
        new copywebpack([
            {
                from: 'web.config',
                to: ''
            }
        ])
    ],
    entry: './src/server.js',
    output: {
        path: __dirname + '/dist',
        filename: 'server.js'
    },
    target: 'node'
}