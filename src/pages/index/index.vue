<template>
	<view class="content">
		<vue3-echarts ref="chart" class="echart" :options="options" canvas-id="echarts" @click="handelChart"></vue3-echarts>
	</view>
</template>

<script setup>
import { reactive } from 'vue';
const options = reactive({
	color: ['#008cff', '#c4e300'],
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			// 坐标轴指示器，坐标轴触发有效
			type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
		},
		confine: true,
		backgroundColor: 'rgba(50,50,50,0.7)',
		textStyle: {
			color: '#fff',
		},
	},
	legend: {
		data: ['销量', '收入'],
		textStyle: {
			color: '#fff',
			fontSize: 12,
		},
	},
	grid: {
		left: 20,
		right: 20,
		bottom: 15,
		top: 40,
		containLabel: true,
	},
	xAxis: {
		type: 'category',
		data: ['10.01', '10.02', '10.03', '10.04', '10.05', '10.06', '10.07'],
		axisTick: {
			show: false,
		},
	},
	yAxis: {
		type: 'value',
		splitLine: {
			show: false,
		},
		axisTick: {
			show: false,
		},
		axisLine: {
			show: false,
		},
	},
	series: [
		{
			name: '销量',
			data: [20, 30, 40, 50, 60, 70, 80],
			type: 'bar',
			barWidth: 10,
		},
		{
			name: '收入',
			data: [30, 40, 50, 60, 70, 80, 90],
			type: 'bar',
			barWidth: 10,
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
}
.title {
	width: 100;
	background-color: rgba(255, 255, 255, 0.1);
	margin-bottom: 40upx;
	padding: 24upx;
	height: 80upx;
	line-height: 80upx;
	color: #fff;
	font-size: 36upx;
	font-weight: bold;
	text-align: center;
}
.echart {
	width: 100%;
	height: 1600upx;
}
.btns {
	display: flex;
	justify-content: center;
}
.btns-item {
	padding: 10upx;
}
</style>
