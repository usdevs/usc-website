import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase';
import { Alert, Button, InputGroup, InputGroupAddon } from 'reactstrap';
import { Form } from 'informed';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import LinkModal from '../reusable/LinkModal'
import _ from 'lodash'
import { TextInput, DropdownInput, ImageInput, validateNotEmpty } from '../reusable/FormInputs'
import { getUserTypes } from '../../actions/UsersActions'
import { formatFirestoreData } from '../../utils/utils'

class ProfileForm extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      submitting: false
    }
  }

  componentDidMount() {
    const { firestore } = this.context.store

    getUserTypes(firestore)
  }

  userTypeOptions = () => {
    const { userTypes } = this.props

    var options = []

    if(userTypes.isLoaded) {
      _.forEach(userTypes.ordered, (type) => {
        options.push({
          id: type.id,
          display: type.name
        })
      })
    }

    return (options)
  }

  submit = (values) => {
    this.setState({
      submitting: true,
    })

    this.props.submit(values, this.submitCallback)
  }

  submitCallback = () => {
    this.modal.toggle()

    this.setState({
      submitting: false
    })
  }

  render() {
    const { submitting } = this.state
    var { initialValues, modal, btnText } = this.props

    return(<div><Form initialValues={initialValues} getApi={(api) => {this.formApi = api}} onSubmit={ (values) => this.submit(values) }>
      { ({ formApi }) => (
       <div>
         <DropdownInput
             field="type"
             hidden={true}
             options={ this.userTypeOptions() } />
          <h3>Display Name</h3>
          <TextInput
            field="displayName"
            placeholder="Enter your display name"
            errortext="Please enter a name"
            validate={ validateNotEmpty }
            validateOnBlur
            className="mb-3" />
         <h3>Email</h3>
         <TextInput
           field="email"
           disabled={true} />
          <h4 className="text-info"><small>Email is fixed and cannot be changed.</small></h4>
          <h3>Telegram Username <FontAwesomeIcon icon={['fab', 'telegram']} className="text-primary" /><small> (<a href="https://telegram.org/faq#q-what-are-usernames-how-do-i-get-one">Help</a>)</small></h3>
          <InputGroup className="mb-3">
            <InputGroupAddon addonType="prepend">@</InputGroupAddon>
            <TextInput
              field="telegram"
              placeholder="Your Telegram Handle e.g. @username"
              errortext="Please enter your Telegram Handle"
              validate={ validateNotEmpty }
              validateOnBlur />
          </InputGroup>
          <h3>Avatar</h3>
          <ImageInput
            field="avatarUrl"
            errortext="You must have an avatar"
            validate={ validateNotEmpty }
            validateOnBlur />
          <Button className="mt-3" color="primary" type="submit" block disabled={submitting}>
            { submitting ? <FontAwesomeIcon icon="spinner" spin /> : '' } { btnText }
          </Button>
          { formApi.getState().invalid ? <Alert color="danger" className="mt-2 mb-2">One or more inputs are invalid. Please check and try again.</Alert> : ''}
       </div>
     )}
   </Form>
   <LinkModal
     ref={element => { this.modal = element }}
     title={ modal.title }
     body={ modal.body }
     primaryBtnText={ modal.primaryBtnText }
     secondaryBtnText={ modal.secondaryBtnText }
     link={ modal.link }
     onSubmit={ modal.onSubmit }
   />
  </div>)}
}

const mapStateToProps = state => {
  return {
    userTypes: formatFirestoreData(state.firestore, 'userTypes'),
  }
}

export default compose(
  firebaseConnect(),
  connect(mapStateToProps)
)(ProfileForm)
