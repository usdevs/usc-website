import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase';
import { Alert, Button } from 'reactstrap';
import { Form } from 'informed';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import LinkModal from '../reusable/LinkModal'
import { TextInput, TextAreaInput, validateNotEmpty } from '../reusable/FormInputs'

class FeedbackForm extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  modal = null
  formApi = null

  constructor(props) {
    super(props)

    this.state = {
      submitting: false
    }
  }

  submit = (values) => {
    this.setState({
      submitting: true,
    })

    this.props.submit({
      ...values,
      submittedBy: this.props.auth.uid
    }, this.submitCallback)
  }

  submitCallback = (reset) => {
    this.modal.toggle()

    if(reset) {
      this.formApi.reset()
    }

    this.setState({
      submitting: false
    })
  }

  render() {
    const { submitting } = this.state
    const { initialValues, btnText, modal } = this.props

    return(<div>
            <Form initialValues={initialValues} getApi={(api) => {this.formApi = api}} onSubmit={ (values) => this.submit(values) }>
              { ({ formApi }) => (
               <div>
                 <TextInput
                     field="type"
                     hidden={true} />
                  <h3>Title</h3>
                  <TextInput
                    field="title"
                    placeholder="Enter a title"
                    errortext="Please enter a title"
                    validate={ validateNotEmpty }
                    validateOnBlur
                    className="mb-3" />
                  <h3>Description</h3>
                  <TextAreaInput
                    field="description"
                    placeholder="Enter the description"
                    errortext="Please the description"
                    validate={ validateNotEmpty }
                    validateOnBlur
                    className="mb-3" />
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
          </div>)
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  }
}

export default compose(
  firebaseConnect(),
  connect(mapStateToProps)
)(FeedbackForm)
