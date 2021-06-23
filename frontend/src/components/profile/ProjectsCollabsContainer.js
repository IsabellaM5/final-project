import React from 'react'
import styled from 'styled-components/macro'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const TotalProjectsWrapper = styled.div`

`


const Title = styled.h2`
  font-size: 1.8em;
  font-weight: 500;
`

const Wrapper = styled.div`
  margin: 10px 0;

`

const Info = styled.p`
  font-size: 1.6em;
  margin: 0;
`

const ProjectsCollabsContainer = ({ info, totalProjects }) => {

  return (
    <Container>
      <Wrapper>
        <Title>Biography</Title>
        <Info>{info.bio}</Info>
      </Wrapper>
      <TotalProjectsWrapper>
        <Title>Total projects ongoing: {totalProjects.length}</Title>
      </TotalProjectsWrapper>
    </Container>
  )
}

export default ProjectsCollabsContainer