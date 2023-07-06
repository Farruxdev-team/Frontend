import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { useChekedTest } from '../../service/checked_test'

export const checkedTestStore = defineStore('checked_test', () => {
  const state = reactive({
    list: [],
    load: true,
    oneGroup: {},
    oneQuestions: []
  })

  const SET_LIST = async () => {
    state.list = (await useChekedTest.list()).data
    state.load = false
  }

  const ADD_LIST = async (data) => {
    const res = await useChekedTest.create(data)
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
    const res = (await useChekedTest.get_questions(id)).data
    return res
  }

  const DELETE = async (id) => {
    const res = (await useChekedTest.delete(id)).data
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
