import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector, batch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'

import user from 'reducers/user'

import { API_URL } from 'reusable/urls'

import SignInForm from 'components/SignInForm'

const MainContainer = styled.div`
  height: 100vh;
  background: #dfdbe5;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Section = styled.section`
  height: 85%;
  width: 85%;
  box-sizing: border-box;
  padding: 50px;
  display: flex;
  justify-content: space-between;
  background: #ffffff;
  border-radius: 25px;
  box-shadow: 0px 10px 10px -1px rgb(0 0 0 / 20%),
    0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
`

const CarouselContainer = styled.div`
  width: 48%;
`

const CarouselImage = styled.img`
  width: 100%;
  border-radius: 20px;
`

const LandingPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // const [email, setEmail] = useState('')

  const accessToken = useSelector(store => store.user.info.accessToken)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if (accessToken) {
      history.push('/authenticated')
    }
  }, [accessToken, history])

  const handleFormSubmit = (SIGN_IN, body) => {
    // event.preventDefault()

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }

    fetch(API_URL(SIGN_IN), options)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUsername(data.username))
            dispatch(user.actions.setAccessToken(data.accessToken))
            dispatch(user.actions.setErrors(null))
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
        <SignInForm 
          handleFormSubmit={handleFormSubmit}
          username={username} 
          setUsername={setUsername} 
          password={password} 
          setPassword={setPassword}
        />
      </Section>
    </MainContainer>
  )
}

export default LandingPage