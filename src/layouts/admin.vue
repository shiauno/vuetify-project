<template>
  <v-navigation-drawer permanent>
    <v-list>
      <v-list-item :prepend-avatar="user.avatar || defaultAvatar" :title="user.account"></v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list>
      <v-list-item v-for="nav in navs" :key="nav.to" :prepend-icon="nav.icon" :title="nav.text" :to="nav.to"></v-list-item>
    </v-list>
  </v-navigation-drawer>
  <v-main style="background-color: #DCF0F5; color: black;">
    <router-view></router-view>
  </v-main>
</template>

<script setup>
import { computed } from 'vue';
import { useUserStore } from '@/stores/user';
import defaultAvatar from '@/assets/computer_programming_man.png'

const user = useUserStore()

const navs = computed(() => {
  return [
    { to: '/admin/Foods', text: "食物管理", icon: 'mdi-food-drumstick' },
    { to: '/', text: '首頁', icon: 'mdi-home'}
  ]
})
</script>
