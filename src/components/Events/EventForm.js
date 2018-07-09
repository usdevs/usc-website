import React, { Component } from 'react'
import {
  Alert, Container, Row, Col, Button,
  Form, FormGroup, Label, Input, FormFeedback
} from 'reactstrap';
import { config } from '../../resources/config'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import Autosuggest from 'react-autosuggest';
import _ from 'lodash'
import DatePickerForm from '../reusable/DatePickerForm'
import ImageUploader from '../reusable/ImageUploader'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import InterestGroupCard from '../InterestGroups/InterestGroupCard'
import { roundTime, isToday, eventTimesToMoment } from '../../utils/utils'
import { getFile, getEventVenueBookingsAfter } from '../../utils/actions'
import { withRouter } from 'react-router-dom'

const otherVenueValue = "Other"

const newEvent = {
  name: '',
  type: '',
  internal: false,
  organisedBy: '',
  organiserIsGUI: false,
  spaceOnly: false,
  venue: '',
  otherVenueSelected: false,
  otherVenue: '',
  multiDay: false,
  fullDay: false,
  startDate: roundTime(moment(), config.timeInterval),
  endDate: roundTime(moment(), config.timeInterval).clone().add(config.timeInterval, "minutes"),
  poster: null,
  description: '',
  regLink: ''
}

class EventForm extends Component {
  constructor(props) {
    super(props);

    const { event, firebase, groupsUnordered } = props

    var initialEvent = newEvent

    if(event) {
      const { venue, otherVenueSelected, organisedBy, poster } = event
      initialEvent = {
        ...event,
        original: event,
      }

      if(organisedBy) {
        initialEvent = {
          ...initialEvent,
          organisedBy: {
            ...groupsUnordered[event.organisedBy],
            id: event.organisedBy
          },
        }
      }

      if(otherVenueSelected) {
        initialEvent = {
          ...initialEvent,
          venue: otherVenueValue,
          otherVenue: venue,
        }
      }

      if(poster) {
        this.loadPoster(firebase, poster)
      }
    }

    this.state = {
      organisedBy: '',
      nameEntry: false,
      typeEntry: false,
      venueEntry: false,
      otherVenueEntry: false,
      submitFailure: false,
      suggestions: [],
      event: initialEvent,
    }
  }

  getGroupSuggestions = value => {
    const { groups } = this.props
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : groups.filter(group =>
      group.name.toLowerCase().slice(0, inputLength) === inputValue
    );
  };

  getSuggestionValue = suggestion => {
    this.handleFormChange(suggestion, 'organisedBy')
    return suggestion.name
  };

  renderSuggestion = suggestion => (
    <span className="suggestion-content list-unstyled">
      <InterestGroupCard
        firebase={this.props.firebase}
        firestore={this.props.firestore}
        interestGroup={suggestion}
        igTypes={this.props.groupTypes}
        hideButtons
      />
    </span>
  );

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getGroupSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  loadPoster = (firebase, poster) => {
    getFile(firebase, poster, (url) => {
      this.setState({
        poster: url,
      })
    })
  }

  getUploader = () => {
    const { poster } = this.state

      return (
        <ImageUploader
            imageSrc={poster}
            onDrop={(file) => this.handleFormChange(file, 'poster')}
            onDelete={() => this.handleFormChange(null, 'poster')}
          />
      )
    }

  handleFormChange = (value, type) => {
    const { event } = this.state
    const { multiDay, fullDay, startDate, endDate, internal, spaceOnly } = event

    switch(type) {
      case 'name':
        this.setState({
          nameEntry: true,
          event: {
            ...event,
            name: value
          }
        })
        break
      case 'type':
        //If House, the event should be internal
        const mustBeInternal = value === 'hkhhLXls25Pqbg5tXWwL'

        this.setState({
          typeEntry: true,
          mustBeInternal: mustBeInternal,
          event: {
            ...event,
            type: value,
            internal: mustBeInternal ? true : internal
          }
        })
        break
      case 'internal':
        this.setState({
          event: {
            ...event,
            internal: !internal
          }
        })
        break
      case 'spaceOnly':
        this.setState({
          mustBeInternal: !spaceOnly,
          event: {
            ...event,
            internal: !spaceOnly,
            spaceOnly: !spaceOnly
          }
        })
        break
      case 'venue':
        this.getVenueBookings(value, null)
        this.setState({
          venueEntry: true,
          event: {
            ...event,
            venue: value,
            otherVenueSelected: value === otherVenueValue
          }
        })
        break
      case 'otherVenue':
        this.setState({
          otherVenueEntry: true,
          event: {
            ...event,
            otherVenue: value
          }
        })
        break
      case 'multiDay':
        this.setState({
          event: {
            ...event,
            multiDay: !multiDay
          }
        })
        break
      case 'fullDay':
        this.setState({
          event: {
            ...event,
            fullDay: !fullDay,
            startDate: startDate.clone().startOf('day'),
            endDate: startDate.clone().endOf('day'),
          }
        })
        break
      case 'date':
        const newStartDate = value.clone().hour(startDate.hour()).minute(startDate.minute())
        const newEndDate = newStartDate.clone().hour(endDate.hour()).minute(endDate.minute())

        this.setState({
          event: {
            ...event,
            startDate: newStartDate,
            endDate: newEndDate
          }
        })
        break
      case 'startDate':
        const newEndDate2 = value.isSameOrAfter(endDate) ? value.clone().add(config.timeInterval, "minutes") : endDate
        this.getVenueBookings(null, value)
        this.setState({
          event: {
            ...event,
            startDate: value,
            endDate: newEndDate2
          }
        })
        break
      case 'endDate':
        const tempDate = !multiDay ? startDate.clone().hour(value.hour()).minute(value.minute()) : value

        this.setState({
          event: {
            ...event,
            endDate: tempDate.isSameOrBefore(startDate) ? startDate.clone().add(config.timeInterval, "minutes") : tempDate,
          }
        })
        break
      case 'organisedBy':
        this.setState({
          organisedBy: value ? value.name : '',
          event: {
            ...event,
            organisedBy: value
          }
        })
        break
      case 'poster':
        this.setState({
          poster: value ? value.preview : value,
          event: {
            ...event,
            poster: value
          }
        })
        break
      case 'description':
        this.setState({
          event: {
            ...event,
            description: value
          }
        })
        break
      case 'regLink':
        this.setState({
          event: {
            ...event,
            regLink: value
          }
        })
        break
      default: break
    }
  }

  getVenueBookings = (newVenueID, newStartDate) => {
    const { firestore } = this.props
    var { venue, startDate } = this.state.event

    if(newVenueID) {
      venue = newVenueID
    }

    if(newStartDate) {
      startDate = newStartDate
    }

    getEventVenueBookingsAfter(firestore, venue, startDate, 'venueBookings')
  }

  checkVenueClashes = () => {
    const { venueBookings } = this.props
    const { startDate, endDate } = this.state.event

    if (!startDate || !endDate || !venueBookings) {
      return false
    }

    var clashes = false

    _.forEach(venueBookings, (bookingTemp) => {
      const booking = eventTimesToMoment(bookingTemp)
      clashes = startDate.isBetween(booking.startDate, booking.endDate)
                  || endDate.isBetween(booking.startDate, booking.endDate)
                  || booking.startDate.isBetween(startDate, endDate)
                  || booking.endDate.isBetween(startDate, endDate)

      if(clashes) {
        return false
      }
    })

    return clashes
  }

  validate = (clearEntryChecks) => {
    const { event, nameEntry, typeEntry, venueEntry, otherVenueEntry } = this.state
    const { name, type, venue, otherVenue } = event
    const showOtherVenue = venue === "Others"

    return {
      name: (nameEntry || clearEntryChecks) ? !name : false,
      type: (typeEntry || clearEntryChecks) ? type === '' : false,
      venue: (venueEntry || clearEntryChecks) ? venue === '' : false,
      venueClashes: this.checkVenueClashes(),
      otherVenue: showOtherVenue ? (otherVenueEntry || clearEntryChecks) ? !otherVenue : false : false,
    }
  }

  createEvent = () => {
    const errors = this.validate(true)
    const noErrors = _.every(_.values(errors), function(v) {return !v;});

    if(!noErrors) {
      this.setState({
        nameEntry: true,
        typeEntry: true,
        venueEntry: true,
        otherVenueEntry: true,
        submitFailure: true,
      })
    } else {
      const { event } = this.state
      const { buttonOnSubmit } = this.props
      this.setState({
        formSubmitting: true,
      })

      buttonOnSubmit(event, () => this.resetForm(), (event) => this.clearSubmitting(event))
    }
  }

  clearSubmitting = (event) => {
    const { firebase } = this.props

    this.setState({
      formSubmitting: false,
      event: {
        ...event,
        original: event
      },
    })

    if(event.poster) {
      this.loadPoster(firebase, event.poster)
    }
  }

  resetForm = () => {
    this.setState({
      organisedBy: '',
      nameEntry: false,
      typeEntry: false,
      venueEntry: false,
      otherVenueEntry: false,
      submitFailure: false,
      formSubmitting: false,
      poster: null,
      suggestions: [],
      event: newEvent,
    })
  }

  render() {
    const { event, submitFailure, formSubmitting, organisedBy, suggestions, mustBeInternal } = this.state
    const { startDate, endDate, name, multiDay, venue, type, fullDay, internal, spaceOnly, description, regLink } = event
    const { eventTypes, spaces, buttonText, firebase, firestore, groupTypes } = this.props

    const errors = this.validate();
    const begSDate = startDate.clone().startOf('day')
    const endSDate = startDate.clone().endOf('day')
    const begEDate = endDate.clone().startOf('day')
    const endEDate = endDate.clone().endOf('day')

    console.log(errors)

    const inputProps = {
      placeholder: "Enter an IG or GUI Name",
      value: organisedBy,
      onChange: (event, { newValue }) => {
        this.setState({
          organisedBy: newValue
        });
      }
    };

    const renderInputComponent = inputProps => (<Input type="text" {...inputProps} />);

    return(<Form className="m-3">
      <FormGroup>
        <Label for="name"><h3>Name</h3></Label>
        <Input type="text" value={ name } placeholder="Event Name" invalid={errors.name} onChange={(event) => this.handleFormChange(event.target.value, 'name')} />
        { errors.name ? <FormFeedback>Name cannot be empty.</FormFeedback> : ''}
      </FormGroup>
      <FormGroup>
        <Label for="type"><h3>Type</h3></Label>
        <Input type="select" invalid={errors.type} name="select" id="type" onChange={(event) => this.handleFormChange(event.target.value, 'type')} value={type}>
          <option value=''>Please Select a Type</option>
          {
            eventTypes.map((type) => <option key={ type.id } value={ type.id }>{ type.name }</option>)
          }
        </Input>
        { errors.type ? <FormFeedback>Please select an event type.</FormFeedback> : ''}
        <FormGroup check inline>
          <Label check>
            <Input type="checkbox" id="tentative" disabled={mustBeInternal} onChange={(event) => this.handleFormChange(event.target.value, 'internal')} checked={internal} /> Internal (Not on GCal)
          </Label>
        </FormGroup>
        <FormGroup check inline>
          <Label check>
             <Input type="checkbox" id="spaceonly" onChange={(event) => this.handleFormChange(event.target.value, 'spaceOnly')} checked={spaceOnly} /> Space Booking Only
          </Label>
        </FormGroup>
      </FormGroup>
      <FormGroup>
        <Label for="name"><h3>Venue</h3></Label>
        <Input type="select" name="select" id="venue" invalid={errors.venue || errors.venueClashes} onChange={(event) => this.handleFormChange(event.target.value, 'venue')} value={venue}>
          <option value=''>Please Select a Venue</option>
          {
            spaces.map((space) => <option key={ space.id } value={ space.id }>{ space.name }</option>)
          }
          <option value={otherVenueValue}>Others</option>
        </Input>
        { errors.venue ? <FormFeedback>Please select a venue.</FormFeedback> : ''}
        { errors.venueClashes ? <FormFeedback>Venue is already booked at that period, choose another venue.</FormFeedback> : ''}
        { event.otherVenueSelected ? <Input type="text" name="othervenue" id="othervenue" placeholder="Venue Name (e.g. Dining Hall/Lobby)" invalid={errors.otherVenue} onChange={(event) => this.handleFormChange(event.target.value, 'otherVenue')} /> : '' }
        { event.otherVenueSelected && errors.otherVenue ? <FormFeedback>Venue cannot be empty.</FormFeedback> : '' }
      </FormGroup>
      <FormGroup>
        <Label for="datetime"><h3 className="mb-0">Date & Time</h3></Label>
        <br/>
        <FormGroup check inline>
          <Label check>
            <Input type="checkbox" id="multiDay" disabled={event.fullDay} onChange={(event) => this.handleFormChange(event.target.value, 'multiDay')} checked={multiDay}  /> Multiple Days
          </Label>
        </FormGroup>
        <FormGroup check inline>
          <Label check>
            <Input type="checkbox" id="fullDay" disabled={event.multiDay} onChange={(event) => this.handleFormChange(event.target.value, 'fullDay')} checked={fullDay}  /> Full Day
          </Label>
        </FormGroup>
        <Container>
          {
            !multiDay ?
            <Row>
              <Col>
                <br/>
                <DatePicker
                  name="dateOnly"
                  id="dateOnly"
                  selected={startDate}
                  customInput={<DatePickerForm dateOnly />}
                  dateFormat="LLL"
                  minDate={moment()}
                  maxDate={moment().add(6, "months")}
                  onChange={(date) => this.handleFormChange(date, 'date')} />
              </Col>
            </Row> : ''
          }
          {
            !fullDay ?
            <Row>
              <Col xs="12" md="6">
                <Label for="startdatetime"><h5 className="mb-0">Start</h5></Label>
                <DatePicker
                  showTimeSelect
                  showTimeSelectOnly={!multiDay}
                  name="startdatetime"
                  id="startdatetime"
                  selected={startDate}
                  customInput={<DatePickerForm timeOnly={!multiDay} />}
                  timeFormat="HH:mm"
                  timeInterval={config.timeInterval}
                  dateFormat="LLL"
                  timeCaption="time"
                  minDate={moment()}
                  maxDate={moment().add(6, "months")}
                  minTime={ !multiDay ? isToday(startDate) ? moment() : begSDate : begSDate}
                  maxTime={ endSDate }
                  onChange={(date) => this.handleFormChange(date, 'startDate')} />
              </Col>
              <Col xs="12" md="6">
                <Label for="enddatetime"><h5 className="mb-0">End</h5></Label>
                <DatePicker
                  showTimeSelect
                  showTimeSelectOnly={!multiDay}
                  name="enddatetime"
                  id="enddatetime"
                  selected={endDate}
                  customInput={<DatePickerForm timeOnly={!multiDay} />}
                  timeFormat="HH:mm"
                  timeInterval={config.timeInterval}
                  dateFormat="LLL"
                  timeCaption="time"
                  minDate={moment()}
                  maxDate={moment().add(6, "months")}
                  minTime={ !multiDay ? startDate.clone().add(config.timeInterval, "minutes") : begEDate}
                  maxTime={ !multiDay ? startDate.clone().endOf('day') : endEDate}
                  onChange={(date) => this.handleFormChange(date, 'endDate')} />
              </Col>
            </Row> : ''
          }
        </Container>
      </FormGroup>
      <FormGroup>
        <Label for="name"><h3>Organised By (Optional)</h3></Label>
        {
          groupTypes ?
            event.organisedBy ?
            <div>
              <InterestGroupCard
                firebase={firebase}
                firestore={firestore}
                interestGroup={event.organisedBy}
                igTypes={groupTypes}
                hideButtons
              />
              <Button color="danger" className="mt-2" outline onClick={() => this.handleFormChange(null, 'organisedBy')}>
                <FontAwesomeIcon icon="trash-alt" />
              </Button>
            </div>
            : <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              getSuggestionValue={this.getSuggestionValue}
              renderSuggestion={this.renderSuggestion}
              inputProps={inputProps}
              renderInputComponent={renderInputComponent}
            />
          : <h4 style={{fontWeight: 300}}><FontAwesomeIcon icon="spinner" spin /> Loading Groups...</h4>
        }
      </FormGroup>
      <FormGroup>
        <Label for="name"><h3>Poster (Optional)</h3></Label>
        { this.getUploader() }
      </FormGroup>
      <FormGroup>
        <Label for="name"><h3>Description (Optional)</h3></Label>
        <Input type="textarea" name="description" id="description" placeholder="Enter a description (optional)" value={description} onChange={(event) => this.handleFormChange(event.target.value, 'description')} />
      </FormGroup>
      <FormGroup>
        <Label for="name"><h3>Registration Link (Optional)</h3></Label>
        <Input type="text" name="registration" id="registration" placeholder="Paste your registration link here (optional)" value={regLink} onChange={(event) => this.handleFormChange(event.target.value, 'regLink')} />
      </FormGroup>
      <Button color="primary" onClick={this.createEvent} block disabled={!window.gapi.client || formSubmitting}>
        { !window.gapi.client || formSubmitting ? <FontAwesomeIcon icon="spinner" spin /> : '' } { buttonText }
      </Button>
      <br/>
      { submitFailure ? <Alert color="danger">One or more inputs are invalid. Please check and try again.</Alert> : ''}
    </Form>)
  }
}

export default withRouter(EventForm)