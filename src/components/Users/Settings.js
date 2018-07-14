import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import {
  Button, Badge,
  Container, Row, Col,
  Modal, ModalBody, ModalFooter,
  Form, FormGroup, Label, Input, FormFeedback,
  InputGroupAddon, InputGroup
} from 'reactstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import ImageUploader from '../reusable/ImageUploader'
import _ from 'lodash'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { getMyProfile, saveProfile } from '../../actions/UsersActions'
import { getFile } from '../../actions/FilesActions'
import { withRouter } from 'react-router-dom'

class Settings extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      profile: null,
      phoneField: '',
      otpField: '',
      showOTP: false,
      formSubmitting: false
    }
  }

  componentWillMount() {
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
      var profile = snapshot.data()

      if(!profile.telegram) {
        profile = {
          ...profile,
          telegram: ''
        }
      }

      if(!profile.nusnetid) {
        profile = {
          ...profile,
          nusnetid: ''
        }
      }

      var avatarUrl = null
      if(profile.avatarUrl.startsWith('http')) {
        avatarUrl = profile.avatarUrl
      } else {
        const { firebase } = this.props

        getFile(firebase, profile.avatarUrl, (url) => {
          this.setState({
            avatarUrl: url,
          })
        })
      }

      this.setState({
        avatarUrl: avatarUrl,
        profile: {
          ...profile,
          id: auth.uid,
          original: profile
        }
      })
    })
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleFormChange = (value, type) => {
    const { profile } = this.state

    switch(type) {
      case 'displayName':
        this.setState({
          profile: {
            ...profile,
            displayName: value,
          }
        })
        break
      case 'avatar':
        this.setState({
          avatarUrl: value ? value.preview : null,
          profile: {
            ...profile,
            avatarUrl: value,
          }
        })
        break
      case 'telegram':
        this.setState({
          profile: {
            ...profile,
            telegram: value,
          }
        })
        break
      case 'nusnetid':
        this.setState({
          profile: {
            ...profile,
            nusnetid: value,
          }
        })
        break
      case 'phoneField':
        this.setState({
          phoneField: value,
        })
        break
      case 'otpField':
        this.setState({
          otpField: value,
        })
        break
      default: break
    }
  }

  validate = (clearEntryChecks) => {
    const { profile, phoneError, otpError } = this.state
    const { displayName } = profile

    return {
      displayName: !displayName,
      phone: phoneError ? true : false,
      otp: otpError ? true : false
    }
  }

  signWithPhone = () => {
    const { phoneField, recaptcha } = this.state
    const { firebase } = this.props


    const verified = recaptcha ? recaptcha : new firebase.auth.RecaptchaVerifier('sendOTPBtn', {
      size: 'invisible'
    })

    if(!recaptcha) {
      this.setState({
        recaptcha: verified
      })
    }

    if(phoneField === ''){
      this.setState({
        phoneError: {message: 'Enter a phone number.'}
      })

      return
    }

    this.setState({
      phoneSubmitting: true,
      phoneError: null
    })

    firebase.signInWithPhoneNumber(phoneField, verified)
        .then((confirmationResult) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          this.setState({
            recaptcha: null,
            phoneSubmitting: false,
            confirmationResult: confirmationResult
          })
        })
        .catch((error) => {
          // Error; SMS not sent
          // Handle Errors Here
          this.setState({
            phoneSubmitting: false,
            phoneError: error
          })
        });
  }

  enterOTP = () => {
    const { otpField, confirmationResult } = this.state
    const { firebase } = this.props

    var credential = firebase.auth.PhoneAuthProvider.credential(confirmationResult.verificationId, otpField);

    firebase.auth().currentUser
    .linkAndRetrieveDataWithCredential(credential)
    .then((result) => {
      firebase.login({
        credential: credential
      })
      .then((result) => {
        const { phoneField } = this.state

        this.setState({
          profile: {
            ...this.props.profile,
            phone: phoneField
          }
        })
      })
    })
    .catch((error) => {
      this.setState({
        otpError: true
      })
    })
  }

  submitForm = () => {
    const { firestore } = this.context.store
    const { profile } = this.state
    const { firebase } = this.props

    this.setState({
      formSubmitting: true
    })

    saveProfile(firestore, firebase, profile, (snapshot) => {
      this.setState({
        modal: true,
        formSubmitting: false
      })
    })
    //firebase.updateProfile({ role: 'admin' })
  }

  successModal = () => {
    const { modal } = this.state
    const { history } = this.props

    return(<Modal isOpen={modal} toggle={this.toggle}>
      <ModalBody>
        <h3 style={{fontWeight: 300}}>Changes Saved!</h3>
        <p>Your profile has been updated!</p>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={() => history.push('/dashboard')}>Dashboard</Button>{' '}
        <Button color="secondary" onClick={() => {
          this.toggle()
        }}>Dismiss</Button>
      </ModalFooter>
    </Modal>)
  }

  showPhoneVerification = (errors) => {
    const { phoneField, confirmationResult, otpField, phoneSubmitting, otpError, phoneError } = this.state
    const { auth } = this.props

    const phoneVerified = _.map(auth.providerData, (provider) => provider.providerId).includes("phone")

    return (<FormGroup>
      <Label><h3>Phone Verification{ phoneVerified ? <Badge className="ml-2" color="success">Verified</Badge> : '' }</h3></Label>
      {
        !confirmationResult ?
          <InputGroup>
            <Input type="text" disabled={phoneVerified || phoneSubmitting} placeholder="Phone Number (e.g. +6591234567)" value={!phoneVerified ? phoneField : auth.phoneNumber} invalid={errors.phone} onChange={(event) => this.handleFormChange(event.target.value, 'phoneField')} />
            {
              !phoneVerified ?
                <InputGroupAddon addonType="append">
                  <Button id="sendOTPBtn" color="info" onClick={() => this.signWithPhone()} disabled={phoneSubmitting}>
                    { phoneSubmitting ? <FontAwesomeIcon icon="spinner" className="mr-2" spin /> : <FontAwesomeIcon icon="mobile-alt" className="mr-2" /> } Send OTP
                  </Button>
                </InputGroupAddon>
              : ''
            }
            { phoneError ? <FormFeedback>{phoneError.message}</FormFeedback> : ''}
          </InputGroup>
        :
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <Button color="info" onClick={() => this.setState({
              otpError: false,
              confirmationResult: null
            })}>
              <FontAwesomeIcon icon="times" /> Clear
            </Button>
          </InputGroupAddon>
          <Input type="text" placeholder="6-Digit OTP Code" invalid={errors.otp} value={otpField} onChange={(event) => this.handleFormChange(event.target.value, 'otpField')} />
          <InputGroupAddon addonType="append">
            <Button color="info" onClick={() => this.enterOTP()}>
              <FontAwesomeIcon icon="mobile-alt" /> Confirm
            </Button>
          </InputGroupAddon>
          { otpError ? <FormFeedback>OTP is incorrect. Please double check and try again.</FormFeedback> : ''}
        </InputGroup>
      }
    </FormGroup>)
  }

  showProfileForm = () => {
    const { profile, avatarUrl, formSubmitting } = this.state
    //const { phoneField, confirmationResult, otpField, phoneSubmitting, otpError, phoneError } = this.state
    const { displayName, email, telegram, nusnetid } = profile

    const errors = this.validate(false)

    return(
    <Form className="m-3">
      <FormGroup>
        <Label><h3>Display Name</h3></Label>
        <Input type="text" value={ displayName } placeholder="Your Display Name" invalid={errors.displayName} onChange={(event) => this.handleFormChange(event.target.value, 'displayName')} />
        { errors.displayName ? <FormFeedback>Name cannot be empty.</FormFeedback> : ''}
      </FormGroup>
      <FormGroup>
        <Label><h3>Email</h3></Label>
        <Input type="text" value={ email } disabled />
        <Label><small>Email is fixed and cannot be changed.</small></Label>
      </FormGroup>
      <FormGroup>
        <Label><h3>Avatar</h3></Label>
        <ImageUploader
            imageSrc={avatarUrl}
            onDrop={(file) => this.handleFormChange(file, 'avatar')}
            onDelete={() => this.handleFormChange(null, 'avatar')}
          />
      </FormGroup>
      <FormGroup>
        <Label><h3>Telegram Username <small>(<a href="https://telegram.org/faq#q-what-are-usernames-how-do-i-get-one">Help</a>)</small></h3></Label>
        <InputGroup>
          <InputGroupAddon addonType="prepend">@</InputGroupAddon>
          <Input value={ telegram } placeholder="Your Telegram Handle e.g. @username" invalid={errors.telegram} onChange={(event) => this.handleFormChange(event.target.value, 'telegram')} />
        </InputGroup>
      </FormGroup>
      {
        false ?
        <FormGroup>
          <Label><h3>NUS Net ID</h3></Label>
          <Label><small>For verification of your NUS student status</small></Label>
          <Input type="text" value={ nusnetid } placeholder="Your NUS Net ID e.g. E0001234" invalid={errors.nusnetid} onChange={(event) => this.handleFormChange(event.target.value, 'nusnetid')} />
        </FormGroup> : ''
      }
      {
        false ? this.showPhoneVerification(errors) : ''
      }
      <div className="d-flex justify-content-center" >
        <Button color="primary" onClick={this.submitForm} block disabled={formSubmitting}>
          { formSubmitting ? <FontAwesomeIcon icon="spinner" spin /> : '' } Submit
        </Button>
      </div>
    </Form>)
  }

  render() {
    const { profile } = this.state

    return (<Container>
      { this.successModal() }
      <Row>
        <Col>
          <div className="d-flex">
            <div className="p-2"><h1 style={{fontWeight: 300}}>Your Settings</h1></div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          { profile ?
            this.showProfileForm()
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
