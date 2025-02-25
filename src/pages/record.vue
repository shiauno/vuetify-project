<template>
  <v-container  max-width="1600">
    <h1>飲食紀錄</h1><br>

    <div class="d-flex justify-space-between" >
      <div style="width: 300px;">
        <v-date-input
      v-model="date"
      variant="outlined"
      label="選擇日期"
      prepend-icon="mdi-calendar"
      color="#89BE99"
      :allowed-dates="allowedDates"
    />
      </div>
      <div>
        <v-btn icon="mdi-plus" style="margin-right: 0px;" color="#495F41" to="/addrecord"></v-btn>
      </div>


    </div>

    <v-expansion-panels class="my-4"  color="#89BE99" bg-color="white" multiple    >
      <v-expansion-panel >
        <v-expansion-panel-title>早餐</v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-data-table-virtual
          :headers="headers"
          style="background-color: white; color: black;"
          ></v-data-table-virtual>
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-title>中餐</v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-data-table-virtual
          :headers="headers"
          style="background-color: white; color: black;"
          ></v-data-table-virtual>
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-title>晚餐</v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-data-table-virtual
            :headers="headers"
            style="background-color: white; color: black;"
          ></v-data-table-virtual>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>

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
import { VDateInput } from 'vuetify/labs/components';


const date = ref(new Date())
const allowedDates = (val) => {
  const today = new Date()

  const selectedDate = new Date(val)

  return selectedDate <= today
}

const headers = [
  { title: '圖片', key: 'image', sortable: false},
  { title: '食物名稱', key: 'name', sortable: false },
]

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
    name: "今日攝取的熱量",
    data: [30, 40, 35, 50, 49, 60, 70],
    type: 'bar',
    color: '#495F41'
  }, {
    name: '基本所需熱量',
    data: [50, 50, 50, 50, 50, 50, 50],
    type: 'line',
    color: 'red'
  }
]);
</script>


<route lang="yaml">
meta:
  login: false
  title: '飲食紀錄'
</route>
