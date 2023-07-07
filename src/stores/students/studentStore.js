import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { useStudents } from '@/service/students'

export const studentStore = defineStore('student', () => {
  const state = reactive({
    list: [],
    load: true,
    oneElement: []
  })

  const SET_LIST = async () => {
    state.list = (await useStudents.list()).data
    state.load = false
  }

  const ADD_LIST = async (data) => {
    await useStudents.create(data)
    SET_LIST()
  }
  const GET_ONE = async (id) => {
    return (await useStudents.get_one(id)).data
  }

  const EDIT_STUDENT = async (id, data) => {
    return (await useStudents.update(id, data)).data
  }

  const DELETE = async (id) => {
    await useStudents.delete(id)
    await SET_LIST()
  }

  const SET_ONE = (el) => {
    state.oneElement = el
  }

  const LIST = computed(() => state.list)
  const LOAD = computed(() => state.load)
  const ELEMENT = computed(() => state.oneElement)

  return { LIST, LOAD, ELEMENT, DELETE, GET_ONE, EDIT_STUDENT, SET_LIST, ADD_LIST, SET_ONE }
})
