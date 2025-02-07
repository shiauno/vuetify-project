// Utilities
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import UserRole from '@/enums/UserRole'


export const useUserStore = defineStore('user', () => {
  const token = ref('')
  const account = ref('')
  const role = ref()

  const isLoggedIn = computed(() => {
    return token.value.length > 0
  })

  const isAdmin = computed(() => {
    return role.value === UserRole.ADMIN
  })

  const login = async (data) => {
    if (data.token) {
      token.value = data.token
    }
    account.value = data.account
    role.value = data.role
  }

  const logout = () => {
    token.value = ''
    account.value = ''
    role.value = UserRole.USER
  }

  return {
    token, account, role,
    isLoggedIn, isAdmin, login, logout
  }
}, {
  persist: {
    key:'record-user',
    pick:['token']
  }
})
