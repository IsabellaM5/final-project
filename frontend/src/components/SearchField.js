import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { useSelector, useDispatch } from 'react-redux'
import Chip from '@material-ui/core/Chip'
import Select from 'react-select'

import { API_URL, GET_USERS } from 'reusable/urls'

import projects from 'reducers/projects'

const SearchFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const ChipsContainer = styled.div`
  margin: 10px 0px;
`

const Label = styled.label`
  font-size: 1.6em;
  margin-bottom: 5px;
`

// const SearchFieldInput = styled.input`
//   border-radius: 4px;
//   height: 30px;
//   border: none;
//   background: #9c92ac;
//   position: relative;
  
//   &:focus {
//     outline: none;
//   }
// `

// const SearchOptionsContainer = styled.ul`
//   list-style: none;
//   padding: 0;
//   display: flex;
//   flex-direction: column;
//   margin-top: 52px;
//   position: fixed;
//   align-self: stretch;
//   /* width: 100%; */
// `

// const SearchOptions = styled.li`
//   font-size: 1.6em;
//   text-decoration: none;
//   cursor: pointer;
//   background: #e0e0e0;
//   border-bottom: solid 2px #ffffff;
//   padding: 5px;
//   width: 100%;

//   &:last-child {
//     border-radius: 0px 0px 4px 4px;
//   }
// `

const SearchField = ({ collaborators, setCollaborators, selectedCollaborators, setSelectedCollaborators }) => {
  const users = useSelector(store => store.projects.users)
  const accessToken = useSelector(store => store.user.info.accessToken)

  const [selectedOption, setSelectedOption] = useState(null)

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

  const handleOptionClick = () => {
    let collabArray = ''
    console.log(selectedOption)

    collabArray = selectedOption
    setSelectedCollaborators(array => [...array, collabArray])
  }

  return (
    <SearchFieldContainer>
      <Label htmlFor="input-collaborators">Collaborators</Label>
      {selectedCollaborators.length > 0 && (
        <ChipsContainer 
          selectedCollaborators={selectedCollaborators}
        >
          {selectedCollaborators.map(collab => (
            <Chip
              label={collab}
              size="small"
            />
          ))}
        </ChipsContainer>
      )}
      <Select
        value={selectedOption}
        defaultValue={selectedOption}
        onChange={(e, newValue) => {
          setSelectedOption(newValue)
          handleOptionClick()
        }}
        options={users}
      />
      {/* <SearchFieldInput 
        id="input-collaborators"
        type="text"
        value={collaborators} 
        onChange={(e) => setCollaborators(e.target.value)}
        onKeyUp={filterSearchOptions}
        onFocus={() => setInputFieldFocus(true)}
        // onBlur={() => setInputFieldFocus(false)}
        autoComplete="off"
      />
      {inputFieldFocus && (
        <SearchOptionsContainer>
          {userArray.map(user => (
            <SearchOptions
              key={user}
              onClick={handleOptionClick}
            >
              {user}
            </SearchOptions>
          ))}
        </SearchOptionsContainer>
      )} */}
    </SearchFieldContainer>
  )
}

export default SearchField