<script setup>
import { reactive, ref, defineProps } from 'vue'
import { useModeStore } from '@/stores/mode'
const store = useModeStore()

const props = defineProps(['data'])
import * as CanvasJS from '@canvasjs/charts'
CanvasJS.addColorSet('colors1', ['#BA68C8', '#7986CB', '#4FC3F7', '#4DB6AC', '#DCE775', '#FFB74D'])

const options = reactive({
  theme: store.isDark ? 'dark2' : 'light2',
  exportEnabled: true,
  animationEnabled: true,
  title: {
    text: 'YaIM solishtiruvi'
  },
  axisY: {
    title: 'YaIM (mlrd. $ da)'
  },
  toolTip: {
    shared: true
  },
  legend: {
    cursor: 'pointer',
    itemclick: function (e) {
      if (typeof e.dataSeries.visible === 'undefined' || e.dataSeries.visible) {
        e.dataSeries.visible = false
      } else {
        e.dataSeries.visible = true
      }
      e.chart.render()
    }
  },
  data: [
    {
      type: 'line',
      name: 'Germaniya',
      showInLegend: true,
      color: '#F7C705',
      toolTipContent:
        '<img src="https://canvasjs.com/wp-content/uploads/images/gallery/javascript-column-bar-charts/germany.png" style="height:11px;width:18px;"> {name}: {y}',
      dataPoints: [
        { label: '2015', y: 3890.1 },
        { label: '2016', y: 4164.7 },
        { label: '2017', y: 4411.7 },
        { label: '2018', y: 4561.6 },
        { label: '2019', y: 4692.1 },
        { label: '2020', y: 4573.3 },
        { label: '2021', y: 4888.4 },
        { label: '2022', y: 5316.9 }
      ]
    },
    {
      type: 'line',
      name: 'Yaponiya',
      showInLegend: true,
      color: '#012066',
      toolTipContent:
        '<img src="https://canvasjs.com/wp-content/uploads/images/gallery/javascript-column-bar-charts/japan.png" style="height:11px;width:18px;"> {name}: {y}',
      dataPoints: [
        { label: '2015', y: 5200.9 },
        { label: '2016', y: 5159.7 },
        { label: '2017', y: 5248.4 },
        { label: '2018', y: 5408.4 },
        { label: '2019', y: 5485.4 },
        { label: '2020', y: 5295.1 },
        { label: '2021', y: 5606.6 },
        { label: '2022', y: 6110.0 }
      ]
    }
  ]
})
const styleOptions = reactive({
  width: '100%',
  height: '360px'
})
</script>

<template>
  <CanvasJSChart class="dark:bg-gray-900 bg-white" :options="options" />
</template>

<style lang="scss" scoped></style>
