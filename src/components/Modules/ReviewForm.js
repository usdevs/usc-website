import React, { Component } from 'react'
import {
  Alert, Button,
  Form, FormGroup, Label, Input, FormFeedback
} from 'reactstrap';
import { config } from '../../resources/config'
import moment from 'moment'
import Autosuggest from 'react-autosuggest';
import _ from 'lodash'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import ModuleCard from './ModuleCard'
import { withRouter } from 'react-router-dom'

const newReview = {
  review: '',
  module: '',
  isAnon: false,
  semester: ''
}

class EventForm extends Component {
  constructor(props) {
    super(props);

    var initialReview = newReview

    if(props.review) {
      initialReview = props.review
    }

    var initialModule = null

    if(props.module) {
      initialModule = props.module
    }

    this.state = {
      moduleSearch: '',
      reviewEntry: false,
      moduleEntry: false,
      semesterEntry: false,
      submitFailure: false,
      suggestions: [],
      moduleData: initialModule,
      review: initialReview,
    }
  }

  getModuleSuggestions = value => {
    const { modules } = this.props
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength >= 3 ? modules.filter(module =>
      module.name.toLowerCase().startsWith(inputValue)  ||
      module.code.toLowerCase().startsWith(inputValue)
    ) : []
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
      formSubmitting: false,
      review: newReview,
    })
  }

  displaySemesterOptions = () => {
    var semesterOptions = []

    const startDate = moment().add(config.reviewStartYear, 'year')

    for(var i = 0; i <= -config.reviewStartYear; i++) {
      const firstYear = startDate.clone().add(i, 'year').format('YY')
      const secondYear = startDate.clone().add(i + 1, 'year').format('YY')
      const semString1 = 'AY'+firstYear+'/'+secondYear+' Sem 1'
      const semString2 = 'AY'+firstYear+'/'+secondYear+' Sem 2'
      semesterOptions.push(<option value={semString1} key={semString1}>{semString1}</option>)
      semesterOptions.push(<option value={semString2} key={semString2}>{semString2}</option>)
    }

    return semesterOptions
  }

  render() {
    const { buttonText } = this.props
    const { moduleSearch, submitFailure, suggestions, formSubmitting, moduleData } = this.state
    const { review, semester, isAnon } = this.state.review

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
            this.displaySemesterOptions()
          }
        </Input>
        { errors.semester ? <FormFeedback>Please select a semester.</FormFeedback> : ''}
      </FormGroup>
      <FormGroup>
        <Label><h3>Review</h3></Label>
        <Input type="textarea" invalid={errors.review} placeholder="Enter your review" value={review} onChange={(event) => this.handleFormChange(event.target.value, 'review')} style={{minHeight: '200px'}} />
        { errors.review ? <FormFeedback>Please enter your review.</FormFeedback> : ''}
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
