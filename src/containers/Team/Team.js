import React, { Component } from 'react'
import { connect } from 'react-redux'
import { isAuthenticated, accessToken, theUser } from '../../reducers/'
import axios from 'axios'

class Team extends Component {
  state = {
    config: {
      headers: {
        'Authorization': 'JWT ' + this.props.token
      }
    },
    teamName: '',
    team: null
  }
  
  componentDidMount () {
    axios.get(process.env.REACT_APP_API_URL + '/api/userteams?myteam=myteam/', this.state.config)
      .then(response => {
        if (response.data.length > 0) {
          this.setState({team: response.data[0], teamName: response.data[0].team_name})
        }
      })
      .catch(error => console.log(error))

    // get team that matches user and league
    // setState teamName based on this call
  }
  
  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }
  
  handleSubmit = (event) => {
    event.preventDefault()
  }
  
  createTeam = () => {
    // axios POST with this league id and user id
    const data = {
      owner: this.props.userID,
      league: 1,
      team_name: this.state.teamName
    }
    axios.post(process.env.REACT_APP_API_URL + `/api/userteams/`, data, this.state.config)
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
    axios.patch(process.env.REACT_APP_API_URL + `/api/userteams/` + this.state.team.id + '/', data, config)
      .then(response => console.log(response))
  }
  
  deleteTeam = (event) => {
    event.preventDefault()
    const config = {
      headers: {'Authorization': 'JWT ' + this.props.token}
    }
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
    )
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: isAuthenticated(state),
  token: accessToken(state),
  userID: theUser(state)
})

export default connect(mapStateToProps, null)(Team)