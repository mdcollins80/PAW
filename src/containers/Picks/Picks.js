import React, { Component } from 'react'
import { connect } from 'react-redux'
import { isAuthenticated, accessToken, theUser } from '../../reducers/'
import axios from 'axios'
import styled from 'styled-components'
import { Row, Col } from 'react-flexbox-grid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Box from '../../components/Box/Box'
import H1 from '../../components/H1/H1'
import Select from '../../components/Select/Select'
import Button from '../../components/Button/Button'
import Picker from '../../components/Picker/Picker'
import pickColorer from '../../helpers/pickColorer'
import weekSelector from '../../helpers/weekSelector'

const PicksContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const WeekPicker = styled(Select)`

`

const GameRow = styled(Row)`
  align-items: center;
  background: ${props => pickColorer(props.pickiscorrect)};
  border-bottom: 1px solid black;
  &:last-child {
    border-bottom: none;
  }
  display: flex;
  height: 50px;
  justify-content: space-around;
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
    selectedWeek: weekSelector(),
    picks: null,
    userteam: null
  }
  
  // add a fontawesome logo for the locked picks
  // add a function to select the current pick week (if today is between Tuesdays)
  
  
  
  componentDidMount () {
    console.log(weekSelector())
    if (!JSON.parse(localStorage.getItem('games'))) {
      console.log('trying the axios dual get request')
      axios.all([this.axiosGetRequest('/api/userteams/'), this.axiosGetRequest('/api/games/'), this.axiosGetRequest('/api/userpicksOwned/')])
        .then(axios.spread((teams, games, picks) => {
          const userteam = teams.data.filter(team => {
            return team.owner === this.props.userID
          })
          this.setState({userteam: userteam[0], games: games.data, picks: picks.data})
        }))
        .then(() => localStorage.setItem('games', JSON.stringify(this.state.games)))
        .catch(error => console.log(error))
    } else {
      axios.all([this.axiosGetRequest('/api/userteams/'), this.axiosGetRequest('/api/userpicksOwned/')])
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
  
  axiosPatchPick = (data, id) => {
    console.log(data)
    console.log(id)
    return axios.patch(process.env.REACT_APP_API_URL + '/api/userpicksPost/' + id + '/', data, this.state.config)
  }
  
  
  axiosDeletePick = (id) => {
    return axios.delete(process.env.REACT_APP_API_URL + '/api/userpicks/' + id + '/', this.state.config)
  }
  
  weekSelect = (week) => {
    this.setState({selectedWeek: week})
  }
  
  onPickSelect = (kickoff, gameID, pickID) => {
    if (Date.now() - Date.parse(kickoff) < 0) {
      const data = {
        game: gameID,
        team: this.state.userteam.id, //owner's team ID
        pick: pickID
      }
      
      const picks = this.state.picks
      
      if (picks) {
        const exactMatch = picks.filter(pick => {
          return pick.game.id === gameID && pick.pick.id === pickID
        })
        const looseMatch = picks.filter(pick => {
          return pick.game.id === gameID
        })
        if (exactMatch[0]) {
          this.axiosDeletePick(exactMatch[0].id)
            .then(() => this.axiosGetRequest('/api/userpicksOwned/')
              .then(response => this.setState({picks: response.data}))
            )
        } else if (looseMatch[0]) {
          this.axiosPatchPick(data, looseMatch[0].id)
            .then(response => console.log(response))
            .then(() => this.axiosGetRequest('/api/userpicksOwned/')
              .then(response => this.setState({picks: response.data}))
            )
        } else {
          this.axiosPostPick(data)
            .then(() => this.axiosGetRequest('/api/userpicksOwned/')
              .then(response => this.setState({picks: response.data}))
            )
        }
      }
    } else {
      alert("Can't make changes after kickoff!")
    }
  }
    
  pickChecker = (gameID, pickID) => {
    const picks = this.state.picks
    if (picks) {
      const gamePick = picks.filter(pick => {
        return pick.game.id === gameID && pick.pick.id === pickID
      })
      const games = picks.map(pick => {
        return pick.game.id
      })
      if (gamePick[0]) {
        return 'DELETE'
      } else if (games.includes(gameID)) {
        return 'PATCH'
      } else {
        return 'POST'
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
  
  checkPickCorrect = (gameID, winnerID) => {
    if (winnerID) {
      const picks = this.state.picks
      if (picks) {
        const pick = picks.filter(pick => {
          return pick.game.id === gameID
        })
        if (pick[0]) {
          if (pick[0].pick.id === winnerID) {
            return 'W'
          } else {
            return 'L'
          }
        } else {
          return 'X'
        }
      }
    } else if (winnerID === 0) {
      return 'T'
    } else {
      return 'X'
    }
  }
  
  didGameKickoff = (kickoff) => {
    if (Date.now() - Date.parse(kickoff) > 0) {
      return true
    } else {
      return false
    }
  }
  
  render () {
    return (
      <PicksContainer>
        <H1>Your Picks</H1>
        <WeekPicker options={this.state.weeks}
                    initial={this.state.selectedWeek}
                    handleSelect={(event) => this.weekSelect(event.target.value)}/>
        <Box buffer='small'>
            {this.state.games ? this.state.games.filter(game => game.week_num === parseInt(this.state.selectedWeek, 10))
              .map(game => (
                <GameRow key={game.id}
                         pickiscorrect={this.checkPickCorrect(game.id, game.winner)}>
                  <Col xs={1}>
                    {this.didGameKickoff(game.kickoff) ? <FontAwesomeIcon icon="lock" /> : <p>{game.id}</p>}
                  </Col>
                  <Col xs={4}>
                    <Picker clicked={() => this.onPickSelect(game.kickoff, game.id, game.away_team.id)} 
                            selected={this.isPickSelected(game.id, game.away_team.id)} 
                            teamname={game.away_team.name} />
                  </Col>
                  <Col xs={1}>
                    @
                  </Col>
                  <Col xs={4}>
                    <Picker clicked={() => this.onPickSelect(game.kickoff, game.id, game.home_team.id)} 
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