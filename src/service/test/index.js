import axios from '../axios.js'

export const useTest = {
  GET: async (data) => await axios.get('test', { ...data })
}
