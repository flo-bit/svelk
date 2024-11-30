import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	// ssr: { noExternal: ['plyr'] },
	plugins: [sveltekit()]
});
