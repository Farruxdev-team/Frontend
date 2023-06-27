import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import { useAuth } from '../../service/auth'
import { toast } from 'vue3-toastify'
import { useRoute } from 'vue-router'

const router = useRoute()
console.log(router)
// router.push('/')

export const userStore = defineStore('user', () => {
  const state = reactive({
    user: {}
  })

  const LOGIN_STUDENT = async (auth) => {
    try {
      state.user = (await useAuth.LOGIN_STUDENT(auth)).data
      localStorage.setItem('token', state.user.tokens.access_token)
      router.push('/')
    } catch (error) {
      console.log(error)
      toast.error(`Bunday o'quvchi topilmadi`, {
        autoClose: 1000
      })
    }
  }

  const LOGIN_STAFF = async (auth) => {
    try {
      state.user = (await useAuth.LOGIN_STAFF(auth)).data
      localStorage.setItem('token', state.user.tokens.access_token)
      router.push('/')
    } catch (error) {
      console.log(error)
      toast.error(`Bunday o'qituvchi topilmadi`, {
        autoClose: 1000
      })
    }
  }

  const USER = computed(() => state.user)

  return { LOGIN_STUDENT, LOGIN_STAFF, USER }
})
