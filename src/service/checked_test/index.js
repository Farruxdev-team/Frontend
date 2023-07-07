import axios from '../axios'

export const useChekedTest = {
  list: async () => await axios.get('/checkedTest'),
  get_one: async (id) => await axios.get(`/checkedTest/${id}`),
  get_questions: async (id) => await axios.get(`/checkedTest/question/${id}`),
  create: async (state) => await axios.post('/checkedTest', state),
  update: async (id, state) => await axios.put(`/checkedTest/${id}`, state),
  delete: async (id) => await axios.delete(`/checkedTest/${id}`)
}
