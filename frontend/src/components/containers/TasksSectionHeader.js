import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { useSelector, useDispatch } from 'react-redux'

import { API_URL, GET_USERS } from 'reusable/urls'

import projects from 'reducers/projects'

import ModalContainer from 'components/reusable/ModalContainer'
import EditProject from 'components/forms/EditProject'
import ProjectInfoExpand from 'components/containers/ProjectInfoExpand'

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

const ProjectInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 10px;
  max-width: 40%;

  @media (max-width: 767px) {

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

const TasksSectionHeader = ({ projectID }) => {
  const project = useSelector(store => store.projects.activeProject)
  const accessToken = useSelector(store => store.user.info.accessToken)

  const dispatch = useDispatch()

  const [editMode, setEditMode] = useState(false)
  const [moreInfo, setMoreInfo] = useState(false)

  useEffect(() => {
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken
      }
    }

    fetch(API_URL(GET_USERS), config)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          dispatch(projects.actions.setUsers(data))
        } else {
          dispatch(projects.actions.setErrors(data))
        }
      })
  }, [accessToken, dispatch])

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

        <ProjectInfoExpand 
          moreInfo={moreInfo}
          toggleExpand={toggleExpand}
          project={project}
          setEditMode={setEditMode}
          projectID={projectID}
        />
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