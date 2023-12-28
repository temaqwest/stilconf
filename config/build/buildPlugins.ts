import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import {BuildOptions} from "./types/config";
import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
const progressPlugin = webpack.ProgressPlugin
import CopyPlugin from "copy-webpack-plugin";

export default function buildPlugins({paths, isDev}: BuildOptions): webpack.WebpackPluginInstance[] {
    return [
        new HtmlWebpackPlugin({
            inject: true,
            title: "Application title",
            template: paths.html
        }),
        new progressPlugin((percentage: number, message: string, ...args: unknown[]) => {
            const normalizedPercentage = Math.trunc(percentage * 100)
            // console.info('[PROGRESS]:', normalizedPercentage, message, ...args);
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name][contenthash:8].css',
            chunkFilename: 'css/[name][contenthash:8].css',
        }), // Отделение css из js чанка
        new webpack.DefinePlugin({
            __IS_DEV__: JSON.stringify(isDev)
        }),
        new CopyPlugin({
            patterns: [
                { from: 'public/locales', to: 'locales' }
            ]
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
}
