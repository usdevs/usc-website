import React, { Component } from 'react'
import {
  Alert, Container, Row, Col, Button,
  Form, FormGroup, Label, Input, FormFeedback
} from 'reactstrap';
import { config } from '../resources/config'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import _ from 'lodash'
import DatePickerForm from './reusable/DatePickerForm'
import ImageUploader from './reusable/ImageUploader'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { roundTime, isToday } from '../utils/utils'
import Dropzone from 'react-dropzone'
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

    const { event, firebase } = props

    var initialEvent = newEvent

    if(event) {
      const { venue, otherVenueSelected, poster } = event
      initialEvent = {
        ...event,
        original: event,
      }

      if(otherVenueSelected) {
        initialEvent = {
          ...event,
          venue: otherVenueValue,
          otherVenue: venue,
        }
      }

      if(poster) {
        this.loadPoster(firebase, poster)
      }
    }

    this.state = {
      nameEntry: false,
      typeEntry: false,
      venueEntry: false,
      otherVenueEntry: false,
      submitFailure: false,
      event: initialEvent,
    }
  }

  loadPoster = (firebase, poster) => {
    firebase.storage().ref(poster).getDownloadURL().then((url) => {
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
        this.setState({
          typeEntry: true,
          event: {
            ...event,
            type: value
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
      case 'poster':
        if(value) {
          this.setState({
            poster: value.preview,
            event: {
              ...event,
              poster: value
            }
          })
        } else {
          this.setState({
            poster: value,
            event: {
              ...event,
              poster: value
            }
          })
        }

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
      nameEntry: false,
      typeEntry: false,
      venueEntry: false,
      otherVenueEntry: false,
      submitFailure: false,
      formSubmitting: false,
      event: newEvent,
    })
  }

  render() {
    const { event, submitFailure, formSubmitting } = this.state
    const { startDate, endDate, name, multiDay, venue, type, fullDay, internal, spaceOnly, description, regLink } = event
    const { eventTypes, spaces, buttonText } = this.props

    const errors = this.validate();
    const begSDate = startDate.clone().startOf('day')
    const endSDate = startDate.clone().endOf('day')
    const begEDate = endDate.clone().startOf('day')
    const endEDate = endDate.clone().endOf('day')

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
            <Input type="checkbox" id="tentative" onChange={(event) => this.handleFormChange(event.target.value, 'internal')} checked={internal} /> Internal (Not on GCal)
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
        <Input type="select" name="select" id="venue" invalid={errors.venue} onChange={(event) => this.handleFormChange(event.target.value, 'venue')} value={venue}>
          <option value=''>Please Select a Venue</option>
          {
            spaces.map((space) => <option key={ space.id } value={ space.id }>{ space.name }</option>)
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
