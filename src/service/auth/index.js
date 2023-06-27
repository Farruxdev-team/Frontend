import axios from '../axios.js'

export const useAuth = {
  LOGIN_STUDENT: async (data) => await axios.post('student/login', { ...data }),
  LOGIN_STAFF: async (data) => await axios.post('staffs/login', { ...data })
}
