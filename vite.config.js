import { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'

const root = resolve(__dirname, 'src')
const outDir = resolve(__dirname, 'dist')


export default defineConfig(({ command, mode }) => {
	const env = loadEnv(mode, process.cwd(), '')

	return {
		define: {
			__VITE_SUPABASE_API_KEY__: JSON.stringify(env.VITE_SUPABASE_API_KEY)
		},
		root,
		envDir: '../',
		publicDir: resolve(__dirname, 'public'),
		resolve: {
			alias: {
				'@': resolve(__dirname, 'src'),
				'@utils': resolve(__dirname, 'src/utils'),
				'@template': resolve(__dirname, 'src/template'),
				'@pages': resolve(__dirname, 'src/pages'),
				'@articles': resolve(__dirname, 'public/articles')
			}
		},
		build: {
			outDir,
			emptyOutDir: true,
			rollupOptions: {
				input: {
					main: resolve(__dirname, 'src/index.html'),
					kamen_rider: resolve(__dirname, 'src/shrines/kamen_rider/index.html'),
					MTG: resolve(__dirname, 'src/shrines/MTG/index.html'),
					GUI: resolve(__dirname, 'src/shrines/GUI/index.html'),
				}
			},
			// rollDownOptions: {
			// 	external: ['./public/raw'],
			// 	input: {


			// 	}
			// }
		}
	}

})