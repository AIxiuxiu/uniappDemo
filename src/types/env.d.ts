// / <reference types="vite/client" />

declare module '*.vue' {
	import { DefineComponent } from 'vue';
	// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
	const component: DefineComponent<{}, {}, any>;
	export default component;
}

interface ImportMetaEnv {
	readonly VITE_ENV: string;
	readonly VITE_APP_TITLE: string;
	readonly VITE_APP_API_BASEURL: string;
	readonly VITE_APP_STORE_PREFIX: string;
	readonly VITE_SERVER_FILES_PROXY: string;

	readonly VITE_SERVER_PORT: number;
	readonly VITE_SERVER_BASE: string;
	readonly VITE_BUILD_OUTDIR: string;
	readonly VITE_BUILD_SOURCEMAP: string;
	readonly VITE_BUILD_DROP_CONSOLE: string;
	readonly VITE_OPEN_PROXY: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
