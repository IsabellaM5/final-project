import React from 'react'
import styled from 'styled-components/macro'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

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

const RegisterText = styled.p`

`

const RegisterLink = styled(Link)`

`

const ErrorMessage = styled.p`

`

const SignInForm = ({ onFormSubmit, username, setUsername, password, setPassword, setMode }) => {
  const error = useSelector(store => store.user.errors)

  return (
    <Form onSubmit={onFormSubmit}>
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

      {error && <ErrorMessage>{error.message}</ErrorMessage>}

      <SignInButton type="submit" onClick={() => setMode('signin')}>SIGN IN</SignInButton>

      <RegisterText>
        Not a user? <RegisterLink to="/signup">Register here</RegisterLink> 
      </RegisterText>
  </Form>
  )
}

export default SignInForm