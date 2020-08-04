import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import { Alert, Button, Badge } from 'reactstrap'
import { Form } from 'informed'
import {
  TextInput,
  DropdownInput,
  DatePickerInput,
  CheckboxInput,
  GroupInput,
  ImageInput,
  TextAreaInput,
  validateNotEmpty,
  validateNotEmptyNotCtph
} from '../reusable/FormInputs'
import { config } from '../../resources/config'
import moment from 'moment'
import _ from 'lodash'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import {
  roundTime,
  formatFirestoreData,
  eventTimesToMoment
} from '../../utils/utils'
import {
  getEventVenueBookingsAfter,
  getEventTypes,
  getSpaces,
  getZones
} from '../../actions/EventsActions'
import {
  getMyProfile
} from '../../actions/UsersActions'
import LinkModal from '../reusable/LinkModal'

class EventForm extends Component {
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

  componentDidMount() {
    const { firestore } = this.context.store
    const { eventTypes, spaces, zones, myProfile } = this.props

    if (!eventTypes.isLoaded) {
      getEventTypes(firestore)
    }

    if (!spaces.isLoaded) {
      getSpaces(firestore)
    }

    if (!zones.isLoaded) {
      getZones(firestore)
    }
  }

  eventTypeOptions = eventTypes => {
    var options = []

    if (eventTypes.isLoaded) {
      _.forEach(eventTypes.ordered, type => {
        options.push({
          id: type.id,
          display: type.name
        })
      })
    }

    return options
  }

  venueOptions = spaces => {
    var options = []

    if (spaces.isLoaded) {
      _.forEach(spaces.ordered, space => {
        if (space.name !== 'CTPH-Old' && space.name !== 'CTPH') {
          options.push({
            id: space.id,
            display: space.name
          })
        }
      })
    }

    return options
  }

  zoneOptions = zones => {
    var options = []

    if (zones.isLoaded) {
      _.forEach(zones.ordered, zone => {
        options.push({
          id: zone.id,
          display: zone.name
        })
      })
    }

    return options
  }

  validateDayFields = (formApi, value) => {
    const maxNoOfHours = 2

    if (formApi.getValue('startDate') && formApi.getValue('fullDay')) {
      return null
    }

    if (!formApi.getValue('startDate') || !formApi.getValue('endDate')) {
      return "Please indicate the Date and Time"
    }

    const startNotBeforeEnd = !moment(formApi.getValue('startDate')).isBefore(
      moment(formApi.getValue('endDate'))
    )

    if (startNotBeforeEnd) {
      return "Check that the Start Date must be before End Date"
    }

    const endBefore = moment(formApi.getValue('startDate')).add(maxNoOfHours, 'hours')

    if (moment(formApi.getValue('endDate')) > endBefore) {
      return "Max booking duration of " + maxNoOfHours +" hours."
    }

    return null
  }

  validateInternal = (formApi, value) => {
    if (formApi.getValue('spaceOnly')) {
      formApi.setValue('internal', true)
    }

    return null
  }

  validateOtherVenue = (formApi, value) => {
    if (formApi.getValue('venue') === 'Others') {
      return validateNotEmptyNotCtph(value)
    } else {
      return null
    }
  }

  validateOtherZone = (formApi, value) => {
    if (formApi.getValue('zone') === 'Others') {
      return validateNotEmpty(value)
    } else {
      return null
    }
  }

  internalShouldDisable = formApi => {
    return formApi.getValue('spaceOnly')
  }

  submit = values => {
    const { auth, spaces, zones, initialValues } = this.props
    const { firestore } = this.context.store

    this.setState({
      submitting: true
    })

    const normalVenue = values.venue !== 'Others'
    const normalZone = values.zone !== 'Others'
    const startDate = moment(values.startDate)
    const endDate = !values.fullDay
      ? moment(values.endDate)
      : moment(values.startDate)
          .add(1, 'day')
          .add(-30, 'minutes')

    var formattedEvent = {
      ...values,
      startDate: startDate.second(0),
      endDate: endDate.second(0),
      creator: auth.uid,
      venueName: normalVenue
        ? spaces.data[values.venue].name
        : values.otherVenue,
      venue: normalVenue ? values.venue : values.otherVenue,
      zone: normalZone ? values.zone : values.otherZone,
      zoneName: normalZone ? zones.data[values.zone].name : values.otherZone,
      otherZone: normalZone ? false : true,
      otherVenue: normalVenue ? false : true
    }

    getEventVenueBookingsAfter(
      firestore,
      formattedEvent.venue,
      startDate,
      'venueBookings',
      snapshot => {
        const { venueBookings } = this.props

        var clashes = false

        _.forEach(venueBookings, bookingTemp => {
          const booking = eventTimesToMoment(bookingTemp)
          clashes =
            startDate.isBetween(booking.startDate, booking.endDate) ||
            endDate.isBetween(booking.startDate, booking.endDate) ||
            booking.startDate.isBetween(startDate, endDate) ||
            booking.endDate.isBetween(startDate, endDate)

          if (
            initialValues &&
            initialValues.id &&
            booking.id === initialValues.id
          ) {
            clashes = false
          }

          if (clashes) {
            return false
          }
        })

        if (clashes) {
          this.formApi.setError(
            'venue',
            'Venue is already booked during that period'
          )

          this.setState({
            submitting: false
          })
        } else {
          this.props.submit(formattedEvent, this.submitCallback)
        }
      }
    )
  }

  submitCallback = reset => {
    if (reset) {
      this.formApi.reset()
    }

    this.modal.toggle()

    this.setState({
      submitting: false
    })
  }

  render() {
    const { submitting } = this.state
    const { eventTypes, spaces, zones, btnText, modal, initialValues, myProfile } = this.props

    return (
      <div>
        <Form
          initialValues={initialValues}
          getApi={api => {
            this.formApi = api
          }}
          onSubmit={values => this.submit(values)}
        >
          {({ formApi }) => (
            <div>
              <h3>Name</h3>
              <TextInput
                field="name"
                placeholder="Enter the event name"
                errortext="Please enter a name"
                validate={validateNotEmpty}
                validateOnBlur
                className="mb-3"
              />
              <h3>Type</h3>
              <DropdownInput
                field="type"
                placeholder="Select a Type"
                errortext="Please select a type"
                validate={validateNotEmpty}
                notify={['internal']}
                disabled={!eventTypes.isLoaded}
                loading={!eventTypes.isLoaded}
                validateOnChange
                options={this.eventTypeOptions(eventTypes)}
              />
              <div className="mb-3">
                <CheckboxInput
                  field="internal"
                  text="Internal (Not on Google Calendar)"
                  disabled={this.internalShouldDisable(formApi)}
                  validate={value => this.validateInternal(formApi, value)}
                />
                <CheckboxInput
                  field="spaceOnly"
                  notify={['internal']}
                  text="Venue Booking Only"
                  validateOnChange
                />
              </div>
              <h3>Venue</h3>
              <div className="mb-3">
                <DropdownInput
                  field="venue"
                  placeholder="Select a Venue"
                  others="true"
                  validate={validateNotEmpty}
                  validateOnChange
                  notify={['otherVenue']}
                  disabled={!spaces.isLoaded}
                  loading={!spaces.isLoaded}
                  options={this.venueOptions(spaces)}
                />
                <div
                  className="mt-2"
                  hidden={formApi.getValue('venue') !== 'Others'}
                >
                  <TextInput
                    field="otherVenue"
                    hidden={formApi.getValue('venue') !== 'Others'}
                    placeholder="Enter the venue name"
                    validate={value => this.validateOtherVenue(formApi, value)}
                    validateOnBlur
                    className="mb-3"
                  />
                </div>
              </div>
              <h3>Zone</h3>
              <div className="mb-3">
                <DropdownInput
                  field="zone"
                  placeholder="Select a Zone"
                  others="true"
                  validate={validateNotEmpty}
                  validateOnChange
                  notify={['otherZone']}
                  disabled={!zones.isLoaded}
                  loading={!zones.isLoaded}
                  options={this.zoneOptions(zones)}
                />
                <div
                  className="mt-2"
                  hidden={formApi.getValue('zone') !== 'Others'}
                >
                  <TextInput
                    field="otherZone"
                    hidden={formApi.getValue('zone') !== 'Others'}
                    placeholder="Enter the zone name"
                    validate={value => this.validateOtherZone(formApi, value)}
                    validateOnBlur
                    className="mb-3"
                  />
                </div>
              </div>
              <h3 className="mb-2">Date and Time</h3>
              <div className="mb-2">
                <CheckboxInput field="fullDay" text="Full Day" />
              </div>
              <div className="d-flex flex-row mb-3">
                <div className="mr-4">
                  {!formApi.getValue('fullDay') ? (
                    <h4 className="text-primary mb-0">Start</h4>
                  ) : (
                    ''
                  )}
                  <DatePickerInput
                    field="startDate"
                    dateOnly={formApi.getValue('fullDay')}
                    showTimeSelect
                    validate={value => this.validateDayFields(formApi, value)}
                    validateOnChange
                    notify={
                      !formApi.getValue('fullDay')
                        ? ['endDate', 'venue']
                        : ['venue']
                    }
                    default={roundTime(moment(), config.timeInterval)}
                  />
                </div>
                <div>
                  {!formApi.getValue('fullDay') ? (
                    <h4 className="text-primary mb-0">End</h4>
                  ) : (
                    ''
                  )}
                  <DatePickerInput
                    field="endDate"
                    hidden={formApi.getValue('fullDay')}
                    dateOnly={formApi.getValue('fullDay')}
                    validate={value => this.validateDayFields(formApi, value)}
                    validateOnChange
                    showTimeSelect
                    notify={['startDate', 'venue']}
                    default={roundTime(moment(), config.timeInterval)
                      .clone()
                      .add(config.timeInterval, 'minutes')}
                  />
                </div>
              </div>
              <h3>Organised By</h3>
              <div className="mb-3">
                <GroupInput
                  field="organisedBy"
                  placeholder="Please enter the organising group (e.g. IG/GUI/House Name etc.)"
                  errortext="Please indicate the organising group"
                  validate={validateNotEmpty}
                  validateOnBlur
                />
              </div>
              <h3>
                Poster{' '}
                <small>
                  <Badge color="secondary">Optional</Badge>
                </small>
              </h3>
              <ImageInput field="poster" className="mb-3" />
              <h3>
                Description{' '}
                <small>
                  <Badge color="secondary">Optional</Badge>
                </small>
              </h3>
              <TextAreaInput
                field="description"
                placeholder="Enter a description (optional)"
                className="mb-3"
              />
              <h3>
                Registration Link{' '}
                <small>
                  <Badge color="secondary">Optional</Badge>
                </small>
              </h3>
              <TextInput
                field="regLink"
                placeholder="Paste your registration link here (optional)"
                className="mb-5"
              />
              <Button
                color="primary"
                type="submit"
                block
                disabled={!window.gapi.client || submitting}
              >
                {!window.gapi.client || submitting ? (
                  <FontAwesomeIcon icon="spinner" spin />
                ) : (
                  ''
                )}{' '}
                {btnText}
              </Button>
              {formApi.getState().invalid ? (
                <Alert color="danger" className="mt-2 mb-2">
                  One or more inputs are invalid. Please check and try again.
                </Alert>
              ) : (
                ''
              )}
            </div>
          )}
        </Form>
        <LinkModal
          ref={element => {
            this.modal = element
          }}
          title={modal.title}
          body={modal.body}
          primaryBtnText={modal.primaryBtnText}
          secondaryBtnText={modal.secondaryBtnText}
          link={modal.link}
          onSubmit={modal.onSubmit}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    eventTypes: formatFirestoreData(state.firestore, 'eventTypes'),
    spaces: formatFirestoreData(state.firestore, 'spaces'),
    zones: formatFirestoreData(state.firestore, 'zones'),
    venueBookings: state.firestore.ordered.venueBookings,
    myProfile: formatFirestoreData(state.firestore, 'myProfile')
  }
}

export default compose(firebaseConnect(), connect(mapStateToProps))(EventForm)
