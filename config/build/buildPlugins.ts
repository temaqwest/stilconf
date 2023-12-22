import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import {BuildOptions} from "./types/config";
import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
const progressPlugin = webpack.ProgressPlugin

export default function buildPlugins({paths}: BuildOptions): webpack.WebpackPluginInstance[] {
    return [
        new HtmlWebpackPlugin({
            inject: true,
            title: "Application title",
            template: paths.html
        }),
        new progressPlugin((percentage: number, message: string, ...args: unknown[]) => {
            const normalizedPercentage = Math.trunc(percentage * 100)
            console.info('[PROGRESS]:', normalizedPercentage, message, ...args);
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name][contenthash:8].css',
            chunkFilename: 'css/[name][contenthash:8].css',
        }) // Отделение css из js чанка
    ]
}
