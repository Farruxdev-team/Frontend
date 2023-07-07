import axios from '../axios'

export const useGroups = {
  list: async () => await axios.get('/groups'),
  get_one: async (id) => await axios.get(`/groups/${id}`),
  create: async (state) => await axios.post('/groups', state),
  update: async (id, state) => await axios.put(`/groups/${id}`, state),
  delete: async (id) => await axios.delete(`/groups/${id}`)
}
