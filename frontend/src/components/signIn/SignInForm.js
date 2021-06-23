import React from 'react'
import styled from 'styled-components/macro'
import { useSelector } from 'react-redux'

import { SIGN_IN } from 'reusable/urls'

import UsernameInput from 'components/signIn/UsernameInput'
import PasswordInput from 'components/signIn/PasswordInput'
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

  @media (max-width: 1439px) {
    width: 100%;
  }
`

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 30%;
  justify-content: space-evenly;

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

const ErrorMessage = styled.p`
  font-size: 1.8em;
  color: #ff0000;
  margin: 0;

  @media (max-width: 767px) {
    font-size: 1.6em;
  }
`

const SignInForm = ({ handleFormSubmit, username, setUsername, password, setPassword, signUp, setSignUp, width }) => {
  const err = useSelector(store => store.user.errors) 

  const body = { usernameOrEmail: username, password: password }

  const onFormSubmit = () => {
    handleFormSubmit(SIGN_IN, body)
  }

  return (
    <Form>
      <MainHeading>SIGN IN</MainHeading>
      <SubContainer> 
        <UsernameInput 
          username={username}
          setUsername={setUsername}
          width={width}
          signUp={signUp}
          label="Username or email"
        />
        <PasswordInput 
          password={password}
          setPassword={setPassword}
          signUp={signUp}
        />

        {err && username.length !== 0 ? <ErrorMessage>{err.message}</ErrorMessage> : ''}
      </SubContainer>

      <Button 
        btnText="SIGN IN" 
        handleClick={onFormSubmit}
        padding="10px 15px"
      />

      <Container>
        <RegisterText>Not a user?</RegisterText>
        <Button 
          btnText="SIGN UP HERE" 
          handleClick={() => setSignUp(true)}
          padding="10px 15px"
        /> 
      </Container>
    </Form>
  )
}

export default SignInForm