const BASE_URL = 'https://final-project-isma-sawa.herokuapp.com'
export const API_URL = (slug) => `${BASE_URL}/${slug}`

// USER
export const SIGN_IN = 'signin'
export const SIGN_UP = 'signup'
export const GET_USERS = 'sessions/users'
export const SINGLE_USER = (slug) => `sessions/${slug}`

// PROJECTS
export const PROJECTS_URL = (slug) => `sessions/${slug}/projects`
export const SINGLE_PROJECT = (slug) => `sessions/projects/${slug}`
export const EDIT_COLLAB = (slug) => `sessions/projects/${slug}/collaborators`
export const DELETE_COLLAB = (slug) => `sessions/projects/${slug}/collaborators/delete`

// TASKS
export const TASKS_URL = (slug) => `sessions/projects/${slug}/tasks`
export const SINGLE_TASK_URL = (project, task) => `sessions/projects/${project}/tasks/${task}`
export const COMMENT_TASK_URL = (project, task) => `sessions/projects/${project}/tasks/${task}/comments`