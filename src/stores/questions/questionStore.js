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

  const GET_GROUP = async (id) => {
    state.oneGroup = (await useQuestions.group(id)).data
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
    SET_ANSWER
  }
})
