import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import { useAuth } from '../../service/auth'

export const userStore = defineStore('user', () => {
  const state = reactive({
    user: {},
    load: true
  })

  const CHECK_USER = async () => {
    state.user = (await useAuth.GET_USER()).data
    state.load = false
  }

  const LOGIN_STUDENT = async (auth) => {
    state.user = (await useAuth.LOGIN_STUDENT(auth)).data
    localStorage.setItem('token', state.user.tokens.access_token)
    state.load = false
  }

  const LOGIN_STAFF = async (auth) => {
    state.user = (await useAuth.LOGIN_STAFF(auth)).data
    localStorage.setItem('token', state.user.tokens.access_token)
    state.load = false
  }

  const USER = computed(() => state.user)
  const LOAD = computed(() => state.load)

  return { CHECK_USER, LOGIN_STUDENT, LOGIN_STAFF, USER, LOAD }
})
