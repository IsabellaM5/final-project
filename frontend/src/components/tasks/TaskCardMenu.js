import React, { useState } from 'react'
import styled from 'styled-components/macro'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Fade from '@material-ui/core/Fade'

const IconBtn = styled.button`
  width: 28px;
  height: 28px;
  background: transparent;
  padding: 0;
  border: none;
  border-radius: 2px;
  cursor: pointer;

  &:hover {
    background: #EEE6E6;
  }
`

const TaskCardMenu = ({ _id, handleEditTask, handleDeleteTask }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  
  const handleClick = (event) => {
    
    console.log(event)
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <React.Fragment key={_id}>
      <IconBtn 
        type="button" 
        onClick={handleClick}
        aria-label="expand-menu"
      >
        {<MoreVertIcon />}
      </IconBtn>
      <Menu
        id="task-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem 
          onClick={() => {
            handleEditTask()
            handleClose()
          }}
        >
          Edit
        </MenuItem>
        <MenuItem 
          onClick={() => {
            handleDeleteTask('DELETE')
            handleClose()
          }}
        >
          Delete
        </MenuItem>
      </Menu>   
    </React.Fragment>
  )
}

export default TaskCardMenu