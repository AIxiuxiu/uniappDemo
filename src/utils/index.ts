import { isObject } from '@/utils/is';

/**
 * 深度合并
 * @param src
 * @param target
 */
export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
	let key: string;
	for (key in target) {
		src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key]);
	}
	return src;
}

// 获取当前环境的服务商
export const getProvider = (service: 'oauth' | 'share' | 'payment' | 'push' = 'oauth') => {
	return new Promise((resolve, reject) => {
		uni.getProvider({
			service,
			success: function (res) {
				// 此处可以排除h5
				if (res.provider) {
					resolve(res.provider[0]);
				}
			},
			fail() {
				reject('获取环境服务商失败');
			},
		});
	});
};

// 第三方登录，默认微信登录
export const wxLogin = (provider: 'weixin' | 'qq' | 'sinaweibo' | 'xiaomi' | 'apple' | 'univerify' = 'weixin') => {
	return new Promise((resolve, reject) => {
		uni.login({
			provider,
			success: function (res) {
				console.log(res);
				resolve(res);
			},
			fail: function (err) {
				console.log(err);
				reject(err);
			},
		});
	});
};

// 获取第三方用户信息，默认获取微信用户微信
export const getWxUserInfo = (provider: 'weixin' | 'qq' | 'sinaweibo' | 'xiaomi' | 'apple' = 'weixin') => {
	return new Promise((resolve, reject) => {
		uni.getUserProfile({
			provider,
			success: function (res) {
				console.log(res);
				resolve(res.userInfo);
			},
			fail: function (err) {
				reject(err);
			},
		});
	});
};
