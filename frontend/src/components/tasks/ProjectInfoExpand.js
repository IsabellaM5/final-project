import React from 'react'
import styled from 'styled-components/macro'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import { makeStyles } from '@material-ui/core/styles'

import Icon from 'components/reusable/Icon'

import DeleteProject from 'components/tasks/DeleteProject'
import Button from 'components/reusable/Button'

const useStyles = makeStyles({
  expand: {
    fontSize: '40px',
    background: '#ffffff',
    borderRadius: '50px',
    border: '1px solid #dfdbe5'
  }
})

const MoreProjectInfoContainer = styled.div`
  display: flex;
  margin-top: 20px;

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: center;
  }
`

const ProjectInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 10px;
  max-width: 40%;

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

const ProjectBtnsContainer = styled.div`
  justify-self: stretch;
  display: flex;
  align-items: flex-start;
  height: 100%;
  max-width: 25%;

  @media (max-width: 767px) {
    justify-content: center; 
  }
`

const Container = styled.div`
  max-width: 75%;
  display: flex;

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

const ProjectInfoExpand = ({ moreInfo, toggleExpand, project, setEditMode, projectID }) => {
  const classes = useStyles()

  return (
    <>
      {moreInfo && 
        <MoreProjectInfoContainer>
          <Container>
            <ProjectInfoContainer>
              <Heading>
                Project Manager
              </Heading>
              <Username>
                {project.projectOwner}
              </Username>
            </ProjectInfoContainer>

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
          </Container>

          <ProjectBtnsContainer>
            <Button 
              btnText="EDIT"
              handleClick={() => setEditMode(true)}  
            />

            <DeleteProject 
              projectID={projectID}
            />
          </ProjectBtnsContainer>
        </MoreProjectInfoContainer>
      }
      <Icon
        icon={moreInfo ?
          <ExpandLessIcon 
            className={classes.expand}
          />
          :
          <ExpandMoreIcon 
            className={classes.expand}
          />
        }
        handleIconClick={toggleExpand}
        apiMethod={moreInfo ? false : true}
        position="absolute"
        bottom="-25px"
        ariaLabel={moreInfo ? 'collapse-project-info' : 'expand-project-info'}
      />
    </>
  )
}

export default ProjectInfoExpand