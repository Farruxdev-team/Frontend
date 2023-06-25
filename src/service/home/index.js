import axios from "../axios"

export const useHome = {
    list_students: async () => await axios.get("/students"),
    list_staff: async () => await axios.get("/staffs"),
    list_groups: async () => await axios.get("/groups"),
    list_tests: async () => await axios.get("/testGroup"),
    list_subjects: async () => await axios.get("/subjects")
}