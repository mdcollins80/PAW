import React from 'react'
import styled from 'styled-components'

const Header = styled.header`
  align-items: center;
  display: flex;
  background-color: black;
  height: 75px;
  position: fixed;
  width: 100%;
  top: 0;
`

const Menu = styled.ul`
  align-items: center;
  display: flex;
  justify-content: space-around;
  padding: 0;
  width: 100%;
`

const MenuItem = styled.li`
  color: white;
  list-style: none;
`

const navbar = (props) => {
  return (
    <Header>
      <Menu>
        <MenuItem>My Team</MenuItem>
        <MenuItem>My Picks</MenuItem>
        <MenuItem>Log In/Out</MenuItem> 
      </Menu>
    </Header>
  )
}

export default navbar