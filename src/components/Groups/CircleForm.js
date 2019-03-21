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
import { config, groupStatuses } from '../../resources/config'
import { formatFirestoreData } from '../../utils/utils'
import { getGroupTypes } from '../../actions/GroupsActions'
import ability from '../../utils/ability'
import LinkModal from '../reusable/LinkModal'

class CircleForm extends Component {
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

  showMembers = (formApi) => {
    const noOfMembers = formApi.getValue('noOfMembers')

    var members = []
    var memberIDs = []

    for(var j = 0; j < noOfMembers; j++) {
      memberIDs.push("members["+j+"]")
    }

    for(var i = 0; i < noOfMembers; i++) {
      members.push(<Col xs="12" md="6" key={"members["+i+"]"}>
        <UserInput
          key={"members["+i+"]"}
          id={"members["+i+"]"}
          field={"members["+i+"]"}
          notify={memberIDs}
          validate={this.memberValidation}
          leader={i === 0}
          validateOnChange />
      </Col>)
    }

    members.push(<Col xs="12" md="6" key="addremove">
      <div className="d-flex justify-content-center" >
        {
          noOfMembers > config.minimumIGMembers ?
            <Button outline color="danger" onClick={() => {
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

  memberValidation = ( value, values ) => {
    return validateNotEmpty(value) || duplicateValidation( value, values.members )
  }

  submit = (values) => {

    var group = values
    var memberObject = {}

    _.forEach(values.members, (memberID, index) => {
      if(index === 0) {
        group = {
          ...group,
          leaderID: memberID
        }
      } else {
        memberObject = {
          ...memberObject,
          [memberID]: true
        }
      }
    })

    group = {
      ...group,
      members: memberObject
    }

    this.props.submit(group, this.submitCallback)
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
    var { groupTypes, btnText, modal, initialValues, forInterestGroup } = this.props

    initialValues = initialValues ? initialValues : {
      noOfMembers: config.minimumIGMembers,
      status: "active",
      category: "G3RcP1MuBTbGIgCxqWXj",
      type: "eou8taQznNBJ8vvGyejp"
    }

    return(<div><Form initialValues={initialValues} getApi={(api) => {this.formApi = api}} onSubmit={ (values) => this.submit(values) }>
      { ({ formApi }) => (
       <div>
         <TextInput
             field="category"
             hidden={true} />
         <TextInput
             field="type"
             hidden={true} />
          <h3>Name</h3>
          <TextInput
            field="name"
            placeholder="Enter the Circle name"
            errortext="Please enter a name"
            validate={ validateNotEmpty }
            validateOnBlur
            className="mb-3" />
          <h3>Description</h3>
          <TextAreaInput
            field="description"
            placeholder="Enter a short description of your Circle."
            errortext="Please enter a description"
            validate={ validateNotEmpty }
            validateOnBlur
            className="mb-3" />
         <h3>Group Chat Join Link</h3>
         <TextInput
           field="chat"
           placeholder="Telegram Chat Link"
           errortext="Please enter the chat link"
           validate={ validateNotEmpty }
           validateOnBlur
           className="mb-3" />
          <h3>Logo/Image <small><Badge color="secondary">Optional</Badge></small></h3>
          <ImageInput field="logo" className="mb-3"  />
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
     onSubmit={ modal.onSubmit }
   />
  </div>)}
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    userProfiles: state.firestore.data.userProfiles,
  }
}

export default compose(
  firebaseConnect(),
  connect(mapStateToProps)
)(CircleForm)
