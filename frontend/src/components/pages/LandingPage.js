import React from 'react'
import styled from 'styled-components/macro'

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
  return (
    <MainContainer>
      <Section>
        <CarouselContainer>
          <CarouselImage src="/assets/landing-page-placeholder-image.jpg" />
        </CarouselContainer>
        <SignInForm />
      </Section>
    </MainContainer>
  )
}

export default LandingPage