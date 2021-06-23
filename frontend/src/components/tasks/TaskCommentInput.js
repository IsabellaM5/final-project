import React from 'react'
import styled from 'styled-components/macro'

import InputField from 'components/reusable/InputField'
import Button from 'components/reusable/Button'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`

const TaskCommentInput = ({ width, taskComments, setTaskComments, handleFormSubmit }) => {
  return (
    <Container>
      <InputField 
        id="input-task-comments"
        label="Comments"
        type="text" 
        value={taskComments} 
        handleChange={setTaskComments} 
        width={width < 768 ? '70%' : '75%'}
      />
      <Button 
        btnText="SEND"
        handleClick={handleFormSubmit}
        height="50px"
      />
    </Container>
  )
}

export default TaskCommentInput