import { defineStore } from 'pinia';

interface UserState {
	phone?: string;
	name?: string;
	companyName?: string;
	duty?: string;
	type: number; //账号类型 0：游客，1：管理员 2：子账号
}

// user info key
export const USER_INFO_KEY = 'USER__INFO__';

export const useUserStore = defineStore({
	id: 'user',
	state: (): UserState => ({
		phone: '',
		name: '',
		companyName: '',
		duty: '',
		type: 0,
	}),
	getters: {
		getPhone: (state) => state.phone,
		isLogin: (state): boolean => !!state.phone,
	},
	actions: {
		initUserInfo() {
			const userInfo = uni.getStorageSync(USER_INFO_KEY);
			this.$patch(userInfo);
		},
		setUserInfo(userInfo: Partial<UserState>) {
			uni.setStorageSync(USER_INFO_KEY, userInfo);
			this.$patch(userInfo);
		},
		logout() {
			uni.removeStorageSync(USER_INFO_KEY);
			this.$reset();
		},
	},
});
