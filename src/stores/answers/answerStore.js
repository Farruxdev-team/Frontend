import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { useAnswers } from '../../service/answers'

export const answerStore = defineStore('answer', () => {
  const state = reactive({
    list: [],
    load: true,
    oneGroup: {},
    oneQuestions: []
  })

  const SET_LIST = async () => {
    state.list = (await useAnswers.list()).data
    state.load = false
  }

  const ADD_LIST = async (data) => {
    const res = await useAnswers.create(data)
    SET_LIST()
    return res
  }

  const GET_ONE = async (id) => {
    await SET_LIST()
    for (let i in state.list) {
      if (state.list[i]._id == id) {
        return state.list[i]
      }
    }
    return 'THIS ID NOT FOUND'
  }

  const GET_QUESTIONS = async (id) => {
    const res = (await useAnswers.get_questions(id)).data
    return res
  }

  const DELETE = async (id) => {
    const res = (await useAnswers.delete(id)).data
    return res
  }

  const LIST = computed(() => state.list)
  const LOAD = computed(() => state.load)
  const ELEMENT = computed(() => state.oneGroup)
  const QUESTIONS = computed(() => state.oneQuestions)

  return {
    LIST,
    LOAD,
    ELEMENT,
    QUESTIONS,
    SET_LIST,
    GET_ONE,
    ADD_LIST,
    GET_QUESTIONS,
    DELETE
  }
})
