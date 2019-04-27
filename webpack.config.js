const path = require("path");

const Autoprefixer = require("autoprefixer");
const CleanPlugin = require("clean-webpack-plugin");
const HTMLPlugin = require("html-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");

const distDir = path.resolve(__dirname, "dist");

module.exports = {
    context: path.resolve(__dirname, "src"),
    devServer: {
        historyApiFallback: true,
        port: 9000,
    },
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
        path: distDir,
    },
    mode: "development",
    module: {
        rules: [
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
                test: /\.js$/,
                loader: "babel-loader",
                exclude: path.resolve(__dirname, "node_modules"),
            },
            {
                test: /\.s?css$/,
                use: [
                    MiniCSSExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: [
                                Autoprefixer(),
                            ],
                            sourceMap: true,
                        },
                    },
                    "sass-loader",
                ],
            },
            {
                test: /\.txt$/,
                use: "raw-loader",
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
        ],
    },
    plugins: [
        new CleanPlugin(),
        new HTMLPlugin({
            favicon: "./assets/favicon.png",
            template: "./layout.html",
            hash: true,
        }),
        new MiniCSSExtractPlugin({
            filename: "[name].css",
        }),
    ],
    stats: "errors-only",
};
