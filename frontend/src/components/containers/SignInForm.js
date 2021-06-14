import React from 'react'
import styled from 'styled-components/macro'
// import { useSelector } from 'react-redux'

import { SIGN_IN } from 'reusable/urls'

import InputField from 'components/reusable/InputField'
import Button from 'components/reusable/Button'

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

const RegisterText = styled.span`
  font-size: 1.6em;
`

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

      <Button 
        btnText="SIGN IN" 
        handleClick={onFormSubmit}
      />

      <RegisterText>
        Not a user? 
        <Button 
          btnText="SIGN UP HERE" 
          handleClick={() => setSignUp(true)}
        /> 
      </RegisterText>
    </Form>
  )
}

export default SignInForm