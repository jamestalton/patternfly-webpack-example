/* eslint-disable i18next/no-literal-string */
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import CompressionPlugin from 'compression-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ReactRefreshTypeScript from 'react-refresh-typescript'
import webpack from 'webpack'
import { Configuration as DevServerConfiguration } from 'webpack-dev-server'
import * as path from 'path'
import { ConsoleRemotePlugin } from '@openshift-console/dynamic-plugin-sdk-webpack'

module.exports = function (_env: unknown, argv: { hot: boolean; mode: string | undefined }) {
    const isProduction = argv.mode === 'production' || argv.mode === undefined
    const isDevelopment = !isProduction

    const config: webpack.Configuration & { devServer: DevServerConfiguration } = {
        resolve: { extensions: ['.tsx', '.ts', '.js'] },
        module: {
            rules: [
                { test: /\.css$/, use: ['style-loader', 'css-loader'] },
                { test: /\.svg$/, use: 'file-loader' },
                {
                    test: /\.ts(x)?$/,
                    include: path.join(__dirname, 'src'),
                    use: [
                        {
                            loader: 'ts-loader',
                            options: {
                                configFile: isDevelopment ? 'tsconfig.dev.json' : 'tsconfig.json',
                                transpileOnly: true,
                                ...(isDevelopment && {
                                    getCustomTransformers: () => ({
                                        before: [ReactRefreshTypeScript()],
                                    }),
                                }),
                            },
                        },
                    ].filter(Boolean),
                },
            ],
        },
        plugins: [
            new ConsoleRemotePlugin(),
            isProduction && new CompressionPlugin({ algorithm: 'gzip' }),
            isProduction && new CompressionPlugin({ algorithm: 'brotliCompress', filename: '[path][base].br' }),
            isDevelopment && new ReactRefreshWebpackPlugin(),
            new HtmlWebpackPlugin({ title: 'test', favicon: 'public/favicon.svg' }),
        ].filter(Boolean) as webpack.WebpackPluginInstance[],
        devServer: {
            port: 3000,
            open: true,
            historyApiFallback: true,
            compress: true,
            https: true,
            hot: true,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
            },
            client: {
                overlay: false,
            },
        },
        devtool: isDevelopment && 'eval-cheap-module-source-map',
    }

    return config
}
