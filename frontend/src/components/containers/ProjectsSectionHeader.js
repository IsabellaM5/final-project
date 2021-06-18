import React from 'react'
import styled from 'styled-components/macro'

import Button from 'components/reusable/Button'

const HeaderWrapper = styled.div`
  width: 100%;
  border-bottom: 1px solid #dfdbe5;
  padding-bottom: 15px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr;
  grid-template-areas: ". heading button";

  @media (max-width: 767px) {
    grid-template-areas: "button heading .";
  }
`

const MainHeading = styled.h2`
  font-weight: 500;
  font-size: 2.4em;
  text-align: center;
  margin: 0;
  grid-area: heading;

  @media (max-width: 767px) {
    font-size: 1.8em;
  }
`

const ButtonWrapper = styled.div`
  justify-self: end;
  grid-area: button;

  @media (max-width: 767px) {
    justify-self: start;
    padding-left: 10px;
  }
`

const ProjectsSectionHeader = ({ setNewItemMode }) => {
  return (
    <HeaderWrapper>
      <MainHeading>PROJECTS OVERVIEW</MainHeading>
      <ButtonWrapper>
        <Button 
          btnText="ADD"
          handleClick={() => setNewItemMode(true)}
        />
      </ButtonWrapper>
    </HeaderWrapper>
  )
}

export default ProjectsSectionHeader