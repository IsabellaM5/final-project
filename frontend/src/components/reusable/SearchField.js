import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { useSelector, useDispatch } from 'react-redux'
import Chip from '@material-ui/core/Chip'
import TextField from '@material-ui/core/TextField'
import Autocomplete from "@material-ui/lab/Autocomplete"

import { API_URL, GET_USERS, EDIT_COLLAB, DELETE_COLLAB } from 'reusable/urls'

import projects from 'reducers/projects'

const AutocompleteContainer = styled.div`
  grid-area: search;
`

const ChipsContainer = styled.div`
  grid-area: collabs;
`

const Label = styled.p`
  font-size: 1.6em;
  margin: 0 0 10px 0;
  align-self: flex-start;
`

const SearchField = ({ selectedCollaborators, setSelectedCollaborators, onInputChange, onDeleteCollaborator }) => {
  const users = useSelector(store => store.projects.users)
  const accessToken = useSelector(store => store.user.info.accessToken)

  const usersArray = users.map(user => user.label)

  const [selectedOption, setSelectedOption] = useState(usersArray[0])

  const dispatch = useDispatch()

  useEffect(() => {
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken
      }
    }

    fetch(API_URL(GET_USERS), config)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          dispatch(projects.actions.setUsers(data))
        } else {
          dispatch(projects.actions.setErrors(data))
        }
      })
  }, [accessToken, dispatch])

  return (
    <>
      <AutocompleteContainer>
        <Autocomplete
          id="autocomplete"
          value={selectedOption || ''}
          onChange={(event, v) => {
            if (!v) {
              return
            }
            setSelectedOption(v)
            setSelectedCollaborators([...selectedCollaborators, v])

            if (onInputChange) {
              onInputChange(v, EDIT_COLLAB)
            }
          }}
          options={usersArray}
          style={{ width: 250, marginBottom: 'auto' }}
          renderInput={(params) => (
            <TextField {...params} label="Users" variant="outlined" />
          )}
        />
      </AutocompleteContainer>

      <ChipsContainer>
        <Label>Collaborators</Label>
        {selectedCollaborators.length !== 0 && (
          <>
            {selectedCollaborators.map(collab => (
              <Chip
                key={collab}
                label={collab}
                size="medium"
                onDelete={() => {
                  onDeleteCollaborator(collab, DELETE_COLLAB)
                }}
              />
            ))}
          </>  
        )}
      </ChipsContainer>
    </>
  )
}

export default SearchField