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

const Header = styled.th`
  text-transform: uppercase;
  font-weight: bold;
  text-align: left;
`

const Numbers = styled.td`
  text-align: right;
  
`

const ColX = styled(Col)`
  padding-left: 10px;
  padding-right: 10px;
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
        const teamsWins = teams.data.map(team => {
          const teamPicks = picks.data.filter(pick => pick.team.id === team.id)
          const correctPicks = teamPicks.filter(pick => pick.correct === 1)
          team.picks = teamPicks.length
          team.wins = correctPicks.length
          return team
        })
        this.setState({userteams: teamsWins})
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
              <table>
                <tr>
                  <Header>Team</Header>
                  <Header>Picks</Header>
                  <Header>Wins</Header>
                  <Header>%</Header>
                </tr>
                {this.state.userteams ? this.state.userteams.sort((a,b) => b.wins - a.wins).map((team, index) => {
                  const winPct = team.wins ? Math.round(team.wins/team.picks * 100) : '-'
                  return (
                    <tr key={index}>
                      <td>{team.team_name}</td>
                      <Numbers>{team.picks}</Numbers>
                      <Numbers>{team.wins}</Numbers>
                      <Numbers>{winPct}%</Numbers>
                    </tr>
                  )})
                 : 'loading...'}
              </table>

              
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