<template>
  <v-container>
    <h1>個人資料</h1>
    <v-row>
      <v-avatar>
        <template v-if="profile.avatar">
          <img :src="profile.avatar" />
        </template>
        <template v-else>
          <img :src="require('@/assets/computer_programming_man.png')" />
        </template>
      </v-avatar>
      <v-col cols="12"> 帳號: {{ profile.account }}</v-col>
      <v-col cols="12">信箱: {{ profile.email }}</v-col>
      <v-col cols="12">體重: {{ profile.weight }} 公斤</v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useAxios } from '@/composables/axios';

const { apiAuth } = useAxios()

const profile = ref({
  account: '',
  email: '',
  avatar: '',
  weight: 0,
})

const getProfile = async () => {
  try {
    const { data } = await apiAuth.get('/user/profile')
    console.log(data.result)
    profile.value = data.result
  } catch (error) {
    console.log(error)
  }
}
getProfile()
</script>

<route lang="yaml">
meta:
  login: true
  admin: false
  title: '個人頁面'
</route>
