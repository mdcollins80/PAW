import React from 'react'
import styled from 'styled-components'

const Team = styled.div`
  border: ${props => props.select ? '5px solid black' : 'none'}
`

const TeamName = styled.p`
  margin: 5px 0;
  padding: 0 5px;
`

const Picker = (props) => {
  return (
    <Team onClick={props.clicked} select={props.selected}>
      <TeamName>{props.teamname}</TeamName>
    </Team>
  )
}

export default Picker