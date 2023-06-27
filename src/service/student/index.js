import axios from "../axios"

export const useStudent = {
    list: async () => await axios.get("/students"),
    create: async (state) => await axios.post("/students", state),
    update: async (id, state) => await axios.put(`/students/${id}`, state),
    delete: async (id) => await axios.put(`/students/${id}`, {})
}