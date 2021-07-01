# Organizr - planner tool 

**[Organizr](https://organizr-final.netlify.app)** is a student project developed by [Isabella Markskog](https://isabella-markskog.netlify.app/) and [Sandra Wallén](https://sandrawallen.netlify.app/).

In short, it's a fullstack application where a user can plan projects and have other people join in on a project as collaborators. In this application a user can plan projects and have other people join in on a project as collaborators. The general idea is to provide the user with the means to add, store and maintain projects and on a single project you can add tasks related to the project. 

We believe it's a well balanced application between frontend and backend in terms of functionality implemented.

## How we built it
Initially, we built and completed the Sign up and Sign in functionality. With that in place, we proceeded to build the content of the application which is restricted to registered users only. During the building process, we tested the functionalities, refactoring code when needed and discussed the current functionalitites/code and the upcoming work that needed to be done. Throughout the building process we also styled the components and at the end of it we went through the code base and evaluated consistency and did a general clean up of the code. 

### Frontend
- Projects section; overview of projects and single project (**GET req**), add a new project (**POST req**), edit a project (**PATCH req**), add/remove collaborator (**PATCH req**), delete project (**DELETE req**)
- Tasks section; overview of tasks (GET req), add a new task (POST req), add a new comment to a task (PATCH req), edit a task (PATCH req), delete task (DELETE req)
- Profile section; overview of user info (GET req), edit profile (PATCH req), upload avatar image (PATCH req)
- Styling is mostly done using Styled components

#### Technologies/Packages used
- React
- Redux
- React Router
- Styled components
- Material.ui
- React icons
- Carousel (react-responsive-carousel)

### Backend
- Using **Express Router** to refactor code
- Server.js; route for every endpoint
- authenticateUser.js; authorization function
- userController.js; all requests related to user collection
- projectsController.js; all requests related to projects collection
- tasksController.js; all requests related to tasks collection
- upload.js; uploading avatar images to database using **Cloudinary**

#### Technologies/Packages used
- Node.js
- Express.js
- MongoDB
- mongoose
- bcrypt
- Cloudinary
- express-list-endpoints

#### ENDPOINTS

##### All endpoints
Displays all endpoints for this API using npm package express-list-endpoints. Base URL: https://final-project-isma-sawa.herokuapp.com

- ```GET /```

##### SIGN UP & SIGN IN
- ```POST /signup```
- ```POST /signin```

##### USER
Restricted access (users only).

- ```GET /sessions/:userID``` - single user
- ```GET /sessions/users``` - all users
- ```DELETE /sessions/:userID``` - delete user
- ```PATCH /sessions/:userID``` - edit user

##### AVATAR IMAGE
Restricted access (users only).

- ```PATCH /sessions/:userID/avatar``` - edit avatar image

##### PROJECTS
Restricted access (users only).

- ```GET /sessions/:userID/projects``` - all projects
- ```GET /sessions/projects/:projectID``` - single project
- ```POST /sessions/:userID/projects``` - add new project
- ```DELETE /sessions/projects/:projectID``` - delete single project
- ```PATCH /sessions/projects/:projectID``` - edit project
- ```PATCH /sessions/projects/:projectID/collaborators``` - add collaborators
- ```PATCH /sessions/projects/:projectID/collaborators/delete``` - delete a collaborator

##### TASKS
Restricted access (users only).

- ```GET /sessions/projects/:projectID/tasks``` - all tasks
- ```GET /sessions/projects/:projectID/tasks/:taskID``` - single task
- ```POST /sessions/projects/:projectID/tasks``` - add new task
- ```DELETE /sessions/projects/:projectID/tasks/:taskID``` - delete single task
- ```PATCH /sessions/projects/:projectID/tasks/:taskID``` - edit task
- ```PATCH /sessions/projects/:projectID/tasks/:taskID/comments``` - add comment
- ```PATCH /sessions/projects/:projectID/tasks/:taskID/complete``` - toggle complete

## View it live
To view our application **Organizr** live, please visit this link: https://organizr-final.netlify.app
