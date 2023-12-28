import path from 'path'
import { type BuildEnv, type BuildMode, type BuildPaths } from './config/build/types/config'
import buildWebpackConfig from './config/build/buildWebpackConfig'
import { type Configuration } from 'webpack'

export default (env: BuildEnv) => {
	const paths: BuildPaths = {
		entry: path.resolve(__dirname, 'src', 'index.tsx'),
		build: path.resolve(__dirname, 'build'),
		html: path.resolve(__dirname, 'public', 'index.html'),
		src: path.resolve(__dirname, 'src')
	}

	const mode: BuildMode = env.mode as BuildMode || 'development'
	const isDev = mode === 'development'
	const PORT = Number(env.port) || 3000

	console.log('MODE: ', mode)
	console.log('PORT: ', PORT)

	const config: Configuration = buildWebpackConfig({
		mode,
		paths,
		isDev,
		port: PORT
	})

	console.log(paths)
	return config
}
