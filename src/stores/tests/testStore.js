import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { useTests } from '../../service/tests'

export const testStore = defineStore('test', () => {
  const state = reactive({
    list: [],
    oneElement: []
  })

  const SET_LIST = async () => {
    state.list = await useTests.list()
  }

  const ADD_LIST = async (data) => {
    state.list = await useTests.create(data)
  }

  const SET_ONE = (el) => {
    state.oneElement = el
  }

  const LIST = computed(() => state.list)
  const ELEMENT = computed(() => state.oneElement)

  return { LIST, ELEMENT, SET_LIST, SET_ONE, ADD_LIST }
})
