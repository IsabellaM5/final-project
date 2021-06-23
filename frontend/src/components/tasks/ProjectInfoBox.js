import React from 'react'
import styled from 'styled-components/macro'

const Wrapper = styled.div`
  width: 75%;
  display: flex;

  @media (max-width: 767px) {

  }
`

const PmContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 10px;
  width: 50%;

  @media (max-width: 767px) {

  }
`

const CollabContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 10px;
  max-width: 60%;

  @media (max-width: 767px) {

  }
`

const Heading = styled.p`
  font-size: 1.8em;
  font-weight: 500;
  margin: 2px;

  @media (max-width: 767px) {
    font-size: 1.6em;
  }
`

const Username = styled.p`
  font-size: 1.6em;
  margin: 2px;

  @media (max-width: 767px) {
    font-size: 1.4em;
  }
`

const UsernameWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const ProjectInfoBox = ({ project }) => {
  return (
    <Wrapper>
      <PmContainer>
        <Heading>
          Project Manager
        </Heading>
        <Username>
          {project.projectOwner}
        </Username>
      </PmContainer>

      <CollabContainer>
        <Heading>
          Collaborators
        </Heading>
        {project.collaborators && (
          <UsernameWrapper>
            {project.collaborators.map(collab => (
              <Username key={collab}>{collab}</Username>
            ))}
          </UsernameWrapper>
        )}
      </CollabContainer>
    </Wrapper>
  )
}

export default ProjectInfoBox