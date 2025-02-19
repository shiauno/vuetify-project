<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-center">{{ food.name }}</h1>
      </v-col>
      <v-divider></v-divider>
      <v-col cols="12" md="5">
        <v-img :src="food.image"></v-img>
      </v-col>

      <v-col cols="12" md="7" class="d-flex flex-wrap">
        <div style="width: 960px; font-size: 30px;">分類: {{ food.category }}</div>
        <v-sheet color="#89BE99" :height="200" :width="200" class="d-flex justify-center align-center rounded-lg mx-4 my-4" style="font-size: 35px;" >
          <div>熱量<br> {{ food.calorie }} kcal</div>
        </v-sheet>
        <v-sheet color="#89BE99" :height="200" :width="200" class="d-flex justify-center align-center rounded-lg mx-4 my-4" style="font-size: 35px;" >
          <div>水分 <br>{{ food.moisture }} g</div>
        </v-sheet>
        <v-sheet color="#89BE99" :height="200" :width="200" class="d-flex justify-center align-center rounded-lg mx-4 my-4" style="font-size: 35px;" >
          <div>蛋白質 <br>{{ food.protein }} g</div>
        </v-sheet>
        <v-sheet color="#89BE99" :height="200" :width="200" class="d-flex justify-center align-center rounded-lg mx-4 my-4" style="font-size: 35px;" >
          <div>脂肪 <br>{{ food.fat }} g</div>
        </v-sheet>
        <v-sheet color="#89BE99" :height="200" :width="200" class="d-flex justify-center align-center rounded-lg mx-4 my-4" style="font-size: 30px;" >
          <div>碳水化合物 <br>{{ food.carbo }} g</div>
        </v-sheet>
        <v-sheet color="#89BE99" :height="200" :width="200" class="d-flex justify-center align-center rounded-lg mx-4 my-4" style="font-size: 35px;" >
          <div>鈉 <br>{{ food.sodium }} mg</div>
        </v-sheet>
        <v-sheet color="#89BE99" :height="200" :width="200" class="d-flex justify-center align-center rounded-lg mx-4 my-4" style="font-size: 30px;" >
          <div>膳食纖維 <br>{{ food.fibre }} g</div>
        </v-sheet>
        <v-sheet color="#89BE99" :height="200" :width="200" class="d-flex justify-center align-center rounded-lg mx-4 my-4" style="font-size: 35px;" >
          <div>膽固醇 <br>{{ food.cholesterol }} mg</div>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useAxios } from '@/composables/axios';
import { useRoute } from 'vue-router'

const { api } = useAxios()
const route = useRoute()

const food = ref({
  _id: '',
  name: '',
  category: '',
  image: '',
  calorie: 0,
  moisture: 0,
  protein: 0,
  fat: 0,
  carbo: 0,
  sodium: 0,
  fibre: 0,
  cholesterol: 0,
})

const getFood = async () => {
  try {
    const { data } = await api.get('/food/' + route.params.id)
    food.value = data.result
    document.title = food.value.name
  } catch (error) {
    console.log(error)
  }
}
getFood()
</script>

<route lang="yaml">
meta:
  title: '食物熱量'
</route>
