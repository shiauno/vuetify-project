<template>
  <v-app-bar style="background-color: #495F41;">
    <v-container class="d-flex align-center">
      <v-btn to="/">專題題目</v-btn>
      <v-spacer></v-spacer>
      <v-btn v-for="nav in navm" :key="nav.to" :to="nav.to" :prepend-icon="nav.icon">{{ nav.text }}</v-btn>
      <v-spacer />
      <template v-for="nav of navs" :key="nav.to">
        <v-btn v-if="nav.show" :to="nav.to" :prepend-icon="nav.icon" >{{ nav.text }}</v-btn>
      </template>
      <v-btn v-if="user.isLoggedIn" prepend-icon="mdi-logout" @click="logout">登出</v-btn>
    </v-container>
  </v-app-bar>
  <v-main>
    <router-view></router-view>
  </v-main>
</template>

<script setup>
import { computed } from 'vue';
import { useUserStore } from '@/stores/user';
import { useAxios } from '@/composables/axios';
import { useSnackbar } from 'vuetify-use-dialog';

const user = useUserStore()
const { apiAuth } = useAxios()
const createSnackbar = useSnackbar()

const navs = computed(() => {
  return [
    { to: '/login', text: '登入', icon: 'mdi-login',show: !user.isLoggedIn},
    { to: '/register', text: '註冊', icon: 'mdi-account-plus', show: !user.isLoggedIn },
    { to: '/profile', text: '個人資料', icon: 'mdi-account', show: user.isLoggedIn },
    { to: '/admin', text: '管理', icon: 'mdi-cog', show: user.isLoggedIn && user.isAdmin }
  ]
})

const navm = computed(() => {
  return [
    { to: '/foods', text: '熱量查詢', icon: 'mdi-food-drumstick'},
    { to: '/record', text: '飲食紀錄', icon: 'mdi-book-open-variant'},
  ]
})

const logout = async () => {
  try {
    await apiAuth.delete('/user/logout')
  } catch (error) {
    console.log(error)
  }
  user.logout()
  createSnackbar({
    text: '登出成功',
    snackbarProps: {
      color: 'green'
    }
  })
}

</script>
