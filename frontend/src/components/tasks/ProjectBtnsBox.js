import React from 'react'
import styled from 'styled-components/macro'

import DeleteProject from 'components/tasks/DeleteProject'
import Button from 'components/reusable/Button'

const Container = styled.div`
  justify-self: stretch;
  display: flex;
  align-items: flex-start;
  height: 100%;
  max-width: 25%;

  @media (max-width: 767px) {
    justify-content: center; 
  }
`

const ProjectBtnsBox = ({ projectID, setEditMode }) => {
  return (
    <Container>
      <Button 
        btnText="EDIT"
        handleClick={() => setEditMode(true)}  
      />

      <DeleteProject 
        projectID={projectID}
      />
    </Container>
  )
}

export default ProjectBtnsBox