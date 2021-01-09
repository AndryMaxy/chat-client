//npm i -D webpack webpack-cli
//npm i -D webpack-dev-server
//npm i -D copy-webpack-plugin
//npm i -D html-webpack-plugin
//npm i -D clean-webpack-plugin
//npm i -D style-loader css-loader
//npm i -D file-loader
//npm i -D mini-css-extract-plugin
//npm i -D node-sass sass-loader
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

const getCopyPattern = (from) => ({
    from: path.resolve(__dirname, from),
    to: path.resolve(__dirname, 'public'),
});

const getCSSloaders = (loaders = []) => {
    return [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                hmr: isDev,
                reloadAll: true,
            },
        },
        'css-loader',
        ...loaders,
    ];
};

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        login: ['@babel/polyfill', './login/login.jsx'],
        chat: ['@babel/polyfill', './chat/chat.jsx'],
    },
    resolve: {
        fallback: {
            buffer: require.resolve('buffer/'),
            os: require.resolve('os-browserify/browser'),
            path: require.resolve('path-browserify'),
        },
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'public'),
    },
    plugins: [
        new HTMLPlugin({
            template: './chat/chat.ejs',
            minify: {
                collapseWhitespace: isProd,
            },
            inject: true,
            chunks: ['chat'],
            filename: 'chat.ejs',
        }),
        new HTMLPlugin({
            template: './login/login.ejs',
            minify: {
                collapseWhitespace: isProd,
            },
            inject: true,
            chunks: ['login'],
            filename: 'login.ejs',
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [getCopyPattern('src/favicon.ico'), getCopyPattern('src/msg.mp3')],
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
            babelRule(/\.jsx$/, ['@babel/preset-react']),
            {
                test: /\.css$/,
                //use: ["style-loader", "css-loader"],
                use: getCSSloaders(),
            },
            {
                test: /\.s[ac]ss$/,
                use: getCSSloaders(['sass-loader']),
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ['file-loader'],
            },
        ],
    },
};
