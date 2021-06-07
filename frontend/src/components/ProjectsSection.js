import React, { useEffect } from 'react'
import styled from 'styled-components/macro'
import { useSelector, useDispatch } from 'react-redux'

import { API_URL, GET_PROJECTS } from 'reusable/urls'

import projects from 'reducers/projects'

import ProjectCard from 'components/ProjectCard'

const Section = styled.section`
  width: 85%;
  padding: 50px;
  display: flex;
  flex-direction: column;
`

const ProjectsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  grid-gap: 25px;
`

const AddProjectButton = styled.button`
  align-self: flex-end;
  padding: 5px;
  width: 70px;
  font-family: "Montserrat";
  border-radius: 4px;
  border: none;
  background: #9c92ac;
  color: #ffffff;
  margin-bottom: 25px;

  &:hover {
    background: #c3bdcd;
    cursor: pointer;
  }
`

const ProjectsSection = () => {
  const userID = useSelector(store => store.user.info.userID)
  const accessToken = useSelector(store => store.user.info.accessToken)
  const items = useSelector(store => store.projects.items)

  const dispatch = useDispatch()

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken
      }
    }

    fetch(API_URL(GET_PROJECTS(userID)), options)
      .then(res => res.json())
      .then(data => {
        console.log(API_URL(GET_PROJECTS(userID)))
        console.log(data)
        if (data.success) {
          dispatch(projects.actions.setProjects(data))
        } else {
          dispatch(projects.actions.setErrors(data))
        }
      })
  }, [accessToken, dispatch, userID])

  return (
    <Section>
      <AddProjectButton>+ ADD</AddProjectButton>
      <ProjectsWrapper>
        {items.map(item => (
          <ProjectCard 
            key={item._id} 
            item={item} 
          />
        ))}
      </ProjectsWrapper>
    </Section>
  )
}

export default ProjectsSection 