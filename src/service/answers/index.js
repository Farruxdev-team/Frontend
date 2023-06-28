import axios from '../axios'

export const useAnswers = {
  list: async () => await axios.get('/answers'),
  get_one: async (id) => await axios.get(`/answers/${id}`),
  get_questions: async (id) => await axios.get(`/answers/question/${id}`),
  create: async (state) => await axios.post('/answers', state),
  update: async (id, state) => await axios.put(`/answers.${id}`, state),
  delete: async (id) => await axios.put(`/answers/${id}`, { is_active: false })
}
