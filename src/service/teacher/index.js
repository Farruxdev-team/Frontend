import axios from "../axios"

export const useStaff = {
    list: async () => await axios.get("/staffs"),
    create: async (state) => await axios.post("/staffs", state),
    update: async (id, state) => await axios.put(`/staffs/${id}`, state),
    delete: async (id) => await axios.put(`/staffs/${id}`, {})
}