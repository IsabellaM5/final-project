import React from 'react'
import styled from 'styled-components/macro'

import { SIGN_UP } from 'reusable/urls'

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

const SignUpButton = styled.button`

`

const RegisterText = styled.span`

`

const RegisterButton = styled.button`

`


const SignUpForm = ({ handleFormSubmit, username, setUsername, email, setEmail, password, setPassword, repeatPassword, setRepeatPassword, setSignUp }) => {
  const body = { username: username, email: email, password: password }

  const onFormSubmit = () => {
    handleFormSubmit(SIGN_UP, body)
  }

  return (
    <Form>
      <MainHeading>SIGN UP</MainHeading>
      <SubContainer>
      <Label htmlFor="input-username">Username</Label>
        <InputField 
          id="input-username"
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <Label htmlFor="input-email">Email</Label>
        <InputField 
          id="input-email"
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <Label htmlFor="input-password">Password</Label>
        <InputField 
          id="input-password"
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <Label htmlFor="input-repeat-password">Repeat password</Label>
        <InputField 
          id="input-repeat-password"
          type="password" 
          value={repeatPassword} 
          onChange={(e) => setRepeatPassword(e.target.value)} 
        />
      </SubContainer>

      <SignUpButton type="button" onClick={onFormSubmit}>SIGN UP</SignUpButton>
      <RegisterText>
        Already a user? <RegisterButton onClick={() => setSignUp(false)}>Go here</RegisterButton> 
      </RegisterText>
    </Form>
  )
}

export default SignUpForm