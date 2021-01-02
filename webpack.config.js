//npm i -D webpack webpack-cli
//npm i -D webpack-dev-server
//npm i -D copy-webpack-plugin
//npm i -D html-webpack-plugin
//npm i -D clean-webpack-plugin
//npm i -D style-loader css-loader
//npm i -D file-loader
//npm i -D mini-css-extract-plugin
//npm i -D cross-env
//npm i -D babel-loader @babel/core
//npm i -D @babel/preset-env
//npm i -S @babel/polyfill
//npm i -D @babel/plugin-proposal-class-properties
//npm i -D @babel/preset-react
//npm i -D @babel/preset-typescript
//npm i -D eslint-loader
//npm i -D eslint
//npm i -D babel-eslint
//npx webpack

const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const babelRule = (test, presets = []) => {
    const rule = {
        test,
        exclude: /node_modules/,
        use: [
            {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'].concat(presets),
                    plugins: ['@babel/plugin-proposal-class-properties'],
                },
            },
            'eslint-loader',
        ],
    };
    return rule;
};

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: ['@babel/polyfill', './index.jsx'],
    resolve: {
        fallback: {
            buffer: require.resolve('buffer/'),
            os: require.resolve('os-browserify/browser'),
        },
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HTMLPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: isProd,
            },
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/favicon.ico'),
                    to: path.resolve(__dirname, 'dist'),
                },
            ],
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
    ],
    optimization: {
        splitChunks: {
            chunks: 'all', //vendors
        },
    },
    devServer: {
        port: 4200,
        hot: isDev,
    },
    devtool: isDev ? 'source-map' : false,
    module: {
        rules: [
            babelRule(/\.js$/),
            babelRule(/\.ts$/, ['@babel/preset-typescript']),
            //babelRule(/\.jsx$/, ['@babel/preset-react']),
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react'],
                            plugins: ['@babel/plugin-proposal-class-properties'],
                        },
                    },
                    'eslint-loader',
                ],
            },
            {
                test: /\.css$/,
                //use: ["style-loader", "css-loader"],
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: isDev,
                            reloadAll: true,
                        },
                    },
                    'css-loader',
                ],
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ['file-loader'],
            },
        ],
    },
};
