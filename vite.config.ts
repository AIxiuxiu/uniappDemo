import uni from '@dcloudio/vite-plugin-uni';
import { resolve } from 'path';
import { ConfigEnv, loadEnv, UserConfig } from 'vite';

// https://vitejs.cn/config/
export default ({ mode, command }: ConfigEnv): UserConfig => {
	const env = loadEnv(mode, process.cwd());
	return {
		base: env.VITE_SERVER_BASE,
		resolve: {
			alias: {
				'@': resolve('./src'),
			},
		},
		server: {
			host: '0.0.0.0', // IP配置，支持从IP启动
			open: false,
			port: +env.VITE_SERVER_PORT,
			// 请求代理
			proxy: {
				'/proxy': {
					target: env.VITE_APP_API_BASEURL,
					changeOrigin: command === 'serve' && env.VITE_OPEN_PROXY == 'true',
					rewrite: (path) => path.replace(/\/proxy/, ''),
				},
				'/files': {
					target: env.VITE_SERVER_FILES_PROXY,
					changeOrigin: command === 'serve' && env.VITE_OPEN_PROXY == 'true',
					rewrite: (path) => path.replace(/\/files/, ''),
				},
			},
		},
		build: {
			outDir: resolve(__dirname, `${env.VITE_BUILD_OUTDIR}`),
			sourcemap: env.VITE_BUILD_SOURCEMAP == 'true',
			emptyOutDir: true,
			minify: 'terser',
			chunkSizeWarningLimit: 1500,
			terserOptions: {
				compress: {
					drop_console: env.VITE_BUILD_DROP_CONSOLE == 'true',
					drop_debugger: env.VITE_BUILD_DROP_CONSOLE == 'true',
				},
			},
		},
		plugins: [uni()],
		css: {
			// css预处理器
			preprocessorOptions: {
				scss: {
					charset: false,
					additionalData: '@import "@/styles/globals.scss";',
				},
			},
			postcss: {
				plugins: [
					require('postcss-pxtorpx-pro')({
						// 转化的单位
						unit: 'rpx',
						// 单位精度
						unitPrecision: 5,
						// 不需要处理的css选择器
						selectorBlackList: [],
						// 不需要转化的css属性
						propBlackList: [],
						// 直接修改px，还是新加一条css规则
						replace: true,
						// 是否匹配媒介查询的px
						mediaQuery: false,
						// 需要转化的最小的pixel值，低于该值的px单位不做转化
						minPixelValue: 2,
						// 不处理的文件
						exclude: /node_modules|components/gi,
						// 转化函数
						// 视口375px
						transform: (x: any) => 2 * x,
					}),
					{
						postcssPlugin: 'internal:charset-removal',
						AtRule: {
							charset: (atRule) => {
								if (atRule.name === 'charset') {
									atRule.remove();
								}
							},
						},
					},
				],
			},
		},
	};
};
