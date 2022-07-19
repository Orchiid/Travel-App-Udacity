const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const WorkboxPlugin = require('workbox-webpack-plugin')

module.exports = {
    entry: './src/client/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
       assetModuleFilename: 'images/[hash][ext][query]'
      },
    mode: 'production',
    module: {
        rules: [
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /.scss$/,
                use: [ 'style-loader', 'css-loader', 'sass-loader' ]
                },
                {
                    test: /\.svg/,
                    type: 'asset/inline'
                },
                {
                    test: /\.png/,
                    type: 'asset/resource'
                 
                },
                 {
                   test: /\.html/,
                   type: 'asset/resource',
                   generator: {
                     filename: 'static/[hash][ext][query]'
                   }
                 }

        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        new WorkboxPlugin.GenerateSW({
            skipWaiting: true,
            clientsClaim: true,
        }),

    ]
}
