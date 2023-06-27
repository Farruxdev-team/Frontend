<template>
    <CanvasJSChart :options="options" :styles="styleOptions"/>
</template>

<script setup>
import { reactive } from "vue"

const options = reactive({
          theme: "light2",
          animationEnabled: true,
          exportEnabled: true,
          title:{
            text: "O'zbekistonda etnik guruhlar (2021)"
          },
          data: [{
            type: "pie",
            indexLabel: "{label} (#percent%)",
            yValueFormatString: "#,##0",
            toolTipContent: "<span style='\"'color: {color};'\"'>{label}</span> {y}(#percent%)",
            dataPoints: [
              { label: "O'zbeklar", y: 29194071 },
              { label: "Tojiklar", y: 1657336 },
              { label: "Qozoqlar", y: 821172 },
              { label: "Qoraqalpoqlar", y: 752646 },
              { label: "Ruslar", y: 720324 },
              { label: "Qirg'izlar", y: 291628 },
              { label: "Boshqa", y: 1121714 }
            ]
          }]
        })
const styleOptions = reactive({
          width: "100%",
          height: "360px"
        })
</script>

<style lang="scss" scoped>

</style>