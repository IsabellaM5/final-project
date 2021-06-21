import React from 'react'
import styled from 'styled-components/macro'

import { SIGN_UP } from 'reusable/urls'

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

  @media (max-width: 767px) {
    width: 100%;
    height: 100%;
  }
`

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 50%;

  @media (max-width: 767px) {
    width: 100%;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const RegisterText = styled.p`
  font-size: 2.0em;
  text-align: center;
  margin: 5px 0 0 0;

  @media (max-width: 767px) {
    font-size: 1.6em;
  }
`

const SignUpForm = ({ handleFormSubmit, username, setUsername, email, setEmail, password, setPassword, repeatPassword, setRepeatPassword, setSignUp, width }) => {
  const body = { username: username, email: email, password: password }

  const onFormSubmit = () => {
    handleFormSubmit(SIGN_UP, body)
  }

  return (
    <Form>
      <MainHeading>SIGN UP</MainHeading>
      <SubContainer>
        <InputField 
          id="input-username"
          label="Username"
          type="text" 
          value={username}
          handleChange={setUsername}
          width={width < 768 && '100%'} 
        />
        <InputField 
          id="input-email"
          label="Email"
          type="text" 
          value={email} 
          handleChange={setEmail}
          width={width < 768 && '100%'} 
        />
        <InputField 
          id="input-password"
          label="Password"
          type="password" 
          value={password} 
          handleChange={setPassword}
          width={width < 768 && '100%'} 
        />
        <InputField 
          id="input-repeat-password"
          label="Repeat password"
          type="password" 
          value={repeatPassword} 
          handleChange={setRepeatPassword}
          width={width < 768 && '100%'} 
        />
      </SubContainer>

      <Button 
        btnText="SIGN UP" 
        disabled={password === repeatPassword && password ? false : true } 
        handleClick={onFormSubmit}
        padding="10px 15px"
      />

      <Container>
        <RegisterText>Already a user? </RegisterText>
        <Button 
          btnText="SIGN IN HERE" 
          handleClick={() => setSignUp(false)} 
          padding="10px 15px"
        /> 
      </Container>
    </Form>
  )
}

export default SignUpForm