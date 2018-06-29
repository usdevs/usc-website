import React, { Component } from 'react'
import { Alert, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import firebase from 'firebase'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import GoogleButton from 'react-google-button'
import { Redirect } from 'react-router'
import { saveGoogleToken } from '../actions'

class LoginModal extends Component {
  constructor(props) {
    super(props)
    this.handleLogin = this.handleLogin.bind(this)

    this.state = {
      login: null,
      error: null,
    }
  }

  handleLogin() {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('email');
    provider.addScope('https://www.googleapis.com/auth/calendar');
    console.log('reached2')

    firebase.login({ provider: 'google', type: 'popup' }).then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const { toggle, saveGoogleToken, history } = this.props;

      toggle()
      history.push('/dashboard')
    }).catch((error) => {
      this.setState({
        login: "failure",
        error: error
      })
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  render() {
    const { login, error } = this.state;
    const { auth } = this.props;

    return (<Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className={this.props.className}>
        <ModalHeader toggle={this.props.toggle}>Log In</ModalHeader>
        <ModalBody>
          <GoogleButton color="primary" onClick={this.handleLogin.bind(this)} />
          { login === "failure" ? <Alert color="danger">{ error.message }</Alert> : ''}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.props.toggle}>Close</Button>
        </ModalFooter>
      </Modal>)
  }
}

LoginModal.propTypes = {
  firebase: PropTypes.shape({
    login: PropTypes.func.isRequired
  }),
  auth: PropTypes.object
}

export default withRouter(compose(
  firebaseConnect(), // withFirebase can also be used
  connect(({ firebase: { auth } }) => ({ auth }),  { saveGoogleToken })
)(LoginModal))
