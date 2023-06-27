import axios from "../axios"

export const useSubjects = {
    list: async () => await axios.get("/subjects"),
    get_one: async (id) => await axios.get(`/subjects/${id}`),
    create: async (state) => await axios.post("/subjects", state),
    update: async (id, state) => await axios.put(`/subjects.${id}`, state),
    delete: async (id) => await axios.put(`/subjects/${id}`, { is_active: false })
}