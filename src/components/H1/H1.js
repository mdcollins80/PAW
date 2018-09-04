import React from 'react'
import styled from 'styled-components'

const Title = styled.h1`
  text-align: center;
`

const H1 = (props) => {
  return (
    <Title>{props.children}</Title>
  )
}

export default H1