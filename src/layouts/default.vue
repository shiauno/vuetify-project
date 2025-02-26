<template>
  <v-app-bar style="background-color: #495F41;">
    <v-container class="d-flex align-center">
      <v-btn to="/">食兼管理</v-btn>
      <v-spacer></v-spacer>
      <v-btn v-for="nav in navm" :key="nav.to" :to="nav.to" :prepend-icon="nav.icon">{{ nav.text }}</v-btn>
      <v-spacer />
      <template v-for="nav of navs" :key="nav.to">
        <v-btn v-if="nav.show" :to="nav.to" :prepend-icon="nav.icon" >{{ nav.text }}</v-btn>
      </template>
      <v-avatar v-if="user.isLoggedIn" style="border: 1px solid black; margin-right: 10px;"><v-img :src="user.avatar"></v-img></v-avatar>
      <v-btn v-if="user.isLoggedIn" prepend-icon="mdi-logout" :to="!isLoggedIn ? '/' : undefined" @click="logout">登出</v-btn>
    </v-container>
  </v-app-bar>
  <v-main style="background-color: #DCF0F5; color: black;">
    <router-view></router-view>
  </v-main>
  <v-footer color="#495f41" class="text-center d-flex flex-column" style="max-height: 90px;">
    <div>
      <v-btn
        v-for="icon in icons"
        :key="icon"
        :icon="icon"
        class="mx-4"
        variant="text"
      ></v-btn>
    </div>
    <v-divider></v-divider>
    2025 &copy; 泰山職業訓練場-學員陳筱媃
  </v-footer>
</template>

<script setup>
import { computed, ref } from 'vue';
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
    { to: '/admin', text: '管理', icon: 'mdi-cog', show: user.isLoggedIn && user.isAdmin }
  ]
})

const navm = computed(() => {
  return [
    { to: '/foods', text: '熱量查詢', icon: 'mdi-food-drumstick'},
    { to: '/record', text: '飲食紀錄', icon: 'mdi-book-open-variant' },
    { to: '/profile', text: '個人資料', icon: 'mdi-account'},
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

const icons = ref(
  [
    'mdi-facebook',
    'mdi-twitter',
    'mdi-instagram',
])

</script>
