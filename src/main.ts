import { setupStore } from '@/state';
import '@/styles/index.scss';
import dayjs from 'dayjs';
import uviewPlus from 'uview-plus';
import { createSSRApp } from 'vue';
import App from './App.vue';
import useFileProxy from './hooks/useFileProxy';

export function createApp() {
	const app = createSSRApp(App);

	app.use(uviewPlus);
	dayjs.locale('zh-cn');
	app.config.globalProperties.$dayjs = dayjs;
	app.config.globalProperties.$fileProxy = useFileProxy;

	// Configure store
	setupStore(app);

	return {
		app,
	};
}
