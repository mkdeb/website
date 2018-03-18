const fs = require("fs");
const path = require("path");

const Autoprefixer = require("autoprefixer");
const CleanPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HTMLPlugin = require("html-webpack-plugin");

const distPath = path.resolve(__dirname, "dist");

module.exports = {
    context: path.resolve(__dirname, "src"),
    devtool: "source-map",
    entry: {
        app: "./app",
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: "all",
                    name: "vendor",
                    test: /node_modules/,
                },
            },
        },
    },
    output: {
        filename: "[name].js",
        path: distPath,
    },
    mode: "development",
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                minimize: {
                                    discardComments: {
                                        removeAll: true,
                                    },
                                },
                            },
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                plugins: [
                                    Autoprefixer(),
                                ],
                            },
                        },
                        {
                            loader: "sass-loader",
                        },
                    ],
                }),
            },
            {
                test: /\.html$/,
                use: {
                    loader: "html-loader",
                    options: {
                        minimize: true,
                        conservativeCollapse: false,
                        removeAttributeQuotes: false,
                    },
                },
            },
            {
                test: /\.(png|woff2?)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                    },
                },
            },
            {
                test: /\.txt$/,
                use: "raw-loader",
            },
        ],
    },
    plugins: [
        new CleanPlugin([
            distPath,
        ]),
        new ExtractTextPlugin({
            filename: "./style.css",
        }),
        new HTMLPlugin({
            favicon: "./assets/favicon.png",
            template: "./layout.html",
            hash: true,
        }),
    ],
    stats: "errors-only",
    devServer: {
        historyApiFallback: true,
        port: 9000,
    },
};
