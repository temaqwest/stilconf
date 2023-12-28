import {BuildOptions} from "./types/config";
import type {Configuration as DevServerConf} from 'webpack-dev-server'

export default function buildDevServer({paths, port}: BuildOptions):DevServerConf {
    return {
        static: paths.html,
        compress: true,
        port,
        open: false, // Открытие вебстраницы при запуске dev-server
        historyApiFallback: true,
        hot: true,
        client: {
            overlay: true
        }
    }
}
