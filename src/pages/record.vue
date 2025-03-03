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
          :items="recordB"
          no-data-text="查無紀錄"
          style="background-color: white; color: black;"
          >
          <template #[`item.image`]="{ item }">
              <img v-if="item.foodDetails && item.foodDetails.image" :src="item.foodDetails.image" alt="食物圖片" width="50" height="50">
            </template>
            <template #[`item.name`]="{ item }">
              {{ item.foodDetails ? item.foodDetails.name : '' }}
            </template>
        </v-data-table-virtual>
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-title>中餐</v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-data-table-virtual
          :headers="headers"
          :items="recordL"
          no-data-text="查無紀錄"
          style="background-color: white; color: black;"
          >
          <template #[`item.image`]="{ item }">
              <img v-if="item.foodDetails && item.foodDetails.image" :src="item.foodDetails.image" alt="食物圖片" width="50" height="50">
            </template>
            <template #[`item.name`]="{ item }">
              {{ item.foodDetails ? item.foodDetails.name : '' }}
            </template>
        </v-data-table-virtual>
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-title>晚餐</v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-data-table-virtual
            :headers="headers"
            :items="recordD"
            no-data-text="查無紀錄"
            style="background-color: white; color: black;"
          >
            <template #[`item.image`]="{ item }">
              <img v-if="item.foodDetails && item.foodDetails.image" :src="item.foodDetails.image" alt="食物圖片" width="50" height="50">
            </template>
            <template #[`item.name`]="{ item }">
              {{ item.foodDetails ? item.foodDetails.name : '' }}
            </template>
          </v-data-table-virtual>

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
import { ref,watch } from 'vue'
import { useAxios } from '@/composables/axios';
import { VDateInput } from 'vuetify/labs/components';

const { apiAuth } = useAxios()
const date = ref(new Date())
const today = new Date()

const recordB =ref([])
const recordL =ref([])
const recordD =ref([])

const allowedDates = (val) => {
  const selectedDate = new Date(val)
  return selectedDate <= today
}

const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1))

const weekDates = Array.from({ length: 7 }, (_, i) => {
  const date = new Date(startOfWeek)
  date.setDate(startOfWeek.getDate() + i)
  return date.toLocaleDateString()
})

const headers = [
  { title: '圖片', key: 'image', sortable: false},
  { title: '食物名稱', key: 'name', sortable: false },
  { title: '熱量', key: 'calorie', sortable: false },
  { title: '份量', key: 'quantity', sortable: false },
]

const convertDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// 定義 chartOptions 和 series 作為響應式數據
const chartOptions = ref({
  chart: {
    height: 700,
    toolbar: {
      show: false
    },
  },
  xaxis: {
    categories:weekDates,
  },
});

const series = ref([
  {
    name: "今日攝取的熱量",
    data: [18, 40, 35, 50, 49],
    type: 'bar',
    color: '#495F41'
  }, {
    name: '基本所需熱量',
    data: [50, 50, 50, 50, 50, 50, 50],
    type: 'line',
    color: 'red'
  }
]);

const getBreak = async (selectedDate) => {
  try {
    recordB.value = []
    const formattedDate = convertDate(selectedDate);
    const { data } = await apiAuth.get(`/record?date=${formattedDate}&time=早餐`);
    console.log('希望這是你想要的早餐值:' + JSON.stringify(data.result))
    recordB.value.push(...data.result)
  } catch (error) {
    console.log(error)
  }
}
// 頁面加載時調用 getBreak 函數
getBreak(date.value);

const getLunch = async (selectedDate) => {
  try {
    recordL.value = []
    const formattedDate = convertDate(selectedDate);
    const { data } = await apiAuth.get(`/record?date=${formattedDate}&time=午餐`);
    console.log('希望這是你想要的午餐值:' + JSON.stringify(data.result))
    recordL.value.push(...data.result)
  } catch (error) {
    console.log(error)
  }
}
getLunch(date.value);

const getDinner = async (selectedDate) => {
  try {
    recordD.value = []
    const formattedDate = convertDate(selectedDate);
    const { data } = await apiAuth.get(`/record?date=${formattedDate}&time=晚餐`);
    console.log('希望這是你想要的晚餐值:' + JSON.stringify(data.result))
    recordD.value.push(...data.result)
  } catch (error) {
    console.log(error)
  }
}
getDinner(date.value);

// 監視日期變化並調用 getBreak 函數
watch(date, (newDate) => {
  getBreak(newDate);
  getLunch(newDate)
  getDinner(newDate)
});
</script>


<route lang="yaml">
meta:
  login: true
  title: '飲食紀錄'
</route>
