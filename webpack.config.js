"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var webpack = require("webpack");
module.exports = {
    plugins: [
        new webpack.IgnorePlugin(/vertx/)
    ],
    entry: './server.js',
    output: {
        path: __dirname + '/dist',
        filename: 'server.js'
    },
    target: 'node'
};
//# sourceMappingURL=webpack.config.js.map