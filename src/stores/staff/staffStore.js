import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'

export const staffStore = defineStore('staff', () => {
  const state = reactive({
    list: [],
    oneElement: []
  })

  const SET_LIST = (list) => {
    state.list = list
  }

  const SET_ONE = (el) => {
    state.oneElement = el
  }

  const LIST = computed(() => state.list)
  const ELEMENT = computed(() => state.oneElement)

  return { LIST, ELEMENT, SET_LIST, SET_ONE }
})
