import { type BuildOptions } from './types/config'
import type webpack from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

export function buildLoaders({ isDev }: BuildOptions): webpack.RuleSetRule[] {
    const styleLoaders = {
        test: /\.s[ac]ss$/i,
        use: [
            // "style-loader" creates `style` nodes from JS strings
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            // Translates CSS into CommonJS
            {
                loader: 'css-loader',
                options: {
                    modules: {
                        auto: (resPath: string) => resPath.includes('.module.'),
                        localIdentName: isDev
                            ? '[path][name]__[local]'
                            : '[hash:base64:8]'
                    }
                }
            },
            // Compiles Sass to CSS
            'sass-loader'
        ]
    }

    const babelLoader = {
        // test: /\.(js|jsx|tsx)$/,
        // exclude: /node_modules/,
        // use: {
        // 	loader: 'babel-loader',
        // 	options: {
        // 		presets: ['@babel/preset-env'],
        // 		plugins: [
        // 			[
        // 				'i18next-extract',
        // 				{
        // 					locales: ['ru', 'en'],
        // 					keyAsDefaultValue: true
        // 				}
        // 			]
        // 		]
        // 	}
        // }
    }

    const tsLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
    }

    const svgLoader = {
        test: /\.svg$/,
        use: ['@svgr/webpack']
    }

    const fileLoader = {
        test: /\.(png|jpe?g|gif|mp4)$/i,
        use: [{ loader: 'file-loader' }]
    }

    return [fileLoader, svgLoader, babelLoader, tsLoader, styleLoaders]
}
