import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { useQuestions } from '../../service/questions'

export const questionStore = defineStore('question', () => {
  const state = reactive({
    list: [],
    load: true,
    oneGroup: []
  })

  const SET_LIST = async () => {
    state.list = (await useQuestions.list()).data
    state.load = false
  }

  const SET_ANSWER = async (i, data) => {
    state.list[i]['answer'] = data
  }

  const ADD_LIST = async (data) => {
    const res = (await useQuestions.create(data)).data
    SET_LIST()
    return res
  }

  const GET_ONE = async (id) => {
    return (await useQuestions.get_one(id)).data
  }

  const GET_GROUP = async (id) => {
    const res = (await useQuestions.group(id)).data
    state.oneGroup = res
    return res
  }

  const DELETE = async (id) => {
    state.oneGroup = (await useQuestions.delete(id)).data
  }

  const SET_ONE = (el) => {
    state.oneGroup = {}
  }

  const LIST = computed(() => state.list)
  const LOAD = computed(() => state.load)
  const ELEMENT = computed(() => state.oneGroup)

  return {
    LIST,
    LOAD,
    ELEMENT,
    SET_LIST,
    GET_ONE,
    SET_ONE,
    ADD_LIST,
    GET_GROUP,
    SET_ANSWER,
    DELETE
  }
})
