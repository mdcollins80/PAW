import React, { Component } from 'react'
import { connect } from 'react-redux'
import { isAuthenticated, accessToken } from '../../reducers/'
import axios from 'axios'
import styled from 'styled-components'
import { Row, Col } from 'react-flexbox-grid'

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

const ScoreRow = styled.div`
  display: flex;
  justify-content: space-between;
`

class Home extends Component {
  state = {
    config: {
      headers: {
        'Authorization': 'JWT ' + this.props.token
      }
    },
    userteams: null,
    userpicks: null
  }
  
  componentDidMount () {      
    axios.all([this.axiosGetRequest('/api/userteams/'), this.axiosGetRequest('/api/userpicks/')])
      .then(axios.spread((teams, picks) => {
        this.setState({userteams: teams.data, userpicks: picks.data})
      }))
      .catch(error => console.log(error))
  }
  
  axiosGetRequest = (url) => {
    return axios.get(process.env.REACT_APP_API_URL + url, this.state.config)
  }
  
  render() {
    return (
      <HomeContainer>
        <H1>League Leaderboard</H1>
        <Box>
          <Row>
            <ColX xs={10}>
              <ScoreRow>
                <Heading>Team Name</Heading>
                <Heading>Wins</Heading>
              </ScoreRow>
              {this.state.userteams ? this.state.userteams.map((team, index) => (
                <ScoreRow>
                  <p key={index}>{team.team_name}</p>
                  <Wins>{this.state.userpicks.filter(pick => pick.team.id === team.id && pick.correct === 1).length}</Wins>
                </ScoreRow>
              )) : 'loading...'}
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