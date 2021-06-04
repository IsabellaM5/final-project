import React from 'react'
import styled from 'styled-components/macro'
// import { useSelector } from 'react-redux'

import { SIGN_IN } from 'reusable/urls'

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
`

const Label = styled.label`
  font-size: 1.6em;
  margin-bottom: 5px;
`

const InputField = styled.input`
  margin-bottom: 10px;
  border-radius: 4px;
  height: 30px;
  border: none;
  background: #9c92ac;
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
        <Label htmlFor="input-username">Username</Label>
        <InputField 
          id="input-username"
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <Label htmlFor="input-password">Password</Label>
        <InputField 
          id="input-password"
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
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