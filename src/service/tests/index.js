import axios from "../axios"

export const useTests = {
    list: async () => await axios.get("/testGroup"),
    get_one: async (id) => await axios.get(`/testGroup/${id}`),
    create: async (state) => await axios.post("/testGroup", state),
    update: async (id, state) => await axios.put(`/testGroup.${id}`, state),
    delete: async (id) => await axios.put(`/testGroup/${id}`, { is_active: false })
}