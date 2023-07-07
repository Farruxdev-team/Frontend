import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { useGroups } from '@/service/groups'

export const groupStore = defineStore('group', () => {
  const state = reactive({
    list: [],
    load: true,
    oneElement: []
  })

  const SET_LIST = async () => {
    state.list = (await useGroups.list()).data
    state.load = false
  }

  const ADD_LIST = async (data) => {
    await useGroups.create(data)
    SET_LIST()
  }

  const DELETE = async (id) => {
    await useGroups.delete(id)
    await SET_LIST()
  }

  const SET_ONE = (el) => {
    state.oneElement = el
  }

  const GET_ONE = async (id) => {
    return (await useGroups.get_one(id)).data
  }

  const LIST = computed(() => state.list)
  const LOAD = computed(() => state.load)
  const ELEMENT = computed(() => state.oneElement)

  return { LIST, LOAD, ELEMENT, DELETE, SET_LIST, ADD_LIST, SET_ONE, GET_ONE }
})
