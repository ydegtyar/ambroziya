import axios from 'axios'

export default {
  get() {
    return axios.get('/api/bushes')
  },
  setStatus(id, status) {
    return axios.patch(`/api/bushes/${id}`, { status })
  },
  create(bush) {
    return axios.post('/api/bushes', bush, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  upvote(id) {
    return axios.post(`/api/bushes/${id}/like`)
  },
}