import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector, batch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'

import user from 'reducers/user'

import { API_URL } from 'reusable/urls'

import SignInForm from 'components/containers/SignInForm'
import SignUpForm from 'components/containers/SignUpForm'
import WindowDimensions from 'components/WindowDimensions'

const MainContainer = styled.div`
  height: 100vh;
  background: #dfdbe5;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 767px) {
    height: auto;
  }
`

const Section = styled.section`
  height: 85%;
  width: 85%;
  padding: 50px;
  display: flex;
  justify-content: space-between;
  background: #ffffff;
  border-radius: 25px;
  box-shadow: 0px 10px 10px -1px rgb(0 0 0 / 20%),
    0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
  
  @media (max-width: 767px) {
    flex-direction: column;
    padding: 25px;
    width: 100%;
    height: 100%;
    border-radius: 0;
    box-shadow: none;
  }
`

const CarouselContainer = styled.div`
  width: 48%;

  @media (max-width: 767px) {
    display: none;
  }
`

const CarouselImage = styled.img`
  width: 100%;
  border-radius: 20px;
`

const LandingPage = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [signUp, setSignUp] = useState(false)

  const accessToken = useSelector(store => store.user.info.accessToken)
  const dispatch = useDispatch()
  const history = useHistory()

  const { width } = WindowDimensions()

  useEffect(() => {
    if (accessToken) {
      history.push('/authenticated/projects')
    }
  }, [accessToken, history])

  const handleFormSubmit = (endpoint, body) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }

    fetch(API_URL(endpoint), options)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUserID(data.userID))
            dispatch(user.actions.setUsername(data.username))
            dispatch(user.actions.setAccessToken(data.accessToken))
            dispatch(user.actions.setEmail(data.email))
            dispatch(user.actions.setImage(data.image.url))
            dispatch(user.actions.setErrors(null))

            localStorage.setItem('user', JSON.stringify({
              userID: data.userID,
              username: data.username,
              accessToken: data.accessToken,
              email: data.email,
              image: data.image.url
            }))
          })
        } else {
          dispatch(user.actions.setErrors(data))
        }
      })
  }

  return (
    <MainContainer>
      <Section>
        <CarouselContainer>
          <CarouselImage src="/assets/landing-page-placeholder-image.jpg" />
        </CarouselContainer>
        {!signUp ? 
          <SignInForm 
            handleFormSubmit={handleFormSubmit}
            username={username} 
            setUsername={setUsername} 
            password={password} 
            setPassword={setPassword}
            signUp={signUp}
            setSignUp={setSignUp}
            width={width}
          />
        : 
          <SignUpForm
            handleFormSubmit={handleFormSubmit}
            username={username} 
            setUsername={setUsername} 
            email={email}
            setEmail={setEmail}
            password={password} 
            setPassword={setPassword}
            repeatPassword={repeatPassword}
            setRepeatPassword={setRepeatPassword}
            signUp={signUp}
            setSignUp={setSignUp}
            width={width}
          />}
      </Section>
    </MainContainer>
  )
}

export default LandingPage