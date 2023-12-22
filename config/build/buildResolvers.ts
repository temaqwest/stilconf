import webpack from "webpack";
import path from "path";
import {BuildOptions} from "./types/config";

export default function buildResolvers(options: BuildOptions): webpack.ResolveOptions {

    const alias = {
        '@': path.resolve(__dirname, '../', '../', 'src/')
    }

    return {
        alias: alias,
        extensions: ['.tsx', '.ts', '.js', '.jsx', '.scss'],
        preferAbsolute: true,
        mainFiles: ['index'], // для каждого модуля главный файл - index
        modules: [
            options.paths.src,
            'node_modules'
        ]
    }
}
