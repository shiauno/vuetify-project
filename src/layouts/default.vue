<template>
  <v-app-bar>
    <v-container class="d-flex align-center">
      <v-btn to="/">專題題目</v-btn>
      <v-spacer />
      <template v-for="nav of navs" :key="nav.to">
        <v-btn v-if="nav.show" :to="nav.to" :prepend-icon="nav.icon">{{ nav.text }}</v-btn>
      </template>
    </v-container>
  </v-app-bar>
  <v-main>
    <router-view></router-view>
  </v-main>
</template>

<script setup>
import { computed } from 'vue';
import { useUserStore } from '@/stores/user';

const user = useUserStore()

const navs = computed(() => {
  return [
    { to: '/login', text: '登入', icon: 'mdi-login',show: !user.isLoggedIn},
    { to: '/register', text: '註冊', icon: 'mdi-account-plus', show: !user.isLoggedIn },
  ]
})
</script>
