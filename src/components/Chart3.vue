<script setup>
    import { reactive } from 'vue';
    const options = reactive({
        theme: "light2",
          animationEnabled: true,
          exportEnabled: true,
          title: {
            text: "Sayyoralar yuzasidagi harorat va Quyosh bilan masofa"
          },
          axisX: {
            title: "Quyosh bilan masofa (mln. km da)",
            logarithmic: true,
            maximum: 4000,
            labelAngle: 0,
            labelMaxWidth: 100
          },
          axisY: {
            title: "Yuzasidagi harorat (°C)"
          },
          data: [{
            type: "bubble",
            indexLabel: "{label}",
            toolTipContent: "{label}:<br>Quyosh bilan masofa: {x} mln. km<br>Yuzasidagi o'rtacha harorat: {y} °C<br>Diametr: {z} km",
            dataPoints: [
              { label: "Merkuriy", x: 58, y: 349.9, z: 4879.4 },
              { label: "Venera", x: 108, y: 462, z: 12104 },
              { label: "Yer", x: 149, y: 17, z: 12742 },
              { label: "Mars", x: 228, y: -63, z: 6779 },
              { label: "Yupiter", x: 778.57, y: -107, z: 139820 },
              { label: "Saturn", x: 1430, y: -193, z: 116460 },
              { label: "Uran", x: 2800, y: -195, z: 50724 },
              { label: "Neptun", x: 3990, y: -220, z: 49224 }
            ]
          }]
        })
    const styleOptions = reactive({
          width: "100%",
          height: "360px"
        })
</script>


<template>
    <CanvasJSChart :options="options" :style="styleOptions" />
</template>


<style lang="scss" scoped>

</style>