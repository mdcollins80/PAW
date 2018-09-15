import React, { Component } from 'react'
import { connect } from 'react-redux'
import { isAuthenticated, accessToken, theUser } from '../../reducers/'
import axios from 'axios'

class Team extends Component {
  state = {
    teamName: '',
    team: null
  }
  
  componentDidMount () {
    console.log("this.props.token")
    console.log(this.props.token)
    
    const config = {
      headers: {'Authorization': 'JWT ' + this.props.token}
    }
  
    axios.get(process.env.REACT_APP_API_URL + '/api/userteams/', config)
      .then(response => {
        console.log(response)
        console.log(response.data)
        this.setState({team: response.data[0]})
      })
      .then(() => {
        this.setState({teamName: this.state.team.team_name})
      })
      .catch(error => console.log(error))

    // get team that matches user and league
    // setState teamName based on this call
  }
  
  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
    console.log(this.state[event.target.name])
  }
  
  handleSubmit = (event) => {
    event.preventDefault()
    console.log(event)
  }
  
  createTeam () {
    // axios POST with this league id and user id
    const config = {
      headers: {'Authorization': 'JWT ' + this.props.token}
    }
    
    const data = {
      owner: this.props.userID,
      league: 1,
      team_name: this.state.teamName
    }
    console.log("createTeam fired")
    console.log(data)
    axios.post(process.env.REACT_APP_API_URL + `/api/userteams/`, data, config)
      .then(response => console.log(response))
  }
  
  updateTeam = (event) => {
    // axios PATCH with this team id
    event.preventDefault()
    const config = {
      headers: {'Authorization': 'JWT ' + this.props.token}
    }
    
    const data = {
      owner: this.props.userID,
      league: this.state.team.league,
      team_name: this.state.teamName
    }
    console.log('updateTeam fired')
    console.log(data)
    axios.patch(process.env.REACT_APP_API_URL + `/api/userteams/` + this.state.team.id + '/', data, config)
      .then(response => console.log(response))
  }
  
  deleteTeam = (event) => {
    event.preventDefault()
    const config = {
      headers: {'Authorization': 'JWT ' + this.props.token}
    }
    console.log('deleteTeam fired')
    axios.delete(process.env.REACT_APP_API_URL + `/api/userteams/` + this.state.team.id, config)
      .then(response => console.log(response))
      .then(this.setState({team_name: '', team: null}))
  }
    
  render () {
    return (
      <React.Fragment>
        <h1>This is my Team page!</h1>
        <form>
          <input placeholder="Team Name"
                 type="text"
                 name="teamName"
                 value={this.state.teamName}
                 onChange={this.handleChange} />
          <button type="submit"
                  onClick={this.state.team ? this.updateTeam : this.createTeam}>
                  {this.state.team ? 'Update Team' : 'Create Team'}
          </button>
          <button type="submit"
                  onClick={this.deleteTeam}> Delete Team
          </button>
        </form>
      </React.Fragment>
      // show team name
      // have dynamic button
      // if team exists for user, button is PATCH
      // if no team exists, button is POST
      
    )
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: isAuthenticated(state),
  token: accessToken(state),
  userID: theUser(state)
})

export default connect(mapStateToProps, null)(Team)