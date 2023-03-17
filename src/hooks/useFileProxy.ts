/**
 * 使用minio图片
 * @param url 文件路径
 */
export default function useFileProxy(url: string) {
	//#ifdef MP-WEIXIN
	if (url.startsWith('/files/')) {
		url = url.replace('/files/', import.meta.env.VITE_SERVER_FILES_PROXY?.toString());
	}
	//#endif
	return url;
}
