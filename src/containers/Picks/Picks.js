import React, { Component } from 'react'
import { connect } from 'react-redux'
import { isAuthenticated, accessToken } from '../../reducers/'
import axios from 'axios'
import styled from 'styled-components'
import { Row, Col } from 'react-flexbox-grid'

import Box from '../../components/Box/Box'
import H1 from '../../components/H1/H1'
import Select from '../../components/Select/Select'
import Button from '../../components/Button/Button'

const PicksContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const WeekPicker = styled(Select)`

`

const GameRow = styled(Row)`
  display: flex;
  justify-content: space-around;
  align-items: center;
`

class Picks extends Component {
  state = {
    weeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
    games: null,
    selectedWeek: 1,
    picks: null
  }
  
  // make the team names clickable.  onClick, check if a pick exists for this
  // game already.  if it doesn't, POST request to select that team to win.
  // if it does, PATCH request to update the pick.  POST and PATCH if and only 
  // if it is NOT past kickoff time.
  // pull the userpicks and highlight the teams they have chosen.
  // when there is a winner for the game, highlight the row in green for a match
  // red for a wrong pick
  
  
  componentDidMount () {
    const config = {
      headers: {'Authorization': 'JWT ' + this.props.token}
    }
    
    if (!JSON.parse(localStorage.getItem('games'))) {
      axios.all([this.axiosGetRequest('/api/games/', config), this.axiosGetRequest('api/userpicks/', config)])
        .then(axios.spread((games, picks) => {
          this.setState({games: games.data, picks: picks.data})
        }))
        .then(() => localStorage.setItem('games', JSON.stringify(this.state.games)))
        .catch(error => console.log(error))
    } else {
      this.axiosGetRequest('/api/userpicks/', config)
        .then(response => this.setState({picks: response.data}))
        .catch(error => console.log(error))
      this.setState({games: JSON.parse(localStorage.getItem('games'))})
    }
  }
  
  axiosGetRequest = (url, config) => {
    return axios.get(process.env.REACT_APP_API_URL + url, config)
  }
  
  weekSelect = (week) => {
    this.setState({selectedWeek: week})
  }
  
  render () {
    return (
      <PicksContainer>
        <H1>Your Picks</H1>
        <WeekPicker options={this.state.weeks}
                    handleSelect={(event) => this.weekSelect(event.target.value)}/>
        <Box buffer='small'>
            {this.state.games ? this.state.games.filter(game => game.week_num === parseInt(this.state.selectedWeek, 10))
              .map(game => (
                <GameRow key={game.id}>
                  <Col>
                    <p>{game.id}</p>
                  </Col>
                  <Col>
                    <p>{game.away_team.name}</p>
                  </Col>
                  <Col>
                    @
                  </Col>
                  <Col>
                    <p>{game.home_team.name}</p>
                  </Col>
                </GameRow>
              )) : "loading.."
            }
        </Box>
        <Button>Submit Picks</Button>
      </PicksContainer>
    )
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: isAuthenticated(state),
  token: accessToken(state)
})

export default connect(mapStateToProps, null)(Picks)