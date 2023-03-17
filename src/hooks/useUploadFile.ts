import useFileProxy from './useFileProxy';

export default function useUploadFile(url) {
	let BASE_URL = import.meta.env.VITE_OPEN_PROXY == 'true' ? '/proxy/' : import.meta.env.VITE_APP_API_BASEURL?.toString();
	//#ifdef MP-WEIXIN
	BASE_URL = import.meta.env.VITE_APP_API_BASEURL?.toString();
	//#endif
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: BASE_URL + '/file/upload', // 仅为示例，非真实的接口地址
			filePath: url,
			name: 'files',
			formData: {
				bucketName: 'user',
				preview: 'perm',
			},
			success: (res) => {
				console.error(res.data);
				const result = JSON.parse(res.data);
				if (result.data.length > 0) {
					resolve(useFileProxy(result.data[0].url));
				} else {
					reject();
				}
			},
			fail: () => {
				reject();
			},
		});
	});
}
