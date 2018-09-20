import React, { Component } from 'react'
import { connect } from 'react-redux'
import { isAuthenticated, accessToken, theUser } from '../../reducers/'
import axios from 'axios'
import styled from 'styled-components'
import { Row, Col } from 'react-flexbox-grid'

import Box from '../../components/Box/Box'
import H1 from '../../components/H1/H1'
import Select from '../../components/Select/Select'
import Button from '../../components/Button/Button'
import Picker from '../../components/Picker/Picker'

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
    config: {
      headers: {
        'Authorization': 'JWT ' + this.props.token
      }
    },
    weeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
    games: null,
    selectedWeek: 1,
    picks: null,
    userteam: null
  }
  
  // onClick, check if a pick exists for this game already.  if it doesn't, 
  // POST request to select that team to win...BUT NEEDS TO UPDATE PICKS IN STATE TO PREVENT MULTIPLE POSTS!!!
  // if it does, PATCH request to update the pick.  POST and PATCH if and only 
  // if it is NOT past kickoff time.
  // pull the userpicks and highlight the teams they have chosen.  -- AGAIN, THIS WILL ONLY HAPPEN IF THE STATE.PICKS IS UPDATED
  // 
  // when there is a winner for the game, highlight the row in green for a match
  // red for a wrong pick
  
  
  componentDidMount () {
    console.log('componentDidMount')
    if (!JSON.parse(localStorage.getItem('games'))) {
      console.log('trying the axios dual get request')
      axios.all([this.axiosGetRequest('/api/userteams/'), this.axiosGetRequest('/api/games/'), this.axiosGetRequest('/api/userpicks/')])
        .then(axios.spread((teams, games, picks) => {
          const userteam = teams.data.filter(team => {
            return team.owner === this.props.userID
          })
          this.setState({userteam: userteam[0], games: games.data, picks: picks.data})
        }))
        .then(() => localStorage.setItem('games', JSON.stringify(this.state.games)))
        .catch(error => console.log(error))
    } else {
      axios.all([this.axiosGetRequest('/api/userteams/'), this.axiosGetRequest('/api/userpicks/')])
        .then(axios.spread((teams, picks) => {
          const userteam = teams.data.filter(team => {
            return team.owner === this.props.userID
          })
          this.setState({userteam: userteam[0], picks: picks.data})
        }))
        .catch(error => console.log(error))
      this.setState({games: JSON.parse(localStorage.getItem('games'))})
    }
  }
  
  axiosGetRequest = (url) => {
    return axios.get(process.env.REACT_APP_API_URL + url, this.state.config)
  }
  
  axiosPostPick = (data) => {
    return axios.post(process.env.REACT_APP_API_URL + '/api/userpicksPost/', data, this.state.config)
  }
  
  weekSelect = (week) => {
    this.setState({selectedWeek: week})
  }
  
  onPickSelect = (gameID, pickID) => {
    const data = {
      game: gameID,
      team: this.state.userteam.id, //owner's team ID
      pick: pickID
    }
    if (this.pickExists(gameID)) {
      console.log("PATCH time for picks!")
    } else {
      this.axiosPostPick(data)
        .then(response => console.log(response))
        .then(() => this.axiosGetRequest('/api/userpicks/'))
        .then(() => this.isPickSelected(gameID, pickID))
        .catch(error => console.log(error))
    }    
  }
  
  pickExists = (gameID) => {
    const picks = this.state.picks
    if (picks) {
      const games = picks.map(pick => {
        return pick.game
      })
      if (games.includes(gameID)) {
        return true
      } else {
        return false
      }
    }
  }
  
  isPickSelected = (gameID, pickID) => {
    const picks = this.state.picks
    if (picks) {
      const pick = picks.filter(pick => {
        return pick.game.id === gameID
      })
      if (pick[0]) {
        if (pick[0].pick.id === pickID) {
          return true
        } else {
          return false
        }
      }
    }
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
                    <Picker clicked={() => this.onPickSelect(game.id, game.away_team.id)} 
                            selected={this.isPickSelected(game.id, game.away_team.id)} 
                            teamname={game.away_team.name} />
                  </Col>
                  <Col>
                    @
                  </Col>
                  <Col>
                    <Picker clicked={() => this.onPickSelect(game.id, game.home_team.id)} 
                            selected={this.isPickSelected(game.id, game.home_team.id)} 
                            teamname={game.home_team.name} />
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
  token: accessToken(state),
  userID: theUser(state)
})

export default connect(mapStateToProps, null)(Picks)