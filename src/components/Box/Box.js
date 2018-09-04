import React from 'react'
import styled from 'styled-components'
import { Grid } from 'react-flexbox-grid'

const Container = styled(Grid)`
  border 1px solid black;
  width: 90%;
  margin: 75px auto;
`

const Box = (props) => {
  return (
    <Container>
      {props.children}
    </Container>
  )
}

export default Box