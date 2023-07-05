import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { useSubjectStaff } from '@/service/subject_staff'

export const subject_staffStore = defineStore('subject_staff', () => {
  const state = reactive({
    list: [],
    load: true,
    oneElement: []
  })

  const SET_LIST = async () => {
    state.list = (await useSubjectStaff.list()).data
    state.load = false
  }

  const SET_LIST_SUBJECT = async (id) => {
    const res = (await useSubjectStaff.get_one_subject(id)).data
    return res
  }

  const ADD_LIST = async (data) => {
    await useSubjectStaff.create(data)
    SET_LIST()
  }

  const SET_ONE = (el) => {
    state.oneElement = el
  }

  const LIST = computed(() => state.list)
  const LOAD = computed(() => state.load)
  const ELEMENT = computed(() => state.oneElement)

  return { LIST, LOAD, ELEMENT, SET_LIST_SUBJECT, SET_LIST, ADD_LIST, SET_ONE }
})
