<template>
	<view class="content">
		<vue3-echarts ref="chart1" class="echart" :options="options1" canvas-id="echartsBar1" @click="handelChart"></vue3-echarts>
		<vue3-echarts ref="chart2" class="echart" :options="options2" canvas-id="echartsBar2" @click="handelChart"></vue3-echarts>
		<vue3-echarts ref="chart3" class="echart" :options="options3" canvas-id="echartsBar3" @click="handelChart"></vue3-echarts>
	</view>
</template>

<script setup>
import * as echarts from 'echarts';
import { reactive, ref } from 'vue';
const chart = ref(null);

const options1 = reactive({
	grid: {
		left: '5%',
		right: '5%',
		bottom: '5%%',
		top: '5%',
		containLabel: true,
	},
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'none',
		},
		formatter: function (params) {
			return params[0].name + ' : ' + params[0].value;
		},
		backgroundColor: 'rgba(50,50,50,0.7)',
		textStyle: {
			color: '#fff',
		},
	},
	xAxis: [
		{
			type: 'category',
			axisLabel: {
				show: true,
				rotate: 35,
				textStyle: {
					color: '#fff',
				},
			},
			splitLine: {
				show: false,
			},
			axisTick: {
				show: false,
			},
			axisLine: {
				show: false,
			},
			data: ['安徽省', '河南省', '浙江省', '湖北省', '贵州省', '江西省', '江苏省', '四川省', '云南省', '湖南省'],
		},
		{
			type: 'category',
			axisTick: 'none',
			axisLine: 'none',
			show: true,
			axisLabel: {
				textStyle: {
					color: '#ffffff',
					fontSize: '12',
				},
			},
			data: [55, 67, 72, 74, 117, 135, 144, 154, 181, 239],
		},
	],
	yAxis: {
		show: false,
		type: 'value',
	},
	series: [
		{
			name: '值',
			type: 'bar',
			z: 1,
			itemStyle: {
				normal: {
					barBorderRadius: 10,
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{
							offset: 1,
							color: 'rgb(57,89,255,1)',
						},
						{
							offset: 0,
							color: 'rgb(46,200,207,1)',
						},
					]),
				},
			},
			barWidth: 10,
			data: [55, 67, 72, 74, 117, 135, 144, 154, 181, 239],
		},
		{
			name: '背景',
			type: 'bar',
			z: 0,
			barWidth: 10,
			barGap: '-100%',
			data: [300, 300, 300, 300, 300, 300, 300, 300, 300, 300],
			itemStyle: {
				normal: {
					color: 'rgba(24,31,68,1)',
					barBorderRadius: 10,
				},
			},
		},
	],
});
const options2 = reactive({
	grid: {
		left: '5%',
		right: '5%',
		bottom: '5%%',
		top: '5%',
		containLabel: true,
	},
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'none',
		},
		formatter: function (params) {
			return params[0].name + ' : ' + params[0].value;
		},
		backgroundColor: 'rgba(50,50,50,0.7)',
		textStyle: {
			color: '#fff',
		},
	},
	xAxis: {
		show: false,
		type: 'value',
	},
	yAxis: [
		{
			type: 'category',
			axisLabel: {
				show: true,
				textStyle: {
					color: '#fff',
				},
			},
			splitLine: {
				show: false,
			},
			axisTick: {
				show: false,
			},
			axisLine: {
				show: false,
			},
			data: ['安徽省', '河南省', '浙江省', '湖北省', '贵州省', '江西省', '江苏省', '四川省', '云南省', '湖南省'],
		},
		{
			type: 'category',
			axisTick: 'none',
			axisLine: 'none',
			show: true,
			axisLabel: {
				textStyle: {
					color: '#ffffff',
					fontSize: '12',
				},
			},
			data: [55, 67, 72, 74, 117, 135, 144, 154, 181, 239],
		},
	],
	series: [
		{
			name: '值',
			type: 'bar',
			z: 1,
			itemStyle: {
				normal: {
					barBorderRadius: 10,
					color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
						{
							offset: 0,
							color: 'rgb(57,89,255,1)',
						},
						{
							offset: 1,
							color: 'rgb(46,200,207,1)',
						},
					]),
				},
			},
			barWidth: 10,
			data: [55, 67, 72, 74, 117, 135, 144, 154, 181, 239],
		},
		{
			name: '背景',
			type: 'bar',
			z: 0,
			barWidth: 10,
			barGap: '-100%',
			data: [300, 300, 300, 300, 300, 300, 300, 300, 300, 300],
			itemStyle: {
				normal: {
					color: 'rgba(24,31,68,1)',
					barBorderRadius: 10,
				},
			},
		},
	],
});

const options3 = reactive({
	grid: {
		left: '0%',
		right: '5%',
		bottom: '5%%',
		top: '5%',
		containLabel: true,
	},
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'none',
		},
		backgroundColor: 'rgba(50,50,50,0.7)',
		textStyle: {
			color: '#fff',
		},
	},
	legend: {
		data: ['人口', '面积'],
		align: 'left',
		itemGap: 20,
		itemWidth: 10, // 图例图形宽度
		itemHeight: 10, // 图例图形高度
		textStyle: {
			color: '#fff',
			fontSize: 12,
		},
	},
	xAxis: [
		{
			type: 'category',
			axisLabel: {
				show: true,
				textStyle: {
					color: '#fff',
				},
			},
			splitLine: {
				show: false,
			},
			axisTick: {
				show: false,
			},
			axisLine: {
				show: false,
			},
			data: ['安徽省', '河南省', '浙江省', '湖北省', '贵州省'],
		},
		{
			type: 'category',
			inverse: true,
			axisTick: 'none',
			axisLine: 'none',
			show: true,
			axisLabel: {
				show: false,
			},
			data: [55, 67, 72, 74, 117, 135, 144, 154, 181, 239],
		},
	],
	yAxis: {
		show: false,
		type: 'value',
	},
	series: [
		{
			name: '人口',
			type: 'bar',
			itemStyle: {
				normal: {
					barBorderRadius: 10,
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{
							offset: 1,
							color: 'rgb(57,89,255,1)',
						},
						{
							offset: 0,
							color: 'rgb(46,200,207,1)',
						},
					]),
				},
			},
			barWidth: 10,
			data: [15, 25, 35, 54, 139],
		},
		{
			name: '面积',
			type: 'bar',
			itemStyle: {
				normal: {
					barBorderRadius: 10,
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{
							offset: 1,
							color: 'rgb(57,89,255,1)',
						},
						{
							offset: 0,
							color: 'rgb(46,200,207,1)',
						},
					]),
				},
			},
			barWidth: 10,
			data: [105, 125, 135, 154, 239],
		},
	],
});

// chart 点击回调
const handelChart = (val) => {
	console.log(val);
};
</script>

<style>
.content {
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	background-color: #121b2c;
	padding-bottom: 100upx;
}
.title {
	width: 100;
	background-color: rgba(255, 255, 255, 0.1);
	padding: 24upx;
	height: 80upx;
	line-height: 80upx;
	color: #fff;
	font-size: 36upx;
	font-weight: bold;
	text-align: center;
}
.echart {
	padding-top: 30upx;
	width: 100%;
	height: 500upx;
}
</style>
