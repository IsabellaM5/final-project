const BASE_URL = 'http://localhost:8080'

export const SIGN_IN = 'signin'
export const SIGN_UP = 'signup'
export const PROJECTS_URL = (slug) => `sessions/${slug}/projects`

export const API_URL = (slug) => `${BASE_URL}/${slug}`