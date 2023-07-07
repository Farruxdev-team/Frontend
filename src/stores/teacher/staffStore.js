import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { useStaff } from '@/service/staff'

export const staffsStore = defineStore('staffs', () => {
  const state = reactive({
    list: [],
    load: true,
    oneElement: []
  })

  const SET_LIST = async () => {
    state.list = (await useStaff.list()).data.filter((i) => i.role_id.name == 'TEACHER')
    state.load = false
  }

  const ADD_LIST = async (data) => {
    console.log(data)
    await useStaff.create(data)
    await SET_LIST()
  }

  const GET_ONE = async (id) => {
    console.log((await useStaff.get_one(id)).data)
    return (await useStaff.get_one(id)).data
  }

  const EDIT_STAFF = async (id, data) => {
    return (await useStaff.update(id, data)).data
  }

  const DELETE = async (id) => {
    await useStaff.delete(id)
    await SET_LIST()
  }

  const SET_ONE = (el) => {
    state.oneElement = el
  }

  const LIST = computed(() => state.list)
  const LOAD = computed(() => state.load)
  const ELEMENT = computed(() => state.oneElement)

  return { LIST, LOAD, ELEMENT, EDIT_STAFF, DELETE, GET_ONE, ADD_LIST, SET_LIST, SET_ONE }
})
