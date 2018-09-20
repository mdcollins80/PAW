import React from 'react'
import styled from 'styled-components'

const Picker = styled.select`
  border: 1px solid black;
  width: 90%;
`

const Select = (props) => {
  return (
    <Picker onChange={props.handleSelect}>
      {props.options.map((opt, index) => (
        <option key={index} value={opt}>{'Week ' + opt}</option>
      ))}
    </Picker>
  )
}

export default Select