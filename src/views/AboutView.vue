<template>
    <div class="about">
        <h1>This is</h1>
        <div ref="chartRef" style="width: 600px; height: 400px"></div>
        <el-button @click="ajaxTest" type="primary" style="margin-left: 16px"> open </el-button>
    </div>
</template>
<script setup lang="ts">
import axios from 'axios';
import {onMounted, ref} from 'vue';
import echarts from '../plugins/echarts.ts';
const chartRef = ref<HTMLElement>();
const ajaxTest = () => {
  // http://dawei-code.top:9898/hello
  axios.get('/dawei/hello').then(res => {
    console.log(res);
  })
};
onMounted(() => {
    const chart = echarts.init(chartRef.value!);
    chart.setOption({
        title: {text: 'ECharts 按需引入示例'},
        tooltip: {},
        xAxis: {
            data: ['A', 'B', 'C', 'D']
        },
        yAxis: {},
        series: [
            {
                type: 'bar',
                data: [5, 20, 36, 10]
            }
        ]
    });
});
</script>
<style>
@media (min-width: 1024px) {
    .about {
        min-height: 100vh;
        display: flex;
        align-items: center;
    }
}
</style>
