import axios from '../axios'

export const useQuestions = {
  list: async () => await axios.get('/questions'),
  get_one: async (id) => await axios.get(`/questions/${id}`),
  create: async (state) => await axios.post('/questions', state),
  update: async (id, state) => await axios.put(`/questions.${id}`, state),
  delete: async (id) => await axios.put(`/questions/${id}`, { is_active: false }),
  group: async (id) => await axios.get(`/questions/group/${id}`)
}
