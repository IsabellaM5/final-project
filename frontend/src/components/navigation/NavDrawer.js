import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { makeStyles } from '@material-ui/core/styles'
import DehazeIcon from '@material-ui/icons/Dehaze'

import Icon from 'components/reusable/Icon'
import NavUserInfo from 'components/navigation/NavUserInfo'
import Button from 'components/reusable/Button'
import WindowDimensions from 'components/misc/WindowDimensions'

const useStyles = makeStyles({
  drawer: {
    width: '45vw'
  },
  drawerTablet: {
    width: '30vw'
  },
  hamburger: {
    fontSize: '40px'
  }
})

const NavLink = styled(Link)`
  text-decoration: none;
  color: #000000;
`

const ButtonContainer = styled.div`
  margin-top: auto;
  padding: 16px;
`

const NavDrawer = ({ onSignOut }) => {
  const [drawerOpen, setDrawerOpen] = useState(false)

  const classes = useStyles()
  const { width } = WindowDimensions()
  
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
        top="10px"
        right="10px"
        ariaLabel="menu"
      />
      <SwipeableDrawer
        anchor="left"
        open={drawerOpen}
        onClose={() => toggleDrawer(false)}
        onOpen={() => toggleDrawer(true)}
      >
        <NavUserInfo />

        <List
          className={width < 768 ? classes.drawer : classes.drawerTablet}
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
        </List>

        <ButtonContainer>
          <Button
            handleClick={onSignOut} 
            btnText="SIGN OUT"
          />
        </ButtonContainer>
      </SwipeableDrawer>
    </>
  )
}

export default NavDrawer