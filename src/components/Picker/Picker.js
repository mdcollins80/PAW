import React from 'react'
import styled from 'styled-components'

const Team = styled.div`
  border: ${props => props.select ? '2px solid green' : 'none'}
`

const Picker = (props) => {
  return (
    <Team onClick={props.clicked} select={props.selected}>
      <p>{props.teamname}</p>
    </Team>
  )
}

export default Picker