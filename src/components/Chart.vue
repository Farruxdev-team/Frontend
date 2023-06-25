<script setup>
  import { reactive, defineProps } from 'vue';

  const props = defineProps(['data'])

  import * as CanvasJS from '@canvasjs/charts';
  CanvasJS.addColorSet("colors1", ["#BA68C8", "#7986CB", "#4FC3F7", "#4DB6AC", "#DCE775", "#FFB74D"]);
  const options = reactive({
    colorSet: "colors1",
        theme: "light2",
        animationEnabled: true,
        title:{
          text: "Saytga oid ba'zi statistika ma'lumotlar"
        },
        data: [{
          type: "column",
          dataPoints: [
            { label: "Talabalar",  y: props.data.students },
            { label: "Xodimlar", y: props.data.staff },
            { label: "Guruhlar", y: props.data.groups },
            { label: "Testlar",  y: props.data.tests },
            { label: "Fanlar",  y: props.data.subjects }
          ]
        }]
      })
</script>


<template>
  <CanvasJSChart class="bg-gray-50" :options="options"/>
</template>


<style lang="scss" scoped></style>
