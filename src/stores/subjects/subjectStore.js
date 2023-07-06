import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { useSubjects } from '@/service/subjects'

export const subjectStore = defineStore('subject', () => {
  const state = reactive({
    list: [],
    load: true,
    oneElement: []
  })

  const SET_LIST = async () => {
    state.list = (await useSubjects.list()).data
    state.load = false
  }

  const ADD_LIST = async (data) => {
    await useSubjects.create(data)
    SET_LIST()
  }

  const SET_ONE = (el) => {
    state.oneElement = el
  }

  const GET_ONE = async (id) => {
    return (await useSubjects.get_one(id)).data
  }

  const LIST = computed(() => state.list)
  const LOAD = computed(() => state.load)
  const ELEMENT = computed(() => state.oneElement)

  return { LIST, LOAD, ELEMENT, ADD_LIST, GET_ONE, SET_LIST, SET_ONE }
})
