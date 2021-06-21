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
import Button from 'components/reusable/Button'

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

const ButtonContainer = styled.div`
  margin-top: auto;
  padding: 16px;
`

const NavDrawer = ({ onSignOut }) => {
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
        top="10px"
        right="10px"
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