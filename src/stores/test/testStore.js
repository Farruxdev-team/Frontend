import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'
// import { useTest } from '../../service/test'

export const testStore = defineStore('test', () => {
  const state = reactive({
    test: [
      {
        subject: 'MATEMATIKA',
        question: 'Haftada necha kun bor ?',
        answers: [
          { text: '17 kun', isTrue: false },
          { text: '17 kun', isTrue: true }
        ]
      }
    ],
    load: false
  })

  const get_test = async (auth) => {
    try {
      state.test = (await useAuth.LOGIN(auth)).data
      localStorage.setItem('token', state.test.tokens.access_token)
    } catch (error) {
      console.log(error)
    }
  }

  const add_test = async (data) => {
    state.test.push(data)
  }

  const TEST = computed(() => state.test)

  return { get_test, add_test, TEST }
})
