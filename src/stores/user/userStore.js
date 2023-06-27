import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import { useAuth } from '../../service/auth'
import { toast } from 'vue3-toastify'

export const userStore = defineStore('user', () => {
  const state = reactive({
    user: {}
  })

  const LOGIN_STUDENT = async (auth) => {
    state.user = (await useAuth.LOGIN_STUDENT(auth)).data
    localStorage.setItem('token', state.user.tokens.access_token)
  }

  const LOGIN_STAFF = async (auth) => {
    state.user = (await useAuth.LOGIN_STAFF(auth)).data
    localStorage.setItem('token', state.user.tokens.access_token)
  }

  const USER = computed(() => state.user)

  return { LOGIN_STUDENT, LOGIN_STAFF, USER }
})
