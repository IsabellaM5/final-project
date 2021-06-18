import React from 'react'

import Button from 'components/reusable/Button'
import NewTask from 'components/forms/NewTask'

const AddNewTaskContainer = ({ newItemMode, setNewItemMode }) => {
  return ( 
    <>
      {newItemMode ?
        <NewTask 
          setNewItemMode={setNewItemMode}
        />
      :
        <Button 
          btnText="+ ADD ANOTHER TASK"
          handleClick={() => setNewItemMode(true)}
          width="100%"
          background="#9c92ac"
          backgroundHover="#dfdbe5"
          borderRadius="15px"
          padding="20px"
          margin="0"
          color="#000000"
          fontWeight="500"
        />
      }
    </>
  )
}

export default AddNewTaskContainer