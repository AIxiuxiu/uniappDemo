<template>
	<!-- #ifdef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO -->
	<canvas :id="canvasId" type="2d" class="echarts" :canvas-id="canvasId" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd" />
	<!-- #endif -->
	<!-- #ifndef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO -->
	<canvas :id="canvasId" class="echarts" :canvas-id="canvasId" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd" />
	<!-- #endif -->
</template>
<script setup>
/**
 * vue3 echarts 兼容uni-app
 * @description vue3 echart兼容uni-app
 * @property {Object} options 图表配置数据
 * @property {String} canvasId 画布id
 * @example <vue3-echarts ref="echarts" :options="options" canvasId="echarts"></vue3-echarts>
 */
import WxCanvas from './wx-canvas.js';
// import echarts from "./echarts" //按需引入
import * as echarts from 'echarts';
import { getCurrentInstance, nextTick, onBeforeUnmount, onMounted, watch } from 'vue';
const instance = getCurrentInstance();
const exposeObj = {}; // 导出组件方法、echart实例
var chartInstance;
const props = defineProps({
	canvasId: {
		type: String,
		default: 'echarts',
	},
	options: {
		type: Object,
		default: () => {
			return {};
		},
	},
});
const emits = defineEmits(['click']);
let ctx = null;

onMounted(() => {
	echarts.registerPreprocessor((options) => {
		if (options && options.series) {
			if (options.series.length > 0) {
				options.series.forEach((series) => {
					series.progressive = 0;
				});
			} else if (typeof options.series === 'object') {
				options.series.progressive = 0;
			}
		}
	});
});

onBeforeUnmount(() => {
	chartInstance && chartInstance.clear();
});

// #ifdef H5
//H5绘制图表
const initChart = (options) => {
	ctx = uni.createCanvasContext(props.canvasId, instance);
	chartInstance = echarts.init(document.getElementById(props.canvasId));
	chartInstance.clear();
	chartInstance.setOption(options ? options : props.options);
	chartInstance.on('click', function (params) {
		emits('click', params);
	});
	exposeObj.chart = chartInstance;
};
//H5生成图片
const canvasToTempFilePath = (opt) => {
	const base64 = chartInstance.getDataURL();
	opt.success && opt.success({ tempFilePath: base64 });
};
exposeObj.canvasToTempFilePath = canvasToTempFilePath;
// #endif
// #ifndef H5
//绘制图表
const initChart = async (options) => {
	// #ifdef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO
	const canvasAttr = await getCanvasAttr2d();
	// #endif
	// #ifndef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO
	const canvasAttr = await getCanvasAttr();
	// #endif
	const { canvas, canvasWidth, canvasHeight, canvasDpr } = canvasAttr;
	chartInstance = echarts.init(canvas, null, {
		width: canvasWidth,
		height: canvasHeight,
		devicePixelRatio: canvasDpr, // new
	});
	canvas.setChart(chartInstance);
	chartInstance.clear();
	chartInstance.setOption(options ? options : props.options);
	chartInstance.on('click', function (params) {
		emits('click', params);
	});
	exposeObj.chart = chartInstance;
};
//生成图片
const canvasToTempFilePath = (opt) => {
	// #ifdef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO
	var query = uni
		.createSelectorQuery()
		// #ifndef MP-ALIPAY
		.in(instance);
	// #endif
	query
		.select('#' + props.canvasId)
		.fields({ node: true, size: true })
		.exec((res) => {
			const canvasNode = res[0].node;
			opt.canvas = canvasNode;
			uni.canvasToTempFilePath(opt, instance);
		});
	// #endif
	// #ifndef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO
	if (!opt.canvasId) {
		opt.canvasId = props.canvasId;
	}
	ctx.draw(true, () => {
		uni.canvasToTempFilePath(opt, instance);
	});
	// #endif
};
exposeObj.canvasToTempFilePath = canvasToTempFilePath;
// #endif

const getCanvasAttr2d = function () {
	return new Promise((resolve, reject) => {
		const query = uni.createSelectorQuery().in(instance);
		query
			.select('#' + props.canvasId)
			.fields({
				node: true,
				size: true,
			})
			.exec((res) => {
				const canvasNode = res[0].node;
				const canvasDpr = uni.getSystemInfoSync().pixelRatio;
				const canvasWidth = res[0].width;
				const canvasHeight = res[0].height;
				ctx = canvasNode.getContext('2d');

				const canvas = new WxCanvas(ctx, props.canvasId, true, canvasNode);
				echarts.setCanvasCreator(() => {
					return canvas;
				});
				resolve({
					canvas,
					canvasWidth,
					canvasHeight,
					canvasDpr,
				});
			});
	});
};

const getCanvasAttr = function () {
	return new Promise((resolve, reject) => {
		ctx = uni.createCanvasContext(props.canvasId, instance);
		var canvas = new WxCanvas(ctx, props.canvasId, false);
		echarts.setCanvasCreator(() => {
			return canvas;
		});
		const canvasDpr = 1;
		var query = uni
			.createSelectorQuery()
			// #ifndef MP-ALIPAY
			.in(instance);
		// #endif
		query
			.select('#' + props.canvasId)
			.boundingClientRect((res) => {
				const canvasWidth = res.width;
				const canvasHeight = res.height;
				resolve({
					canvas,
					canvasWidth,
					canvasHeight,
					canvasDpr,
				});
			})
			.exec();
	});
};
const touchStart = (e) => {
	if (chartInstance && e.touches.length > 0) {
		var touch = e.touches[0];
		var handler = chartInstance.getZr().handler;
		handler.dispatch('mousedown', {
			zrX: touch.x,
			zrY: touch.y,
		});
		handler.dispatch('mousemove', {
			zrX: touch.x,
			zrY: touch.y,
		});
		handler.processGesture(wrapTouch(e), 'start');
	}
};
const touchMove = (e) => {
	if (chartInstance && e.touches.length > 0) {
		var touch = e.touches[0];
		var handler = chartInstance.getZr().handler;
		handler.dispatch('mousemove', {
			zrX: touch.x,
			zrY: touch.y,
		});
		handler.processGesture(wrapTouch(e), 'change');
	}
};

const touchEnd = (e) => {
	if (chartInstance) {
		const touch = e.changedTouches ? e.changedTouches[0] : {};
		var handler = chartInstance.getZr().handler;
		handler.dispatch('mouseup', {
			zrX: touch.x,
			zrY: touch.y,
		});
		handler.dispatch('click', {
			zrX: touch.x,
			zrY: touch.y,
		});
		handler.processGesture(wrapTouch(e), 'end');
	}
};
const wrapTouch = function (event) {
	for (let i = 0; i < event.touches.length; ++i) {
		const touch = event.touches[i];
		touch.offsetX = touch.x;
		touch.offsetY = touch.y;
	}
	return event;
};

watch(
	props.options,
	(newValue, oldValue) => {
		if (newValue.series) {
			nextTick(() => {
				initChart(newValue);
			});
		}
	},
	{
		deep: true,
		immediate: true,
	}
);
defineExpose(exposeObj); //导出组件方法、echart实例
</script>
<style lang="scss" scoped>
.echarts {
	width: 100%;
	height: 100%;
}
</style>
