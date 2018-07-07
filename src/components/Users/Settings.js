import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import {
  Jumbotron, Button,
  Container, Row, Col,
  Modal, ModalHeader, ModalBody, ModalFooter,
  Form, FormGroup, Label, Input, FormFeedback,
  InputGroupAddon, InputGroup
} from 'reactstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import ImageUploader from '../reusable/ImageUploader'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { getMyProfile } from '../../utils/actions'
import { withRouter } from 'react-router-dom'

class Settings extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      profile: null,
      formSubmitting: false
    }
  }

  componentWillMount() {
    const { firestore } = this.context.store
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

      this.setState({
        avatarUrl: profile.avatarUrl,
        profile: {
          ...profile,
          id: auth.uid
        }
      })
    })
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
            avatar: value,
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
      default: break
    }
  }

  validate = (clearEntryChecks) => {
    const { profile, nameEntry } = this.state
    const { displayName } = profile

    return {
      displayName: !displayName,
    }
  }

  submitForm = () => {

  }

  showProfileForm = () => {
    const { profile, avatarUrl, formSubmitting } = this.state
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
      <FormGroup>
        <Label><h3>NUS Net ID</h3></Label>
        <Label><small>For verification of your NUS student status</small></Label>
        <Input type="text" value={ nusnetid } placeholder="Your NUS Net ID e.g. E0001234" invalid={errors.nusnetid} onChange={(event) => this.handleFormChange(event.target.value, 'nusnetid')} />
      </FormGroup>
      <FormGroup>
        <Label><h3>Phone Verification</h3></Label>
        <br/>
        <Label>Coming Soon</Label>
      </FormGroup>
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
