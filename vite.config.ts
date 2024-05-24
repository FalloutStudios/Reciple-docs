import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit()
	],
	build: {
		outDir: './build'
	},
	server: {
		fs: {
			allow: ['./src/guides']
		}
	},
	assetsInclude: ['./src/guides']
});
