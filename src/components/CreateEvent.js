import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import {
  Container, Row, Col, Button,
  Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import moment from 'moment'
import EventForm from './EventForm'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import Calendar from './Calendar'
import DaySpaceCalendar from './DaySpaceCalendar'
import { createEvent, getEvents, getEventsByMonth } from '../utils/actions'
import { formatEventsByDateTimeAndVenue, formatMonthEvents } from '../utils/utils'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { withRouter } from 'react-router-dom'

class CreateEvent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
      selectedDate: moment().startOf('day'),
      modal: false
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

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  successModal = () => {
    const { modal } = this.state
    const { history } = this.props

    return(<Modal isOpen={modal} toggle={this.toggle}>
      <ModalBody>
        <h3 style={{fontWeight: 300}}>Event Created!</h3>
        <p>Your event has been successfully created!</p>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={() => history.push('/dashboard')}>Dashboard</Button>{' '}
        <Button color="secondary" onClick={() => {
          this.toggle()
        }}>Dismiss</Button>
      </ModalFooter>
    </Modal>)
  }

  loadMonth(month) {
    const { firestore } = this.context.store
    getEventsByMonth(firestore, () => {}, month.clone())
  }

  createEvent = (event, callback) => {
    const { auth, firebase, spacesUnordered } = this.props
    const { firestore } = this.context.store

    createEvent(firestore, firebase, event, auth.uid, spacesUnordered, () => {
      this.toggle()
      callback()
    })
  }

  render() {
    const { selectedDate } = this.state
    const { auth, history, events, eventTypes, spaces, eventTypesUnordered, spacesUnordered, eventsUnordered, firebase } = this.props


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
            {
              isLoaded(eventTypes) && isLoaded(spaces) ?
              <EventForm
                eventTypes={eventTypes}
                spaces={spaces}
                buttonText='Create Event'
                buttonOnSubmit={(event, callback) => this.createEvent(event, callback)} />
              : <h4><FontAwesomeIcon icon="spinner" spin /> Please wait...</h4>
            }
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
              eventTypes={ eventTypesUnordered }
              eventsUnordered={ eventsUnordered }
              firebase={ firebase }
            />
            </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    events: formatEventsByDateTimeAndVenue(state.firestore),
    eventsUnordered: formatMonthEvents(state.firestore),
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
