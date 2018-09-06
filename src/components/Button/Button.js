import React from 'react'
import styled from 'styled-components'

const Btn = styled.button`
  background-color: #aaa;
  border: 1px solid black;
  height: 25px;
  margin-bottom: 20px;
  padding: 1px;
  width: 80%;
`

const Button = (props) => {
  return (
    <Btn onClick={props.onClick}>{props.children}</Btn>
  )
}

export default Button