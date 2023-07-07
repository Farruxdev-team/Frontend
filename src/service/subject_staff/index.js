import axios from '../axios'

export const useSubjectStaff = {
  list: async () => await axios.get('/subjectStaff'),
  get_one: async (id) => await axios.get(`/subjectStaff/${id}`),
  create: async (state) => await axios.post('/subjectStaff', state),
  update: async (id, state) => await axios.put(`/subjectStaff/${id}`, state),
  delete: async (id) => await axios.put(`/subjectStaff/${id}`, { is_active: false }),
  get_one_subject: async (id) => await axios.get(`subjectStaff/staff/${id}`),
  get_one_staff: async (id) => await axios.get(`subjectStaff/subject/${id}`)
}
