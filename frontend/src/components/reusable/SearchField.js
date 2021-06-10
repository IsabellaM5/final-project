import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { useSelector, useDispatch } from 'react-redux'
import Chip from '@material-ui/core/Chip'
import TextField from '@material-ui/core/TextField'
import Autocomplete from "@material-ui/lab/Autocomplete"

import { API_URL, GET_USERS } from 'reusable/urls'

import projects from 'reducers/projects'

const SearchFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: flex-end;
`

const ChipsContainer = styled.div`
  margin: 10px 0px;
`

const Label = styled.label`
  font-size: 1.6em;
  margin-bottom: 5px;
`

const SearchField = ({ selectedCollaborators, setSelectedCollaborators }) => {
  const users = useSelector(store => store.projects.users)
  const accessToken = useSelector(store => store.user.info.accessToken)

  const usersArray = users.map(user => user.label)
  console.log(selectedCollaborators)

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
        console.log(data)
        if (data.success) {
          dispatch(projects.actions.setUsers(data))
        } else {
          dispatch(projects.actions.setErrors(data))
        }
      })
  }, [accessToken, dispatch])

  return (
    <SearchFieldContainer>
      <Autocomplete
        id="autocomplete"
        value={selectedOption || ''}
        onChange={(event, v) => {
          setSelectedOption(v)
          setSelectedCollaborators([...selectedCollaborators, v])
        }}
        options={usersArray}
        style={{ width: 300, marginBottom: 'auto' }}
        renderInput={(params) => (
          <TextField {...params} label="Users" variant="outlined" />
        )}
      />
      <Label htmlFor="input-collaborators">Collaborators</Label>
      {selectedCollaborators.length > 0 && (
        <ChipsContainer 
          selectedCollaborators={selectedCollaborators}
        >
          {selectedCollaborators.map(collab => (
            <Chip
              key={collab}
              label={collab}
              size="small"
            />
          ))}
        </ChipsContainer>
      )}
    </SearchFieldContainer>
  )
}

export default SearchField