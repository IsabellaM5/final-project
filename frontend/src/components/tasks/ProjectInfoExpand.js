import React from 'react'
import styled from 'styled-components/macro'

import ProjectInfoBox from 'components/tasks/ProjectInfoBox'
import ProjectBtnsBox from 'components/tasks/ProjectBtnsBox'
import ExpandIcon from 'components/tasks/ExpandIcon'

const Container = styled.div`
  display: flex;
  margin-top: 20px;

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: center;
  }
`

const ProjectInfoExpand = ({ moreInfo, toggleExpand, project, setEditMode, projectID }) => {

  return (
    <>
      {moreInfo && 
        <Container>
          <ProjectInfoBox 
            project={project}
          />
          <ProjectBtnsBox 
            projectID={projectID}
            setEditMode={setEditMode}
          />
        </Container>
      }
      <ExpandIcon 
        moreInfo={moreInfo}
        toggleExpand={toggleExpand}
      />
    </>
  )
}

export default ProjectInfoExpand