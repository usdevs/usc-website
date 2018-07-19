import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase';
import { Alert, Button, InputGroup, InputGroupAddon, Badge } from 'reactstrap';
import { Form } from 'informed';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import LinkModal from '../reusable/LinkModal'
import _ from 'lodash'
import { TextInput, TextAreaInput, DropdownInput, ImageInput, MultiImageInput, validateNotEmpty } from '../reusable/FormInputs'
import { getUserTypes } from '../../actions/UsersActions'
import { formatFirestoreData } from '../../utils/utils'

const continentOptions = [
  {id: 'Americas', display: 'Americas'},
  {id: 'Asia', display: 'Asia'},
  {id: 'Europe', display: 'Europe'},
  {id: 'Middle East', display: 'Middle East'},
  {id: 'Oceania', display: 'Oceania'},
  {id: 'Others', display: 'Others'},
]

class IntlProgForm extends Component {
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

  componentDidMount() {
    const { firestore } = this.context.store

    getUserTypes(firestore)
  }

  submit = (values) => {
    this.setState({
      submitting: true,
    })

    const review = {
      ...values,
      reviewer: this.props.auth.uid
    }

    this.props.submit(review, this.submitCallback)
  }

  submitCallback = (shouldReset) => {
    if(shouldReset) {
      this.formApi.reset()
    }

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
          <h3>Name</h3>
          <TextInput
            field="name"
            placeholder="Enter the programme name"
            errortext="Please enter a name"
            validate={ validateNotEmpty }
            validateOnBlur
            className="mb-3" />
          <h3>Display Image</h3>
          <ImageInput
            field="displayImg"
            errortext="You must have an display image"
            validate={ validateNotEmpty }
            validateOnBlur />
           <h3>Usual Period</h3>
           <TextInput
             field="usualPeriod"
             placeholder="Enter the usual period (e.g. May)"
             errortext="Please enter the usual period"
             validate={ validateNotEmpty }
             validateOnBlur
             className="mb-3" />
           <h3>Country</h3>
           <TextInput
             field="country"
             placeholder="Enter the country or area"
             errortext="Please enter the country/region"
             validate={ validateNotEmpty }
             validateOnBlur
             className="mb-3" />
            <h3>Region</h3>
             <DropdownInput
                 field="region"
                 placeholder="Please select a region."
                 options={continentOptions}/>
             <h3 className="mt-3">Flag Display</h3>
             <ImageInput
               field="flag"
               errortext="You must upload a flag"
               validate={ validateNotEmpty }
               validateOnBlur />
             <h3>Synopsis</h3>
             <TextAreaInput
               field="synopsis"
               placeholder="Enter the synopsis for the programme."
               errortext="Please enter a synopsis"
               validate={ validateNotEmpty }
               validateOnBlur
               className="mb-3" />
             <h3>Additional Description</h3>
             <TextAreaInput
               field="description"
               placeholder="Enter the description for the programme."
               errortext="Please enter a description"
               validate={ validateNotEmpty }
               validateOnBlur
               className="mb-3" />
           <h3>Deliverables <small><Badge color="secondary">Optional</Badge></small></h3>
           <TextAreaInput
             field="deliverables"
             placeholder="Enter the programme costs."
             className="mb-3" />
           <h3>Programme Cost <small><Badge color="secondary">Optional</Badge></small></h3>
           <TextAreaInput
             field="cost"
             placeholder="Enter the programme costs."
             className="mb-3" />
           <h3>Additional Images <small><Badge color="secondary">Optional</Badge></small></h3>
           <MultiImageInput
             field="additionalImg"
             className="mb-3" />
           <h3>Other Information <small><Badge color="secondary">Optional</Badge></small></h3>
           <TextAreaInput
             field="otherInfo"
             placeholder="Enter any other information."
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
  </div>)}
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    userTypes: formatFirestoreData(state.firestore, 'userTypes'),
  }
}

export default compose(
  firebaseConnect(),
  connect(mapStateToProps)
)(IntlProgForm)
