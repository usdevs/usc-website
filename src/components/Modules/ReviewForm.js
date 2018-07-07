import React, { Component } from 'react'
import {
  Alert, Container, Row, Col, Button,
  Form, FormGroup, Label, Input, FormFeedback
} from 'reactstrap';
import { config } from '../../resources/config'
import moment from 'moment'
import Autosuggest from 'react-autosuggest';
import _ from 'lodash'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import ModuleCard from './ModuleCard'
import { withRouter } from 'react-router-dom'

const otherVenueValue = "Other"

const newReview = {
  review: '',
  module: '',
  isAnon: false,
  semester: ''
}

class EventForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      moduleSearch: '',
      reviewEntry: false,
      moduleEntry: false,
      semesterEntry: false,
      submitFailure: false,
      suggestions: [],
      review: newReview,
    }
  }

  getModuleSuggestions = value => {
    const { modules } = this.props
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : modules.filter(module =>
      module.name.toLowerCase().slice(0, inputLength) === inputValue ||
      module.code.toLowerCase().slice(0, inputLength) === inputValue
    );
  };

  getSuggestionValue = suggestion => {
    this.handleFormChange(suggestion, 'module')

    return suggestion.name
  };

  renderSuggestion = suggestion => (
    <span className="suggestion-content list-unstyled">
      <ModuleCard
        module={suggestion}
        hideButtons
        hasShortDescription
      />
    </span>
  );

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getModuleSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  handleFormChange = (value, type) => {
    const { review } = this.state
    const { isAnon } = review

    switch(type) {
      case 'module':
        this.setState({
          moduleData: value,
          review: {
            ...review,
            module: value ? value.id : ''
          }
        })
        break
      case 'semester':
        this.setState({
          review: {
            ...review,
            semester: value
          }
        })
        break
      case 'review':
        this.setState({
          review: {
            ...review,
            review: value
          }
        })
        break
      case 'isAnon':
        this.setState({
          review: {
            ...review,
            isAnon: !isAnon
          }
        })
        break
      default: break
    }
  }

  validate = (clearEntryChecks) => {
    const { reviewEntry, moduleEntry, semesterEntry } = this.state
    const { review, module, semester } = this.state.review

    return {
      review: (reviewEntry || clearEntryChecks) ? review === '' : false,
      module: (moduleEntry || clearEntryChecks) ? module === '' : false,
      semester: (semesterEntry || clearEntryChecks) ? semester === '' : false,
    }
  }

  submitBtn = () => {
    const errors = this.validate(true)
    const noErrors = _.every(_.values(errors), function(v) {return !v;});

    if(!noErrors) {
      this.setState({
        reviewEntry: true,
        moduleEntry: true,
        semesterEntry: true,
        submitFailure: true,
      })
    } else {
      const { review } = this.state
      const { buttonOnSubmit } = this.props
      this.setState({
        formSubmitting: true,
      })

      buttonOnSubmit(review, () => this.resetForm(), (review) => this.clearSubmitting(review))
    }
  }

  clearSubmitting = (review) => {
    this.setState({
      formSubmitting: false,
      review: {
        ...review,
        original: review
      },
    })
  }

  resetForm = () => {
    this.setState({
      moduleSearch: '',
      reviewEntry: false,
      moduleEntry: false,
      semesterEntry: false,
      submitFailure: false,
      suggestions: [],
      review: newReview,
    })
  }

  render() {
    const { buttonText } = this.props
    const { moduleSearch, reviewEntry, moduleEntry, semesterEntry, submitFailure, suggestions, formSubmitting, moduleData } = this.state
    const { review, module, semester, isAnon } = this.state.review

    const errors = this.validate();

    const inputProps = {
      placeholder: "Enter the Module Name or Code",
      value: moduleSearch,
      onChange: (event, { newValue }) => {
        this.setState({
          moduleSearch: newValue
        });
      }
    };

    const renderInputComponent = inputProps => (<div><Input invalid={errors.module} type="text" {...inputProps} />
    { errors.module ? <FormFeedback>Select the module.</FormFeedback> : ''}</div>);

    return(<Form className="m-3">
      <FormGroup>
        <Label for="name"><h3>Module</h3></Label>
        {
          moduleData ?
          <ModuleCard
            module={moduleData}
            hideButtons
            hasShortDescription
          /> :
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={this.getSuggestionValue}
            renderSuggestion={this.renderSuggestion}
            inputProps={inputProps}
            renderInputComponent={renderInputComponent}
          />
        }
      </FormGroup>
      <FormGroup>
        <Label for="type"><h3>Semester</h3></Label>
        <Input type="select" invalid={errors.semester} onChange={(event) => this.handleFormChange(event.target.value, 'semester')} value={semester}>
          <option value=''>Please Select a Semester</option>
          {
            ''
          }
        </Input>
        { errors.semester ? <FormFeedback>Please select a semester.</FormFeedback> : ''}
      </FormGroup>
      <FormGroup>
        <Label><h3>Review</h3></Label>
        <Input type="textarea" placeholder="Enter your review" value={review} onChange={(event) => this.handleFormChange(event.target.value, 'review')} style={{minHeight: '200px'}} />
        { errors.review ? <FormFeedback>Please enter youre view.</FormFeedback> : ''}
      </FormGroup>
      <FormGroup>
        <Label><h3>Anonymous</h3></Label>
        <FormGroup check>
          <Label check>
            <Input type="checkbox" onChange={(event) => this.handleFormChange(event.target.value, 'isAnon')} checked={isAnon} /> Submit Anonymously (will not display name)
          </Label>
        </FormGroup>
      </FormGroup>
      <Button color="primary" onClick={this.submitBtn} block disabled={formSubmitting}>
        { formSubmitting ? <FontAwesomeIcon icon="spinner" spin /> : '' } { buttonText }
      </Button>
      <br/>
      { submitFailure ? <Alert color="danger">One or more inputs are invalid. Please check and try again.</Alert> : ''}
    </Form>)
  }
}

export default withRouter(EventForm)
