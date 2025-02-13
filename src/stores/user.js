// Utilities
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import UserRole from '@/enums/UserRole'

export const useUserStore = defineStore('user', () => {

  const token = ref('')
  const account = ref('')
  const role = ref(UserRole.USER)
  const avatar = ref('')

  const isLoggedIn = computed(() => {
    return token.value.length > 0
  })

  const isAdmin = computed(() => {
    return role.value === UserRole.ADMIN
  })


  const login = (data) => {
    if (data.token) {
      token.value = data.token
    }
    account.value = data.account
    role.value = data.role
    avatar.value = data.avatar
  }

  const logout = () => {
    token.value = ''
    account.value = ''
    role.value = UserRole.USER
    avatar.value = ''
  }

  return {
    token, account, role, avatar,
    isLoggedIn, isAdmin,
    login, logout
  }
}, {
  persist: {
    key: 'record-user',
    pick: ['token']
  }
})
