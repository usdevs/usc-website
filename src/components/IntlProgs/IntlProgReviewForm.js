import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase';
import { Alert, Button } from 'reactstrap';
import { Form } from 'informed';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import LinkModal from '../reusable/LinkModal'
import { IntlProgInput, TextInput, DropdownInput, TextAreaInput, validateNotEmpty } from '../reusable/FormInputs'
import moment from 'moment'
import { config } from '../../resources/config'

class IntlProgReviewForm extends Component {
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

  yearOptions = () => {
    var options = []

    const startDate = moment().add(config.reviewStartYear, 'year')

    for(var i = 0; i <= -config.reviewStartYear; i++) {
      const year = startDate.clone().add(i, 'year').format('YYYY')
      options.push({id: year, display: year})
    }

    return options
  }

  submit = (values) => {
    this.setState({
      submitting: true,
    })

    this.props.submit({
      ...values,
      creator: this.props.auth.uid
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
                  <h3>Programme Name</h3>
                  <div className="mb-3">
                    <IntlProgInput
                      field="intlProg"
                      placeholder="Please enter the programme name"
                      errortext="Please indicate the programme name"
                      validate={ validateNotEmpty }
                      validateOnBlur/>
                  </div>
                  <h3>Year Went</h3>
                  <DropdownInput
                    field="year"
                    placeholder="Select a Year"
                    validate={validateNotEmpty}
                    validateOnChange
                    options={this.yearOptions()} />
                  <h3>Review</h3>
                  <TextAreaInput
                    field="review"
                    placeholder="Enter your review"
                    errortext="Please your review"
                    validate={ validateNotEmpty }
                    validateOnBlur
                    style={{minHeight: '400px'}}
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
)(IntlProgReviewForm)
