import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase';
import { Alert, Button, Badge, Container, Row, Col } from 'reactstrap';
import { Form } from 'informed';
import { TextInput, DropdownInput, ImageInput, TextAreaInput, UserInput,
  validateNotEmpty, duplicateValidation } from '../reusable/FormInputs'
import _ from 'lodash'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { config } from '../../resources/config'
import { formatFirestoreData } from '../../utils/utils'
import { getInterestGroupTypes } from '../../actions/GroupsActions'
import { withRouter } from 'react-router-dom'
import LinkModal from '../reusable/LinkModal'

class InterestGroupForm extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  formApi = null
  modal = null

  constructor(props) {
    super(props)

    this.state = {
      submitted: false
    }
  }

  componentWillMount() {
    const { firestore } = this.context.store

    getInterestGroupTypes(firestore)
  }

  groupOptions = (igTypes) => {
    var options = []

    if(igTypes.isLoaded) {
      _.forEach(igTypes.ordered, (type) => {
        options.push({
          id: type.id,
          display: type.subName
        })
      })
    }

    return (options)
  }

  showMembers = (formApi) => {
    const noOfMembers = formApi.getValue('noOfMembers')

    var members = []

    for(var i = 0; i < noOfMembers; i++) {
      members.push(<Col xs="12" md="6" key={"members["+i+"]"}>
        <UserInput
          key={"members["+i+"]"}
          id={"members["+i+"]"}
          field={"members["+i+"]"}
          validate={(value, values) => duplicateValidation(value, values, 'members')}
          validateOnChange />
      </Col>)
    }

    members.push(<Col xs="12" md="6" key="addremove">
      <div className="d-flex justify-content-center" >
        {
          noOfMembers > config.minimumIGMembers ?
            <Button outline color="danger" onClick={() => {
              console.log(formApi.getState())
              formApi.setValue("members["+ (noOfMembers - 1) + "]", null)
              formApi.setValue('noOfMembers', noOfMembers - 1)
            }} className="mr-3">Remove Member</Button>
          : ''
        }
        <Button outline color="primary" onClick={() => formApi.setValue('noOfMembers', noOfMembers + 1)}>Add Member</Button>
      </div>
    </Col>)

    return members
  }

  submit = (values) => {
    this.props.submit(values, this.submitCallback)
  }

  submitCallback = (reset) => {
    if(reset) {
      this.formApi.reset()
    }

    this.modal.toggle()

    this.setState({
      submitting: false
    })
  }

  render() {
    const { submitting } = this.state
    var { igTypes, btnText, modal, history, initialValues } = this.props
    initialValues = initialValues ? initialValues : {
      noOfMembers: config.minimumIGMembers
    }

    return(<div><Form initialValues={initialValues} getApi={(api) => {this.formApi = api}} onSubmit={ (values) => this.submit(values) }>
      { ({ formApi }) => (
       <div>
          <h3>Name</h3>
          <TextInput
            field="name"
            placeholder="Enter the event name"
            errortext="Please enter a name"
            validate={ validateNotEmpty }
            validateOnBlur
            className="mb-3" />
          <h3>Type</h3>
          <DropdownInput
              field="type"
              placeholder="Select a Type"
              errortext="Please select a type"
              validate={ validateNotEmpty }
              disabled={ !igTypes.isLoaded }
              loading={ !igTypes.isLoaded }
              validateOnChange
              options={this.groupOptions(igTypes)}
              className="mb-3"/>
          <h3>Description</h3>
          <TextAreaInput
            field="description"
            placeholder="Enter a short description of your intended Interest Group."
            errortext="Please enter a description"
            validate={ validateNotEmpty }
            validateOnBlur
            className="mb-3" />
          <h3>Activities</h3>
          <TextAreaInput
            field="activities"
            placeholder="Please include both regular activities, and proposed one-off events (if applicable)."
            errortext="Please describe your activities"
            validate={ validateNotEmpty }
            validateOnBlur
            className="mb-3" />
          <h3>Required Support <small><Badge color="secondary">Optional</Badge></small></h3>
          <TextAreaInput
            field="support"
            placeholder="Let us know what your interest group would benefit from: Funding, venues, professor’s contacts, etc."
            className="mb-3" />
         <h3>Group Chat Join Link <small><Badge color="secondary">Optional</Badge></small></h3>
         <TextInput
           field="chat"
           placeholder="Telegram/Whatsapp Chat Link"
           className="mb-3" />
          <h3>Logo/Image <small><Badge color="secondary">Optional</Badge></small></h3>
          <ImageInput field="logo" className="mb-3"  />
          <h3>Registration Link <small><Badge color="secondary">Optional</Badge></small></h3>
          <TextInput
            field="regLink"
            placeholder="Paste your registration link here (optional)"
            className="mb-5"/>
          <h3 className="mb-0">Member List <small><Badge color="primary">Required</Badge></small></h3>
          <p><small>(at least {config.minimumIGMembers})</small></p>
          <TextInput
            field="noOfMembers"
            hidden={true} />
          <Container className="mb-3">
            <Row>
              { this.showMembers(formApi) }
            </Row>
          </Container>
          <Button color="primary" type="submit" block disabled={submitting}>
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
     history={ history }
   />
  </div>)}
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    userProfiles: state.firestore.data.userProfiles,
    igTypes: formatFirestoreData(state.firestore, 'igTypes')
  }
}

export default withRouter(compose(
  firebaseConnect(),
  connect(mapStateToProps)
)(InterestGroupForm))
