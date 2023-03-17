import { ResultEnum } from '@/enums/httpEnum';
import { Toast } from '@/utils/uniapi/prompt';
import Request from 'luch-request';

let BASE_URL = import.meta.env.VITE_OPEN_PROXY == 'true' ? '/proxy/' : import.meta.env.VITE_APP_API_BASEURL?.toString();

//#ifdef MP-WEIXIN
BASE_URL = import.meta.env.VITE_APP_API_BASEURL?.toString();
//#endif

const HEADER = {
	'Content-Type': 'application/json;charset=UTF-8;',
	Accept: 'application/json, text/plain, */*',
};

function createRequest() {
	return new Request({
		baseURL: BASE_URL,
		header: HEADER,
	});
}

export const request = createRequest();
/**
 * 请求拦截器
 */
request.interceptors.request.use(
	(options) => {
		return options;
	},
	(options) => Promise.reject(options)
);

/**
 * 响应拦截器
 */
request.interceptors.response.use(
	async (response) => {
		const { data: resData } = response;
		const { code, msg } = resData;
		if (code == ResultEnum.SUCCESS) {
			return Promise.resolve(resData);
		}
		Toast(msg);
		return Promise.reject(resData);
	},
	(response) =>
		// 请求错误做点什么。可以使用async await 做异步操作
		// error('Request Error!');
		Promise.reject(response)
);
