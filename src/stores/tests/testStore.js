import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { useTests } from '../../service/tests'

export const testStore = defineStore('test', () => {
  const state = reactive({
    list: [],
    load: true,
    oneElement: [],
    oneLoad: true
  })

  const falseLoad = () => (state.oneLoad = false)
  const trueLoad = () => (state.oneLoad = true)

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
      if (state.list[i]._id == id) {
        state.oneElement = state.list[i]
        state.oneLoad = false
        return
      }
    }
    throw new Error('Not Found!')
  }

  const SET_ONE = (el) => {
    state.oneElement = el
    state.oneLoad = false
  }

  const LIST = computed(() =>
    state.list.sort((a, b) => new Date(b.started).getTime() - new Date(a.started).getTime())
  )

  const UPDATE = async (id, data) => {
    await useTests.update(id, data)
    await SET_LIST()
  }

  const DELETE_TESTS = async (id) => {
    await useTests.delete(id)
    await SET_LIST()
  }

  const LOAD = computed(() => state.load)
  const ELEMENT = computed(() => state.oneElement)
  const EL_LOAD = computed(() => state.oneLoad)

  return {
    LIST,
    LOAD,
    ELEMENT,
    UPDATE,
    SET_LIST,
    GET_ONE,
    SET_ONE,
    ADD_LIST,
    DELETE_TESTS,
    EL_LOAD,
    falseLoad,
    trueLoad
  }
})
