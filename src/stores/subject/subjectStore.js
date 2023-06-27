import { computed, reactive } from "vue"
import { defineStore } from "pinia";


export const subjectsStore = defineStore("subjects", () => {

    const state = reactive({
        list: [],
    })
    
    const SET_LIST = (list) => {
        state.list = list
    }

    const LIST = computed(() => state.list)
    return {LIST, SET_LIST}

})