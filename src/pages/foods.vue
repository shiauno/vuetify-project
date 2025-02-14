<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useAxios } from '@/composables/axios';

const { api } = useAxios()

const foods = ref([])

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
  login: false
  admin: false
  title: '熱量查詢'
</route>


