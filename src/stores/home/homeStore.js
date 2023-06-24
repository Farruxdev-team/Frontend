import { computed, reactive } from "vue"
import { defineStore } from "pinia";


export const homeStore = defineStore("home", () => {

    const state = reactive({
        list_students: [],
        list_staff: [],
        list_groups: [],
        list_tests: [],
        list_subjects: [],
    })
    
    const SET_LIST_STUDENTS = (list) => {
        state.list_students = list
    }
    
    const SET_LIST_STAFF = (list) => {
        state.list_staff = list
    }
    
    const SET_LIST_GROUPS = (list) => {
        state.list_groups = list
    }
    
    const SET_LIST_TESTS = (list) => {
        state.list_tests = list
    }
    
    const SET_LIST_SUBJECTS = (list) => {
        state.list_subjects = list
    }
    

    const LIST_STUDENTS = computed(() => state.list_students)
    const LIST_STAFF = computed(() => state.list_staff)
    const LIST_GROUPS = computed(() => state.list_groups)
    const LIST_TESTS = computed(() => state.list_tests)
    const LIST_SUBJECTS = computed(() => state.list_subjects)

    return {LIST_STUDENTS, LIST_STAFF, LIST_GROUPS, LIST_TESTS, LIST_SUBJECTS,
    SET_LIST_STUDENTS, SET_LIST_STAFF, SET_LIST_GROUPS, SET_LIST_TESTS, SET_LIST_SUBJECTS}

})