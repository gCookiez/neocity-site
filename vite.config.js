import {resolve} from 'path'
import { defineConfig } from 'vite'

const root = resolve(__dirname, 'src')
const outDir = resolve(__dirname, 'dist')

export default defineConfig({
	build: {
		outDir,
		emptyOutDir: true,
		rollupOptions: {
			input: {
				main: resolve(__dirname, 'index.html'),
				gallery: resolve(__dirname, 'src/pages/gallery.html')
			}
		}
	}
})