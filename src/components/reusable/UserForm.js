import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Alert, Card, Button, InputGroup, Input, InputGroupAddon, FormFeedback } from 'reactstrap'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import UserCard from '../Users/UserCard'
import { getUserProfile, getUserByEmail } from '../../actions/UsersActions'
import { firebaseConnect } from 'react-redux-firebase';
import { withRouter } from 'react-router-dom'

class UserForm extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      email: '',
      profile: null,
      submitting: false
    }
  }

  componentDidMount() {
    const { firestore } = this.context.store
    const { value } = this.props

    if(value && value !== '') {
      getUserProfile(firestore, value, (snapshot) => {
        this.setState({
          profile: {
            ...snapshot.data(),
            id: value
          }
        })
      })
    }
  }

  componentWillReceiveProps(newProps) {
    const { firestore } = this.context.store
    const { profile } = this.state
    const { value } = newProps

    if(value && value !== '' && profile && value !== profile.id) {
      getUserProfile(firestore, value, (snapshot) => {
        this.setState({
          profile: {
            ...snapshot.data(),
            id: value
          }
        })
      })
    } else if (!value) {
      this.setState({
        email: '',
        profile: null
      })
    }
  }

  addMember = () => {
    const { email } = this.state
    const { firestore } = this.context.store
    const { fieldApi, } = this.props
    const { setError } = fieldApi;

    this.setState({
      error: null,
      submitting: true,
    })

    getUserByEmail(firestore, email, (snapshot) => {
      if (!snapshot.empty) {
        const profileDoc = snapshot.docs[0]
        const profile = profileDoc.data()

        this.setProfile(profile, profileDoc.id)
      } else {
        setError('User does not exist! Please check user has registered on this site!')
        this.setState({
          error: 'User does not exist! Please check user has registered on this site!',
          submitting: false,
        })
      }
    })
  }

  setProfile = (profile, profileID) => {
    const { fieldApi } = this.props
    const { setValue, setTouched } = fieldApi;

    setValue(profileID)
    setTouched()

    this.setState({
      submitting: false,
      profile: {
        ...profile,
        id: profileID
      }
    })
  }

  removeMember = () => {
    const {
      fieldApi
    } = this.props
    const {
      setValue,
      setTouched
    } = fieldApi;

    setValue(null)
    setTouched()

    this.setState({
      profile: null
    })
  }

  render() {
    const { email, profile, submitting, error } = this.state
    const { leader, fieldState, errortext } = this.props

    if(profile) {
      return (<div className="mb-3">
        <UserCard user={profile} leader={leader} />
        { fieldState.error ? <Alert color="danger" className="mt-1 mb-1">{ errortext ? errortext : fieldState.error}</Alert> : null }
        <Button color="danger" className="mt-2" outline onClick={this.removeMember}>
          <FontAwesomeIcon icon="trash-alt" />
        </Button>
      </div>)
    }

    return (
      <Card className="p-3 mb-3" outline color="primary">
          <h5 className="mb-0" style={{color: 'dodgerblue'}}>{ leader ? 'Leader' : 'Member'}</h5>
          <InputGroup>
            <Input
                type="email"
                placeholder="Member Email"
                value={email}
                onChange={e => this.setState({email: e.target.value})}
                disabled={submitting}
                invalid={ fieldState.error ? true : false } />
            <InputGroupAddon addonType="append">
              <Button color="info" onClick={this.addMember}>
                { submitting ? <FontAwesomeIcon icon="spinner" spin /> : ''} Add
              </Button>
            </InputGroupAddon>
            { fieldState.error || error ? <FormFeedback>{ error ? error : errortext ? errortext : fieldState.error}</FormFeedback> : null }
          </InputGroup>
        </Card>)
  }

}

const mapStateToProps = state => {
  return {
    userProfile: state.firestore.data.userProfile,
  }
}

export default withRouter(compose(
  firebaseConnect(),
  connect(mapStateToProps)
)(UserForm))
