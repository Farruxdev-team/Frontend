import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { useTestResults } from '../../service/test_results'

export const testResultsStore = defineStore('test_results', () => {
  const state = reactive({
    list: [],
    load: true,
    oneGroup: {},
    oneQuestions: []
  })

  const SET_LIST = async () => {
    state.list = (await useTestResults.list()).data
    state.load = false
    return state.list
  }

  const ADD_LIST = async (data) => {
    const res = await useTestResults.create(data)
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
    const res = (await useTestResults.get_questions(id)).data
    return res
  }

  const GET_STUDENT = async (id) => {
    const res = (await useTestResults.get_student(id)).data
    console.log(res)
    return res
  }

  const GET_GROUP = async (id) => {
    const res = (await useTestResults.get_group(id)).data
    return res
  }

  const DELETE = async (id) => {
    const res = (await useTestResults.delete(id)).data
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
    GET_STUDENT,
    ADD_LIST,
    GET_QUESTIONS,
    GET_GROUP,
    DELETE
  }
})
