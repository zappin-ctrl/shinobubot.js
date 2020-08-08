require('dotenv').config();
const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

module.exports = (env) => {
    const devMode = (typeof env !== "undefined" ?
            (typeof env.mode === "string" ? env.mode : 'development') : 'development'
    );

    let settings = {
        mode: devMode,
        entry: [
            'babel-polyfill',
            path.resolve(__dirname, 'src', './index.js')
        ],
        target: 'node',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'app.' + devMode + '.js'
        },
        module: {
            rules: [{
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            '@babel/plugin-proposal-object-rest-spread',
                            '@babel/plugin-proposal-class-properties',
                            'lodash'
                        ]
                    }
                }
            }]
        },
        plugins: [
            new LodashModuleReplacementPlugin()
        ]
    };

    if (devMode === 'development')
        settings['devtool'] = 'inline-source-map';

    if (devMode === 'production') {
        settings['plugins'].push(new CompressionPlugin({
            filename: '[path].gz[query]'
        }));
    }

    return settings;
};