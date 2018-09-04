import React from 'react'
import styled from 'styled-components'

const Picker = styled.select`
  border: 1px solid black;
  width: 90%;
`

const Select = (props) => {
  return (
    <Picker onChange={props.handleSelect}>
      <option value="">Pick a Week</option>
      {props.options.map(opt => (
        <option value={opt}>{opt}</option>
      ))}
    </Picker>
  )
}

export default Select