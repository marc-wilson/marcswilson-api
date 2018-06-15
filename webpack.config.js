"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var webpack = require("webpack");
var copywebpack = require("copy-webpack-plugin");
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
};
//# sourceMappingURL=webpack.config.js.map