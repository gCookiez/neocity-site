import { resolve } from 'path'
import { defineConfig } from 'vite'

const root = resolve(__dirname, 'src')
const outDir = resolve(__dirname, 'dist')

export default defineConfig({
	root,
	resolve: {
		alias: {
			'@articles': resolve(__dirname, '/articles'),
		}
	},
	build: {
		outDir,
		emptyOutDir: true,
		rollupOptions: {
			input: {
				main: resolve(__dirname, 'src/index.html'),
				gallery: resolve(__dirname, 'src/gallery/index.html'),
			}
		}
	}
})