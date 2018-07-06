import React, { Component } from 'react'
import { Alert, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import GoogleButton from 'react-google-button'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { initialiseGAPI, signIn } from '../../utils/actions'
import { firebaseConfig } from '../../resources/config'

class LoginModal extends Component {
  constructor(props) {
    super(props)
    this.handleLogin = this.handleLogin.bind(this)

    this.state = {
      login: null,
      error: null,
      formSubmitting: false,
    }

    initialiseGAPI()
  }

  handleLogin() {
    const { firebase } = this.props

    this.setState({
      formSubmitting: true,
    })

    signIn(firebase, (result) => {
      const { toggle, history } = this.props;

      this.setState({
        formSubmitting: false,
      })

      toggle()
      history.push('/dashboard/login')
    }, (error) => {
      this.setState({
        login: "failure",
        error: error,
        formSubmitting: false,
      })
    })
  }

  render() {
    const { login, error, formSubmitting } = this.state;
    const { isOpen, toggle, className } = this.props;

    return (<Modal isOpen={ isOpen } toggle={ toggle } className={ className }>
        <ModalHeader toggle={ toggle }>Log In</ModalHeader>
        <ModalBody>
          { !window.gapi.client || formSubmitting ? <p><FontAwesomeIcon icon="spinner" spin /> Loading...</p> : <GoogleButton color="primary" onClick={this.handleLogin.bind(this)} /> }
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
  connect(({ firebase: { auth } }) => ({ auth }))
)(LoginModal))
