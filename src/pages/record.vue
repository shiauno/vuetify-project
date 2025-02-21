<template>
  <v-container>
    <h1>飲食紀錄</h1><br>
    <v-expansion-panels class="my-4" variant="popout" color="#89BE99" bg-color="white">

      <v-expansion-panel >
        <v-expansion-panel-title>早餐</v-expansion-panel-title>
        <v-expansion-panel-text>
          Some content
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-title>中餐</v-expansion-panel-title>
        <v-expansion-panel-text>
          Some content
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-title>晚餐</v-expansion-panel-title>
        <v-expansion-panel-text>
          Some content
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>

    <!-- <v-sheet style="background-color: #89BE99; width: 600px; height: 250px;" class="my-2"></v-sheet>
    <v-sheet style="background-color: #89BE99; width: 600px; height: 250px;"></v-sheet>
    <v-sheet style="background-color: #89BE99; width: 600px; height: 250px;"></v-sheet> -->
    <apexchart
      width="700"
      type="line"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </v-container>
</template>


<script setup>
import { ref } from 'vue'


// 定義 chartOptions 和 series 作為響應式數據
const chartOptions = ref({
  chart: {
    height: 700,
    toolbar: {
      show: false
    },
  },
  xaxis: {
    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997],
  },
});

const series = ref([
  {
    name: "series-1",
    data: [30, 40, 35, 50, 49, 60, 70],
    type: 'bar',
    color: '#495F41'
  }, {
    name: 'test123',
    data: [50, 50, 50, 50, 50, 50, 50],
    type: 'line',
    color: 'red'
  }
]);
</script>


<route lang="yaml">
meta:
  login: true
  title: '飲食紀錄'
</route>
