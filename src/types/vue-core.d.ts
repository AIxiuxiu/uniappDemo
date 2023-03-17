/*
 * @Description: vue相关声明
 * @Author: ahl
 * @Date: 2021-09-29 10:43:20
 * @LastEditTime: 2023-03-08 14:36:02
 */

import dayjs from 'dayjs';

declare module '@vue/runtime-core' {
	export interface ComponentCustomProperties {
		$dayjs: typeof dayjs;
		$fileProxy: (url: string) => string;
	}
}
