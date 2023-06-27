import axios from "../axios"

export const useStudents = {
    list: async () => await axios.get("/students"),
    get_one: async (id) => await axios.get(`/students/${id}`),
    create: async (state) => await axios.post("/students", state),
    update: async (id, state) => await axios.put(`/students.${id}`, state),
    delete: async (id) => await axios.put(`/students/${id}`, { is_active: false })
}