<template>
    <div class="line-chart" ref="lineChart" style="width: 600px; height: 400px;"></div>
</template>

<script>
import * as echarts from 'echarts';

export default {
    name: 'LineChart',
    mounted() {
        // 基于准备好的dom，初始化echarts实例
        this.lineChart = echarts.init(this.$refs.lineChart);
        // 指定图表的配置项和数据
        const option = {
            title: {
                text: '学生成绩折线图'
            },
            tooltip: {},
            xAxis: {
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            yAxis: {},
            series: [{
                name: '成绩',
                type: 'line',
                data: [90, 80, 85, 75, 95, 70, 88]
            }]
        };
        // 使用刚指定的配置项和数据显示图表。
        this.lineChart.setOption(option);
    },
    beforeDestroy() {
        // 销毁图表，释放资源
        if (this.lineChart) {
            this.lineChart.dispose();
        }
    }
};
</script>

<style scoped>
.line-chart {
    margin: auto;
}
</style>
