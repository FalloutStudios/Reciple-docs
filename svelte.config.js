// @ts-check
import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import remarkHeaderId from 'remark-heading-id';
import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [
		vitePreprocess(),
		mdsvex({
			// @ts-expect-error
			remarkPlugins: [[remarkHeaderId, { defaults: true }]]
		})
	],
	kit: {
		adapter: adapter({
			runtime: 'nodejs20.x'
		}),
	},
	extensions: [
		'.svelte',
		'.svx'
	]
};

export default config;
