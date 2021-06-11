import React from 'react'
import styled from 'styled-components/macro'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`

const TotalProjectsWrapper = styled.div`

`

const Avatar = styled.img`
  border-radius: 50%;
  overflow: none;
`

const Title = styled.h2`
  font-size: 1.8em;
`

const Diagram = styled.img`
  border-radius: 50%;
  overflow: none;
`

const CollaboratorsContainer = styled.div`
  width: 100%;
`

const CollabContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const Collaborator = styled.p`
  margin-left: 10px;
  font-size: 1.6em;
`

const ProjectsCollabsContainer = ({ totalProjects }) => {
  return (
    <Container>
      <TotalProjectsWrapper>
        <Title>Total projects ongoing: {totalProjects.length}</Title>
        <Diagram src="https://via.placeholder.com/200"/>
      </TotalProjectsWrapper>
      <CollaboratorsContainer>
        <Title>Collaborators</Title>
        <CollabContainer>
          <Avatar src="https://via.placeholder.com/40"/>
          <Collaborator>Name</Collaborator>
        </CollabContainer>
      </CollaboratorsContainer>
    </Container>
  )
}

export default ProjectsCollabsContainer