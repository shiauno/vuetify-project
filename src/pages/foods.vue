<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-text-field v-model="search" prepend-icon="mdi-magnify"></v-text-field>
      </v-col>
      <v-col cols="12">
        <div style="color: red;">以下為食物每100克的含量</div>
      </v-col>
      <v-col v-for="food of filteredFood" :key="food._id" cols="12" md="6" lg="3">
        <food-card v-bind="food"></food-card>
      </v-col>
      <v-col cols="12">
        <v-pagination v-model="currentPage" :length="totalPage"></v-pagination>
      </v-col>
    </v-row>
  </v-container>
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
</script>

<route lang="yaml">
meta:
  layout: default
  login: false
  admin: false
  title: '熱量查詢'
</route>


