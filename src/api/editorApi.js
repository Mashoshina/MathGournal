import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3001',
})

export const getTasks = () => api.get('/tasks')
export const getManuscripts = () => api.get('/manuscripts')
export const getAuthors = () => api.get('/authors')
export const getReviewers = () => api.get('/reviewers')
export const getReviews = () => api.get('/reviews')
