import React from 'react'
import styled from 'styled-components'
import { Grid } from 'react-flexbox-grid'

const Container = styled(Grid)`
  border 1px solid black;
  width: 90%;
  margin: ${props => props.buffer === 'small' ? '25px auto' : '75px auto'};
`

const Box = (props) => {
  return (
    <Container buffer={props.buffer}>
      {props.children}
    </Container>
  )
}

export default Box