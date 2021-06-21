import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { useSelector } from 'react-redux'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'

import Icon from 'components/minor/Icon'
import ModalContainer from 'components/reusable/ModalContainer'
import EditProject from 'components/forms/EditProject'
import DeleteProject from 'components/containers/DeleteProject'
import Button from 'components/reusable/Button'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  expand: {
    fontSize: '40px',
    background: '#ffffff',
    borderRadius: '50px',
    border: '1px solid #dfdbe5'
  }
})

const HeaderWrapper = styled.div`
  width: 100%;
  border-bottom: 1px solid #dfdbe5;
  padding-bottom: 35px;
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

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

const ProjectName = styled.h2`
  font-weight: 500;
  font-size: 2.4em;
  text-align: center;
  margin: 0;

  @media (max-width: 767px) {
    font-size: 1.8em;
  }
`

const DescriptionText = styled.h3`
  font-weight: 400;
  font-size: 2.0em;
  text-align: center;
  margin: 0;

  @media (max-width: 767px) {
    font-size: 1.6em;
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

const TasksSectionHeader = ({ projectID }) => {
  const project = useSelector(store => store.projects.activeProject)

  const [editMode, setEditMode] = useState(false)
  const [moreInfo, setMoreInfo] = useState(false)

  const classes = useStyles()

  const toggleExpand = (v) => {
    setMoreInfo(v)
  }

  return (
    <>
      <HeaderWrapper>
        <ProjectInfoContainer>
          <ProjectName>
            {project.name}
          </ProjectName>
          <DescriptionText>
            {project.description}
          </DescriptionText>
        </ProjectInfoContainer>

        {!moreInfo &&
          <Icon
            icon={
              <ExpandMoreIcon 
                className={classes.expand}
              />
            }
            handleIconClick={toggleExpand}
            apiMethod={true}
            position="absolute"
            bottom="-25px"
          />
        }

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

        {moreInfo &&
          <Icon
            icon={
              <ExpandLessIcon 
                className={classes.expand}
              />
            }
            handleIconClick={toggleExpand}
            apiMethod={false}
            position="absolute"
            bottom="-25px"
          />
        }
      </HeaderWrapper>
      <ModalContainer 
        editMode={editMode}
        setEditMode={setEditMode}
        component={
          <EditProject 
            projectID={projectID}
            editMode={editMode}
            setEditMode={setEditMode}
          />
        }
      />
    </>
  )
}

export default TasksSectionHeader