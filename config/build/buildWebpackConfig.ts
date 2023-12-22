import path from 'path'
import webpack from "webpack";
import {BuildOptions} from "./types/config";
import buildResolvers from "./buildResolvers";
import buildPlugins from "./buildPlugins";
import buildDevServer from "./buildDevServer";
import {buildLoaders} from "./buildLoaders";

export default function buildWebpackConfig(config: BuildOptions): webpack.Configuration {
    const { paths, mode, isDev } = config

    return {
        entry: paths.entry,
        output: {
            filename: '[name].[contenthash].js',
            path: paths.build,
            clean: true
        },
        mode: mode,
        module: {
            rules: buildLoaders(config),
        },
        resolve: buildResolvers(config),
        plugins: buildPlugins(config),
        devtool: isDev ? 'inline-source-map' : undefined, // sourcemap, чтобы stack trace был более информативный
        devServer: isDev ? buildDevServer(config) : undefined
    }


}
