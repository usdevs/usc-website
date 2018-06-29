import React, { Component } from 'react'
import { Alert, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import firebase from 'firebase'
import { firebaseConnect } from 'react-redux-firebase'
import GoogleButton from 'react-google-button'
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
      const { toggle, history } = this.props;

      toggle()
      history.push('/dashboard')
    }).catch((error) => {
      this.setState({
        login: "failure",
        error: error
      })
    });
  }

  render() {
    const { login, error } = this.state;
    const { isOpen, toggle, className } = this.props;

    return (<Modal isOpen={ isOpen } toggle={ toggle } className={ className }>
        <ModalHeader toggle={ toggle }>Log In</ModalHeader>
        <ModalBody>
          <GoogleButton color="primary" onClick={this.handleLogin.bind(this)} />
          { login === "failure" ? <Alert color="danger">{ error.message }</Alert> : ''}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={ toggle }>Close</Button>
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
