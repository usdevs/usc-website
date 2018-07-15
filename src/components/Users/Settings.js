import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { Container, Row, Col } from 'reactstrap'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { getMyProfile, saveProfile } from '../../actions/UsersActions'
import ProfileForm from './ProfileForm'

class Settings extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      profile: null,
    }
  }

  componentDidMount() {
    const { auth } = this.props

    if(isLoaded(auth) && !isEmpty(auth)) {
      this.getProfile(auth)
    }
  }

  componentWillReceiveProps(newProps) {
    if (!isLoaded(this.props.auth) && isLoaded(newProps.auth)) {

      if(!isEmpty(newProps.auth)) {
        this.getProfile(newProps.auth)
      } else {
        this.props.history.push('/')
      }
    }
  }

  getProfile = (auth) => {
    const { firestore } = this.context.store
    getMyProfile(firestore, auth, (snapshot) => {
      this.setState({
        profile: {
          ...snapshot.data(),
          id: auth.uid
        }
      })
    })
  }

  updateProfile = (profile, callback) => {
    const { firestore } = this.context.store
    const { firebase } = this.props
    const originalProfile = this.state.profile

    saveProfile(firestore, firebase, profile, originalProfile, (snapshot) => {
      callback()
    })
  }

  render() {
    const { profile } = this.state
    const { history } = this.props

    return (
    <Container>
      <Row>
        <Col>
          <h1 style={{fontWeight: 300}} className="mt-3">Your Settings</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          {
            profile ?
              <ProfileForm
                submit={this.updateProfile}
                initialValues={profile}
                btnText="Save Profile"
                modal={{
                  title: 'Profile Updated!',
                  body: 'Your profile has been successfully updated!',
                  primaryBtnText: 'Dashboard',
                  secondaryBtnText: 'Dismiss',
                  onSubmit: () => history.push('/dashboard')
                }} />
              : <h4><FontAwesomeIcon icon="spinner" spin /> Loading Your Profile...</h4>
          }
        </Col>
      </Row>
    </Container>)
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  }
}

export default withRouter(compose(
  firebaseConnect(),
  connect(mapStateToProps)
)(Settings))
