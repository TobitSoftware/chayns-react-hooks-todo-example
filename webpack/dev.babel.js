import path from 'path';
import fs from 'fs';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import getBaseConfig from './base-config';

const ROOT_PATH = path.resolve('./');
const ssl = {};

try {
    ssl.cert = fs.readFileSync(path.join(__dirname, 'ssl', 'ssl.crt'));
    ssl.key = fs.readFileSync(path.join(__dirname, 'ssl', 'ssl.key'));
} catch (e) {
    // eslint-disable-next-line no-console
    console.log('\n---------------------------\nNo SSL Certificate found.\n---------------------------\n');
}

export default {
    ...getBaseConfig(true),
    devServer: {
        host: '0.0.0.0',
        port: 8080,
        historyApiFallback: true,
        compress: true,
        disableHostCheck: true,
        cert: ssl.cert,
        key: ssl.key,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
        },
    },
    devtool: 'inline-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(ROOT_PATH, 'src/index.dev.html')
        }),
        new webpack.LoaderOptionsPlugin({
            debug: true
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            __DEV__: true,
            __STAGING__: false,
            __LIVE__: false,
        })
    ]
};
