import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {
  Alert, Container,
  Row,
  Col,
  Button,
  Jumbotron,
  Form, FormGroup, Label, Input, FormText, FormFeedback
} from 'reactstrap';
import DatePickerForm from './reusable/DatePickerForm'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import firebase from 'firebase'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { createTestEvent } from '../firestoreClient'
import { getGoogleCalendarEvents, dayFormat } from '../resources/gcal'
import { eventTypes, spaces, timeIntervals } from '../resources/data'
import { headerEvent as header } from '../resources/images.js'
import Calendar from './Calendar'
import moment from 'moment'
import Infinite from 'react-infinite'
import DatePicker from 'react-datepicker'
import _ from 'lodash'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { setGoogleEvents } from '../actions'
import { isEmpty as objectIsEmpty, roundTime, isToday } from '../utils/utils'

class CreateEvent extends Component {
  constructor(props) {
    super(props);

    const currentTime = roundTime(moment(), timeIntervals)
    const { auth } = this.props

    this.handleFormChange = this.handleFormChange.bind(this)

    if (isLoaded(auth) && !isEmpty(auth)) {
        console.log(this.props.googleToken)
    }

    this.state = {
      events: [],
      selectedDate: moment(),
      nameEntry: false,
      otherVenueEntry: false,
      submitFailure: false,
      event: {
        name: '',
        type: 'Academic',
        tentative: false,
        spaceOnly: false,
        venue: 'Amphitheatre',
        otherVenue: '',
        multiDay: false,
        startDate: currentTime,
        endDate: currentTime.clone().add(timeIntervals, "minutes"),
      }
    }
  }

  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  componentDidMount = () => {
    if (objectIsEmpty(this.props.events)) {
      getGoogleCalendarEvents(this.props.setGoogleEvents)
    }
  }

  changeSelectedDate = (date) => {
    this.setState({
      ...this.state,
      selectedDate: date
    })
  }

  venueChanged = (event) => {
    this.setState({
      otherVenueVisible: event.target.value === "Others"
    })
  }

  handleFormChange = (value, type) => {
    const { event } = this.state
    const { multiDay, startDate, endDate } = event

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
          event: {
            ...event,
            type: value
          }
        })
        break
      case 'venue':
        this.setState({
          event: {
            ...event,
            venue: value
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
        const newEndDate2 = value.isSameOrAfter(endDate) ? value.clone().add(timeIntervals, "minutes") : endDate

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
            endDate: tempDate.isSameOrBefore(startDate) ? startDate.clone().add(timeIntervals, "minutes") : tempDate,
          }
        })
        break
      default: break
    }
  }

  validate = (clearEntryChecks) => {
    const { event, nameEntry, otherVenueEntry, submitFailure } = this.state
    const { name, venue, otherVenue, multiDay } = event
    const showOtherVenue = venue === "Others"

    return {
      name: (nameEntry || clearEntryChecks) ? !name : false,
      venue: false,
      otherVenue: showOtherVenue ? (otherVenueEntry || clearEntryChecks) ? !otherVenue : false : false,
    }
  }

  createEvent = () => {
    const errors = this.validate(true)
    const noErrors = _.every(_.values(errors), function(v) {return !v;});

    if(!noErrors) {
      this.setState({
        nameEntry: true,
        otherVenueEntry: true,
        submitFailure: true,
      })
    } else {
      const { event } = this.state
      const { firestore } = this.context.store

      createTestEvent(firebase)
      /*createEvent(firestore, event, () => {
          this.setState({
            submitFailure: false,
            savedEvent: true,
           })
        }
      )*/
    }
  }

  render() {
    const { selectedDate, event, submitFailure } = this.state
    const { startDate, endDate, name, venue, multiDay } = event
    const { events } = this.props
    const selectedDayEvents = events ? events[moment(selectedDate).format(dayFormat)] : []
    const timeInterval = timeIntervals

    const errors = this.validate();
    const begSDate = startDate.clone().startOf('day')
    const endSDate = startDate.clone().endOf('day')
    const begEDate = endDate.clone().startOf('day')
    const endEDate = endDate.clone().endOf('day')

    const showOtherVenue = venue === "Others"

    return (
      <Container>
        <Row>
          <Col>
            <div className="d-flex">
              <div className="p-2"><h1 className="display-3">Create Event</h1></div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs="12" md="8">
            <Form className="m-3">
              <FormGroup>
                <Label for="name"><h3>Name</h3></Label>
                <Input type="text" value={ name } placeholder="Event Name" invalid={errors.name} onChange={(event) => this.handleFormChange(event.target.value, 'name')} />
                { errors.name ? <FormFeedback>Name cannot be empty.</FormFeedback> : ''}
              </FormGroup>
              <FormGroup>
                <Label for="type"><h3>Type</h3></Label>
                <Input type="select" name="select" id="type" onChange={(event) => this.handleFormChange(event.target.value, 'type')}>
                  {
                    eventTypes.map((type) => <option key={ type }>{ type }</option>)
                  }
                </Input>
                <FormGroup check inline>
                  <Label check>
                    <Input type="checkbox" id="tentative" /> Tentative
                  </Label>
                </FormGroup>
                <FormGroup check inline>
                  <Label check>
                     <Input type="checkbox" id="spaceonly" /> Space Booking Only
                  </Label>
                </FormGroup>
              </FormGroup>
              <FormGroup>
                <Label for="name"><h3>Venue</h3></Label>
                <Input type="select" name="select" id="venue" onChange={(event) => this.handleFormChange(event.target.value, 'venue')}>
                  {
                    spaces.map((space) => <option key={ space.name }>{ space.name }</option>)
                  }
                  <option>Others</option>
                </Input>
                { showOtherVenue ? <Input type="text" name="othervenue" id="othervenue" placeholder="Venue Name (e.g. Dining Hall/Lobby)" invalid={errors.otherVenue} onChange={(event) => this.handleFormChange(event.target.value, 'otherVenue')} /> : '' }
                { showOtherVenue && errors.otherVenue ? <FormFeedback>Venue cannot be empty.</FormFeedback> : '' }
              </FormGroup>
              <FormGroup>
                <Label for="datetime"><h3>Date & Time</h3></Label>
                <FormGroup check>
                  <Label check>
                    <Input type="checkbox" id="multiDay" onChange={(event) => this.handleFormChange(event.target.value, 'multiDay')}  /> Multiple Days
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
                  <Row>
                    <br/>
                  </Row>
                  <Row>
                    <Col xs="12" md="6">
                      <Label for="startdatetime"><h5>Start</h5></Label>
                      <DatePicker
                        showTimeSelect
                        showTimeSelectOnly={!multiDay}
                        name="startdatetime"
                        id="startdatetime"
                        selected={startDate}
                        customInput={<DatePickerForm timeOnly={!multiDay} />}
                        timeFormat="HH:mm"
                        timeIntervals={30}
                        dateFormat="LLL"
                        timeCaption="time"
                        minDate={moment()}
                        maxDate={moment().add(6, "months")}
                        minTime={ !multiDay ? isToday(startDate) ? moment() : begSDate : begSDate}
                        maxTime={ endSDate }
                        onChange={(date) => this.handleFormChange(date, 'startDate')} />
                    </Col>
                    <Col xs="12" md="6">
                      <Label for="enddatetime"><h5>End</h5></Label>
                      <DatePicker
                        showTimeSelect
                        showTimeSelectOnly={!multiDay}
                        name="enddatetime"
                        id="enddatetime"
                        selected={endDate}
                        customInput={<DatePickerForm timeOnly={!multiDay} />}
                        timeFormat="HH:mm"
                        timeIntervals={30}
                        dateFormat="LLL"
                        timeCaption="time"
                        minDate={moment()}
                        maxDate={moment().add(6, "months")}
                        minTime={ !multiDay ? startDate.clone().add(timeInterval, "minutes") : begEDate}
                        maxTime={ !multiDay ? startDate.clone().endOf('day') : endEDate}
                        onChange={(date) => this.handleFormChange(date, 'endDate')} />
                    </Col>
                  </Row>
                </Container>
              </FormGroup>
              <FormGroup>
                <Label for="name"><h3>Poster (Optional)</h3></Label>
                <Input type="file" name="file" id="exampleFile" />
                <FormText color="muted">
                  Upload a poster to be displayed on the Digital Signage.
                </FormText>
              </FormGroup>
              <Button color="primary" onClick={this.createEvent} block disabled={!window.gapi.client}>Create Event</Button>
              <br/>
              { submitFailure ? <Alert color="danger">One or more inputs are invalid. Please check and try again.</Alert> : ''}
            </Form>
          </Col>
          <Col className="my-2 d-none d-md-block" md="4">
            <Calendar onDayClick={(date) => this.changeSelectedDate(date)} selectedDate={ selectedDate } events={ events } />
            <hr className="my-2 d-block d-lg-none" />
            <h1 className="display-4"><small>{ selectedDate.format('Do MMMM') }</small><small className="text-muted">{', ' + selectedDate.format('YYYY')}</small></h1>
            <Infinite containerHeight={400} elementHeight={40}>
                {
                  selectedDayEvents ?
                  selectedDayEvents.map((event) =>
                    <div key={event.glink}>
                      <div>
                        <h1 className="d-inline-block mb-0">{event.title + '    '}<FontAwesomeIcon className="align-middle" icon="circle" color={event.color} size="xs" /></h1>
                        <br/>
                        <small className="text-muted">{event.type}</small>
                        <p className="lead">{moment(event.start).format('hh:mm a') + (event.venue ? ' - ' + event.venue : '') }</p>
                      </div>
                    </div>
                  ) : <h4>No events on this day</h4>
                }
            </Infinite>
            </Col>
        </Row>
        <Row>
          <Col>
            <Jumbotron><h6>Copyright 2018. NUS Students' University Scholars Club</h6></Jumbotron>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    events: state.googleEventsByDay,
    auth: state.firebase.auth,
    firestore: state.firestore,
    googleToken: state.googleToken,
  }
}

export default compose(
  firebaseConnect(),
  connect(mapStateToProps, { setGoogleEvents })
)(CreateEvent)
