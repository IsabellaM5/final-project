import React from 'react'
import styled from 'styled-components/macro'
// import { useSelector } from 'react-redux'

import { SIGN_IN } from 'reusable/urls'

const MainHeading = styled.h1`

`

const Form = styled.form`
  width: 48%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #f2eff6;
  border-radius: 20px;
`

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const Label = styled.label`

`

const InputField = styled.input`

`

const SignInButton = styled.button`

`

const RegisterText = styled.span`

`

const RegisterButton = styled.button`

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
      <MainHeading>LOG IN</MainHeading>
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
        Not a user? <RegisterButton onClick={() => setSignUp(true)}>Register here</RegisterButton> 
      </RegisterText>
    </Form>
  )
}

export default SignInForm