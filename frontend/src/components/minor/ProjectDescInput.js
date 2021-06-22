import React from 'react' 

import InputField from 'components/reusable/InputField'

const ProjectDescInput = ({ projectDesc, setProjectDesc }) => {
  return (
    <InputField
      id="input-project-description"
      label="Description"
      type="text"
      value={projectDesc} 
      multiline={true}
      handleChange={setProjectDesc} 
      width="100%"
      error={projectDesc.length > 40}
      helperText={projectDesc.length > 40 ? 'Cannot be longer than 40 characters' : ''} 
      autoComplete="off"
    />
  )
}

export default ProjectDescInput