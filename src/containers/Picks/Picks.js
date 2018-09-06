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
    selectedWeek: 1
  }
  
  componentDidMount () {
    const config = {
      headers: {'Authorization': 'JWT ' + this.props.token}
    }
    
    if (!JSON.parse(localStorage.getItem('games'))) {
      axios.get(process.env.REACT_APP_API_URL + `/api/games`, config)
        .then(response => {
          this.setState({games: response.data})
        })
        .then(() => localStorage.setItem('games', JSON.stringify(this.state.games)))
        .catch(error => console.log(error))
    } else {
      this.setState({games: JSON.parse(localStorage.getItem('games'))})
    }
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
            {this.state.games ? this.state.games.filter(game => game.week_num === parseInt(this.state.selectedWeek))
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