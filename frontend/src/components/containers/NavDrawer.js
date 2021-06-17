import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { makeStyles } from '@material-ui/core/styles'
import DehazeIcon from '@material-ui/icons/Dehaze'

import Icon from 'components/minor/Icon'
import NavUserInfo from 'components/containers/NavUserInfo'

const useStyles = makeStyles({
  drawer: {
    width: '45vw'
  },
  hamburger: {
    fontSize: '40px'
  }
})

const NavLink = styled(Link)`
  text-decoration: none;
  color: #000000;
`

const NavDrawer = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)

  const classes = useStyles()
  
  const toggleDrawer = (v) => {
    setDrawerOpen(v)
  }

  return (
    <>
      <Icon 
        icon={
          <DehazeIcon 
            className={classes.hamburger}
          />
        }
        handleIconClick={toggleDrawer}
        apiMethod={true}
        position="absolute"
        top="25px"
        right="25px"
      />
      <SwipeableDrawer
        anchor="left"
        open={drawerOpen}
        onClose={() => toggleDrawer(false)}
        onOpen={() => toggleDrawer(true)}
      >
        <NavUserInfo />
        <List
          className={classes.drawer}
        >
          <ListItem
            onClick={() => toggleDrawer(false)}
          >
            <NavLink to="/authenticated/profile">
              <ListItemText>Profile</ListItemText>
            </NavLink>
          </ListItem>

          <ListItem
            onClick={() => toggleDrawer(false)}
          >
            <NavLink to="/authenticated/projects">
              <ListItemText>Overview</ListItemText>
            </NavLink>
          </ListItem>

          <ListItem
            onClick={() => toggleDrawer(false)}
          >
            <NavLink to="/authenticated/projects/new">
              <ListItemText>New project</ListItemText>
            </NavLink>
          </ListItem>
        </List>
      </SwipeableDrawer>
    </>
  )
}

export default NavDrawer