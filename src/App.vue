<script setup lang="ts">
import { useRouterStore } from '@/state/modules/router';
import { useUserStore } from '@/state/modules/user';
import { removeInterceptor, setupInterceptors } from '@/utils/interceptors';
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app';
onLaunch(() => {
	console.log('App Launch');
	removeInterceptor();

	setupInterceptors();
	const appStore = useRouterStore();
	appStore.initialize();
});
onShow(() => {
	const userStore = useUserStore();
	userStore.initUserInfo();
	console.log('App Show');
});
onHide(() => {
	console.log('App Hide');
});
</script>
<style lang="scss">
// @import 'uview-plus/index';

// page {
// 	height: 100%;
// }

// uni-page-body {
// 	height: 100%;
// }
</style>
