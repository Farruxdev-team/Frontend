import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { useTests } from '../../service/tests'

export const testStore = defineStore('test', () => {
  const state = reactive({
    list: [],
    load: true,
    oneElement: []
  })

  const SET_LIST = async () => {
    state.list = (await useTests.list()).data
    state.load = false
  }

  const ADD_LIST = async (data) => {
    await useTests.create(data)
    SET_LIST()
  }

  const GET_ONE = async (id) => {
    await SET_LIST()
    for (let i in state.list) {
      console.log(state.list[i]._id, id)
      if (state.list[i]._id == id) {
        console.log(state.list[i])
        return state.list[i]
      }
    }
    return 'THIS ID NOT FOUND'
  }

  const SET_ONE = (el) => {
    state.oneElement = el
  }

  const LIST = computed(() => state.list)
  const LOAD = computed(() => state.load)
  const ELEMENT = computed(() => state.oneElement)

  return { LIST, LOAD, ELEMENT, SET_LIST, GET_ONE, SET_ONE, ADD_LIST }
})
