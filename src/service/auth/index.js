import axios from '../axios.js'

export const useAuth = {
  LOGIN: async (data) => await axios.post('staffs/login', { ...data })
}
