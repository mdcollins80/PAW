import React, { Component } from 'react'
import { connect } from 'react-redux'
import { isAuthenticated, accessToken } from '../../reducers/'
import axios from 'axios'
import styled from 'styled-components'
import { Grid, Row, Col } from 'react-flexbox-grid'

import H1 from '../../components/H1/H1'
import Box from '../../components/Box/Box'

const HomeContainer = styled.div`

`

const Heading = styled.p`
  text-transform: uppercase;
  font-weight: bold;
`

const ColX = styled(Col)`
  padding-left: 10px;
  padding-right: 10px;
`

const Wins = styled.p`
  text-align: center;
`

class Home extends Component {
  state = {
    userteams: null
  }
  
  componentDidMount () {
    const config = {
      headers: {'Authorization': 'JWT ' + this.props.token}
    }
    
    axios.get(process.env.REACT_APP_API_URL + `/api/userteams`, config)
      .then(response => {
        this.setState({userteams: response.data})
      })
      .catch(error => console.log(error))
  }
  
  render() {
    return (
      <HomeContainer>
        <H1>League Leaderboard</H1>
        <Box>
          <Row>
            <ColX xs={10}>
              <Heading>Team Name</Heading>
              {this.state.userteams ? this.state.userteams.map((team, index) => (
                <p key={index}>{team.team_name}</p>
              )) : 'loading...'}
            </ColX>
            <ColX xs={2}>
              <Heading>Wins</Heading>
              {this.state.userteams ? this.state.userteams.map((team, index) => (
                <Wins key={index}>##</Wins>
              )) : ''}
            </ColX>
          </Row>
        </Box>
      </HomeContainer>
    )
  }
}


const mapStateToProps = (state) => ({
  isAuthenticated: isAuthenticated(state),
  token: accessToken(state)
})

// const mapDispatchToProps = (dispatch) => ({
//   onSubmit: (email, password) => {
//     dispatch(login(email, password))
//   }
// })

export default connect(mapStateToProps, null)(Home)