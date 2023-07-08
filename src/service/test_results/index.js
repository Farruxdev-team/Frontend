import axios from '../axios'

export const useTestResults = {
  list: async () => await axios.get('/testResults'),
  get_one: async (id) => await axios.get(`/testResults/${id}`),
  get_student: async (id) => await axios.get(`/testResults/student/${id}`),
  get_group: async (id) => await axios.get(`/testResults/group/${id}`),
  get_questions: async (id) => await axios.get(`/testResults/question/${id}`),
  create: async (state) => await axios.post('/testResults', state),
  update: async (id, state) => await axios.put(`/testResults/${id}`, state),
  delete: async (id) => await axios.delete(`/testResults/${id}`)
}
