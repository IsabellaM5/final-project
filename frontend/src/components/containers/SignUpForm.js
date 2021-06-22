import React from 'react'
import styled from 'styled-components/macro'

import { SIGN_UP } from 'reusable/urls'

import UsernameInput from 'components/minor/UsernameInput'
import EmailInput from 'components/minor/EmailInput'
import PasswordInput from 'components/minor/PasswordInput'
import RepeatPasswordInput from 'components/minor/RepeatPasswordInput'
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

const SignUpForm = ({ handleFormSubmit, username, setUsername, email, setEmail, password, setPassword, repeatPassword, setRepeatPassword, signUp, setSignUp, width }) => {
  const body = { username: username, email: email, password: password }

  const onFormSubmit = () => {
    handleFormSubmit(SIGN_UP, body)
  }

  return (
    <Form>
      <MainHeading>SIGN UP</MainHeading>
      <SubContainer>
        <UsernameInput 
          username={username}
          setUsername={setUsername}
          width={width}
          signUp={signUp}
        />
        <EmailInput 
          email={email}
          setEmail={setEmail}
          width={width}
        />
        <PasswordInput 
          password={password}
          setPassword={setPassword}
          width={width}
          signUp={signUp}
        />
        <RepeatPasswordInput 
          password={password}
          repeatPassword={repeatPassword}
          setRepeatPassword={setRepeatPassword}
          width={width}
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