import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import { useSelector, useDispatch } from 'react-redux'

import { API_URL, PROJECTS_URL, GET_USERS } from 'reusable/urls'

import projects from 'reducers/projects'

import ProjectCard from 'components/containers/ProjectCard'
import NewProject from 'components/forms/NewProject'
import ModalContainer from 'components/reusable/ModalContainer'
import ProjectsSectionHeader from 'components/containers/ProjectsSectionHeader'

const Section = styled.section`
  width: 85%;
  padding: 50px;
  display: flex;
  flex-direction: column;

  @media (max-width: 767px) {
    width: 100%;
    padding: 25px;
  }
`

const ProjectsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  grid-gap: 25px;
  max-height: 80%;
  overflow-y: auto;
  padding: 0px 10px;
  margin-top: 40px;
  
  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: #f3f3f3;
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: #dfdbe5;
    border-radius: 5px;
  }

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    grid-gap: 15px;
    max-height: 90%;
  }
`

const ProjectsSection = () => {
  const userID = useSelector(store => store.user.info.userID)
  const accessToken = useSelector(store => store.user.info.accessToken)
  const items = useSelector(store => store.projects.items)

  const [newItemMode, setNewItemMode] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken
      }
    }

    Promise.all([
      fetch(API_URL(PROJECTS_URL(userID)), config),
      fetch(API_URL(GET_USERS), config)
    ])
      .then((res) => {
        return Promise.all(res.map(r => r.json()))
      })
      .then(data => {
        if (data[0].success && data[1].success) {
          dispatch(projects.actions.setProjects(data[0].altProjects))
          dispatch(projects.actions.setUsers(data[1]))
        } else {
          dispatch(projects.actions.setErrors(data))
        }
      })
  }, [accessToken, dispatch, userID])

  return (
    <Section>
      <ProjectsSectionHeader 
        setNewItemMode={setNewItemMode}
      />
      <ProjectsWrapper>
        {items.length !== 0 && (
          items.map(item => (
            <ProjectCard 
              key={item._id} 
              item={item} 
            />
          ))
        )}
        
      </ProjectsWrapper>
      <ModalContainer 
        editMode={newItemMode}
        setEditMode={setNewItemMode}
        component={
          <NewProject 
            setNewItemMode={setNewItemMode}
          />
        }
      />
    </Section>
  )
}

export default ProjectsSection 