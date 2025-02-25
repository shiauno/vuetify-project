<template>
    <v-container max-width="1600">
      <h1>新增飲食紀錄</h1><br>
      <v-row>
        <v-col cols="12">
          <v-text-field v-model="search" prepend-icon="mdi-magnify"></v-text-field>
        </v-col>
        <v-col cols="12">
          <div style="color: red;">以下為食物每100克的含量</div>
        </v-col>
        <v-col v-for="food of filteredFood" :key="food._id" cols="12" md="6" lg="3">
          <food-card v-bind="food" :is-link="false" @click-food="handleFoodClick"></food-card>
        </v-col>
        <v-col cols="12">
          <v-pagination v-model="currentPage" :length="totalPage"></v-pagination>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog v-model="dialog.open" persistent max-width="500">
      <v-form>
        <v-card>
          <v-card-title>新增飲食紀錄</v-card-title>
          <v-card-text>
            <v-text-field

            label="食物名稱"
            ></v-text-field>
            <v-text-field
            label="份數"
            ></v-text-field>
            <v-select
            :items="timeOptions"
            item-title="text"
            item-value="value"
            ></v-select>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="closeDialog">取消</v-btn>
            <v-btn>確認</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>

</template>

<script setup>
import { ref, computed } from 'vue'
import { useAxios } from '@/composables/axios';
import FoodCard from '@/components/Foodcard.vue';

const { api } = useAxios()

const currentPage = ref(1)
const totalPage = computed(()=>Math.ceil(foods.value.length/ITEMS_PER_PAGE))

const ITEMS_PER_PAGE = 12

const foods = ref([])
const search = ref('')
const filteredFood = computed(() => {
  return foods.value.filter(food => food.name.toLowerCase().includes(search.value.toLowerCase()))
  .slice((currentPage.value - 1) * ITEMS_PER_PAGE, currentPage.value * ITEMS_PER_PAGE)
})

const getFoods = async () => {
  try {
    const { data } = await api.get('/food')
    foods.value.push(...data.result)
  } catch (error) {
    console.log(error)
  }
}
getFoods()

const dialog = ref({
  open: false,
  id: ''
})

const handleFoodClick = (id) => {
  console.log('Selected food id: ', id)
  dialog.value.open = true
}

const closeDialog = () => {
  dialog.value.id = ''
  dialog.value.open = false
}


const timeOptions = [
  {text: '早餐', value: '早餐'},
  {text: '午餐', value: '午餐'},
  {text: '晚餐', value: '晚餐'},
]

</script>

<route lang="yaml">
meta:
  layout: default
  login: false
  admin: false
  title: '熱量查詢'
</route>


