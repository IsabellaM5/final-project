import React from 'react'
import styled from 'styled-components/macro'
// import { useSelector } from 'react-redux'

import { SIGN_IN } from 'reusable/urls'

import InputField from 'components/reusable/InputField'

const MainHeading = styled.h1`
  font-size: 3.2em;
`

const Form = styled.form`
  width: 48%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 40px;
  background: #f2eff6;
  border-radius: 20px;
`

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 30%;
  justify-content: space-evenly;
`

const SignInButton = styled.button`
  padding: 5px;
  width: 100px;
  font-family: "Montserrat";
  border-radius: 4px;
  border: none;
  background: #9c92ac;
  color: #ffffff;

  &:hover {
    background: #c3bdcd;
    cursor: pointer;
  }
`

const RegisterText = styled.span`
  font-size: 1.6em;
`

const RegisterButton = styled.button`
  padding: 5px;
  width: 100px;
  font-family: "Montserrat";
  border-radius: 4px;
  border: none;
  background: #9c92ac;
  color: #ffffff;

  &:hover {
    background: #c3bdcd;
    cursor: pointer;
  }
`

// const ErrorMessage = styled.p`

// `

const SignInForm = ({ handleFormSubmit, username, setUsername, password, setPassword, setSignUp }) => {
  // const error = useSelector(store => store.user.errors)

  const body = { usernameOrEmail: username, password: password }

  const onFormSubmit = () => {
    handleFormSubmit(SIGN_IN, body)
  }

  return (
    <Form>
      <MainHeading>SIGN IN</MainHeading>
      <SubContainer> 
        <InputField 
          id="input-username"
          label="Username"
          type="text" 
          value={username}
          handleChange={setUsername} 
        />
        <InputField 
          id="input-password"
          label="Password"
          type="password" 
          value={password}
          handleChange={setPassword} 
        />
      </SubContainer>

      {/* {error && <ErrorMessage>{error.message}</ErrorMessage>} */}

      <SignInButton type="button" onClick={onFormSubmit}>SIGN IN</SignInButton>

      <RegisterText>
        Not a user? <RegisterButton onClick={() => setSignUp(true)}>Sign up here</RegisterButton> 
      </RegisterText>
    </Form>
  )
}

export default SignInForm