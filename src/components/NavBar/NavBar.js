import React from 'react'
import styled from 'styled-components'

const Header = styled.header`
  align-items: center;
  background-color: black;
  display: flex;
  height: 75px;
  justify-content: space-around;
  position: fixed;
  top: 0;
  width: 100%;
`

const MenuItem = styled.a`
  color: white;
  list-style: none;
  text-decoration: none;
`

const navbar = (props) => {
  return (
    <Header>
      <MenuItem>My Team</MenuItem>
      <MenuItem href="/my-picks">My Picks</MenuItem>
      <MenuItem>Log In/Out</MenuItem> 
    </Header>
  )
}

export default navbar