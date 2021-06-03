import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import styled from 'styled-components/macro'

import user from 'reducers/user'
import projects from 'reducers/projects'
import tasks from 'reducers/tasks'

import Redirect from 'components/Redirect'
import LandingPage from 'components/pages/LandingPage'
import AuthenticatedPage from 'components/pages/AuthenticatedPage'

const reducer = combineReducers({
  user: user.reducer,
  projects: projects.reducer,
  tasks: tasks.reducer
})

const store = configureStore({ reducer })

const Main = styled.main`
  width: 100%;
`

const App = () => {
  return (
    <BrowserRouter>
      <Main>
        <Provider store={store}>
          <Switch>
            <Route exact path="/">
              {/* <Redirect /> */}
            </Route>
            <Route path="/signin">
              <LandingPage />
            </Route>
            <Route path="/authenticated">
              <AuthenticatedPage />
            </Route>
          </Switch>
        </Provider>
      </Main>
    </BrowserRouter>
  )
}

export default App