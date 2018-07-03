import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import {
  Alert, Container,
  Row,
  Col,
  Button,
  Jumbotron,
  Form, FormGroup, Label, Input, FormText, FormFeedback,
  Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import moment from 'moment'
import DatePicker from 'react-datepicker'
import _ from 'lodash'
import DatePickerForm from './reusable/DatePickerForm'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import Calendar from './Calendar'
import DaySpaceCalendar from './DaySpaceCalendar'
import { createEvent, getEvents, getEventsByMonth } from '../utils/actions'
import { roundTime, isToday, formatEventsByDateTimeAndVenue } from '../utils/utils'
import { withRouter } from 'react-router-dom'
import { config } from '../resources/config'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

const otherVenueValue = "Other"

const newEvent = {
  name: '',
  type: '',
  tentative: false,
  spaceOnly: false,
  venue: '',
  otherVenueSelected: false,
  otherVenue: '',
  multiDay: false,
  fullDay: false,
  startDate: roundTime(moment(), config.timeInterval),
  endDate: roundTime(moment(), config.timeInterval).clone().add(config.timeInterval, "minutes"),
  poster: '',
  desc: '',
  regLink: ''
}

class CreateEvent extends Component {
  constructor(props) {
    super(props);

    this.handleFormChange = this.handleFormChange.bind(this)
    this.toggle = this.toggle.bind(this)

    this.state = {
      events: [],
      selectedDate: moment().startOf('day'),
      modal: false,
      nameEntry: false,
      typeEntry: false,
      venueEntry: false,
      otherVenueEntry: false,
      submitFailure: false,
      event: newEvent,
    }
  }

  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  componentWillMount() {
    const { firestore } = this.context.store
    getEvents(firestore, () => {}, moment())
  }

  changeSelectedDate = (date) => {
    this.setState({
      ...this.state,
      selectedDate: date
    })
  }

  loadMonth(month) {
    const { firestore } = this.context.store
    getEventsByMonth(firestore, () => {}, month.clone())
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  successModal = () =>
    <Modal isOpen={this.state.modal} toggle={this.toggle}>
      <ModalHeader toggle={this.toggle}>Event Created!</ModalHeader>
      <ModalBody>
        Your event has been successfully created!
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={() => this.props.history.push('/dashboard')}>Back to Dashboard</Button>{' '}
        <Button color="secondary" onClick={this.toggle}>Back to Create Event</Button>
      </ModalFooter>
    </Modal>

  handleFormChange = (value, type) => {
    const { event } = this.state
    const { multiDay, fullDay, startDate, endDate, tentative, spaceOnly } = event

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
        this.setState({
          typeEntry: true,
          event: {
            ...event,
            type: value
          }
        })
        break
      case 'tentative':
        this.setState({
          event: {
            ...event,
            tentative: !tentative
          }
        })
        break
      case 'spaceOnly':
        this.setState({
          event: {
            ...event,
            spaceOnly: !spaceOnly
          }
        })
        break
      case 'venue':
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
      case 'desc':
        this.setState({
          event: {
            ...event,
            desc: value
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

  validate = (clearEntryChecks) => {
    const { event, nameEntry, typeEntry, venueEntry, otherVenueEntry } = this.state
    const { name, type, venue, otherVenue } = event
    const showOtherVenue = venue === "Others"

    return {
      name: (nameEntry || clearEntryChecks) ? !name : false,
      type: (typeEntry || clearEntryChecks) ? type === '' : false,
      venue: (venueEntry || clearEntryChecks) ? venue === '' : false,
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
      const { auth, spacesUnordered } = this.props
      const { firestore } = this.context.store

      createEvent(firestore, event, auth.uid, spacesUnordered, () => {
          this.setState({
            nameEntry: false,
            typeEntry: false,
            venueEntry: false,
            otherVenueEntry: false,
            submitFailure: false,
            event: newEvent,
           })
        }
      )

      this.toggle()
    }
  }

  render() {
    const { selectedDate, event, submitFailure } = this.state
    const { startDate, endDate, name, multiDay, venue, type, fullDay, tentative, spaceOnly, desc, regLink } = event
    const { auth, history, events, eventTypes, spaces, eventTypesUnordered, spacesUnordered } = this.props

    const errors = this.validate();
    const begSDate = startDate.clone().startOf('day')
    const endSDate = startDate.clone().endOf('day')
    const begEDate = endDate.clone().startOf('day')
    const endEDate = endDate.clone().endOf('day')

    if(isLoaded(auth) && isEmpty(auth)) {
      history.push('/')
    }

    return (
      <Container>
        { this.successModal() }
        <Row>
          <Col>
            <div className="d-flex">
              <div className="p-2"><h1 className="display-3">Create Event</h1></div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs="12" lg="8">
            <Form className="m-3">
              <FormGroup>
                <Label for="name"><h3>Name</h3></Label>
                <Input type="text" value={ name } placeholder="Event Name" invalid={errors.name} onChange={(event) => this.handleFormChange(event.target.value, 'name')} />
                { errors.name ? <FormFeedback>Name cannot be empty.</FormFeedback> : ''}
              </FormGroup>
              <FormGroup>
                <Label for="type"><h3>Type</h3></Label>
                { !isLoaded(eventTypes) ? <FontAwesomeIcon icon="spinner" spin /> : ''}
                <Input type="select" invalid={errors.type} disabled={!isLoaded(eventTypes)} name="select" id="type" onChange={(event) => this.handleFormChange(event.target.value, 'type')} value={type}>
                  <option value=''>Please Select a Type</option>
                  {
                    isLoaded(eventTypes) ? eventTypes.map((type) => <option key={ type.id } value={ type.id }>{ type.name }</option>) : ''
                  }
                </Input>
                { errors.type ? <FormFeedback>Please select an event type.</FormFeedback> : ''}
                <FormGroup check inline>
                  <Label check>
                    <Input type="checkbox" id="tentative" onChange={(event) => this.handleFormChange(event.target.value, 'tentative')} value={tentative} /> Tentative
                  </Label>
                </FormGroup>
                <FormGroup check inline>
                  <Label check>
                     <Input type="checkbox" id="spaceonly" onChange={(event) => this.handleFormChange(event.target.value, 'spaceOnly')} value={spaceOnly} /> Space Booking Only
                  </Label>
                </FormGroup>
              </FormGroup>
              <FormGroup>
                <Label for="name"><h3>Venue</h3></Label>
                { !isLoaded(spaces) ? <FontAwesomeIcon icon="spinner" spin /> : ''}
                <Input type="select" name="select" id="venue" disabled={!isLoaded(spaces)} invalid={errors.venue} onChange={(event) => this.handleFormChange(event.target.value, 'venue')} value={venue}>
                  <option value=''>Please Select a Venue</option>
                  {
                    isLoaded(spaces) ? spaces.map((space) => <option key={ space.id } value={ space.id }>{ space.name }</option>) : ''
                  }
                  <option value={otherVenueValue}>Others</option>
                </Input>
                { errors.venue ? <FormFeedback>Please select a venue.</FormFeedback> : ''}
                { event.otherVenueSelected ? <Input type="text" name="othervenue" id="othervenue" placeholder="Venue Name (e.g. Dining Hall/Lobby)" invalid={errors.otherVenue} onChange={(event) => this.handleFormChange(event.target.value, 'otherVenue')} /> : '' }
                { event.otherVenueSelected && errors.otherVenue ? <FormFeedback>Venue cannot be empty.</FormFeedback> : '' }
              </FormGroup>
              <FormGroup>
                <Label for="datetime"><h3 className="mb-0">Date & Time</h3></Label>
                <br/>
                <FormGroup check inline>
                  <Label check>
                    <Input type="checkbox" id="multiDay" disabled={event.fullDay} onChange={(event) => this.handleFormChange(event.target.value, 'multiDay')} value={multiDay}  /> Multiple Days
                  </Label>
                </FormGroup>
                <FormGroup check inline>
                  <Label check>
                    <Input type="checkbox" id="fullDay" disabled={event.multiDay} onChange={(event) => this.handleFormChange(event.target.value, 'fullDay')} value={fullDay}  /> Full Day
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
                <Label for="name"><h3>Poster (Optional)</h3></Label>
                <Input type="file" name="file" id="exampleFile" />
                <FormText color="muted">
                  Upload a poster to be displayed on the Digital Signage.
                </FormText>
              </FormGroup>
              <FormGroup>
                <Label for="name"><h3>Description (Optional)</h3></Label>
                <Input type="textarea" name="description" id="description" placeholder="Enter a description (optional)" value={desc} onChange={(event) => this.handleFormChange(event.target.value, 'desc')} />
              </FormGroup>
              <FormGroup>
                <Label for="name"><h3>Registration Link (Optional)</h3></Label>
                <Input type="text" name="registration" id="registration" placeholder="Paste your registration link here (optional)" value={regLink} onChange={(event) => this.handleFormChange(event.target.value, 'regLink')} />
              </FormGroup>
              <Button color="primary" onClick={this.createEvent} block disabled={!window.gapi.client}>
                { !window.gapi.client ? <FontAwesomeIcon icon="spinner" spin /> : '' } Create Event
              </Button>
              <br/>
              { submitFailure ? <Alert color="danger">One or more inputs are invalid. Please check and try again.</Alert> : ''}
            </Form>
          </Col>
          <Col className="my-2 d-none d-lg-block" md="4">
            <Calendar
              onDayClick={(date) => this.changeSelectedDate(date)}
              selectedDate={ selectedDate }
              events={ events }
              eventTypes={ eventTypesUnordered }
              spaces={ spacesUnordered }
              bySpaces={ true }
              loadMonth={ this.loadMonth.bind(this) }/>
            <hr className="my-2 d-block d-lg-none" />
            <DaySpaceCalendar
              selectedDate={ selectedDate }
              timeslots={ events && events[selectedDate.toString()] ? events[selectedDate.toString()] : null }
              spaces={ spacesUnordered }
              isLoaded={ isLoaded(spacesUnordered) }
            />
            </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  console.log(state.firestore)
  return {
    events: formatEventsByDateTimeAndVenue(state.firestore),
    eventTypes: state.firestore.ordered.eventTypes,
    eventTypesUnordered: state.firestore.data.eventTypes,
    spaces: state.firestore.ordered.spaces,
    spacesUnordered: state.firestore.data.spaces,
    auth: state.firebase.auth,
    firestore: state.firestore,
    googleToken: state.googleToken,
  }
}

export default withRouter(compose(
  firebaseConnect(),
  connect(mapStateToProps)
)(CreateEvent))
