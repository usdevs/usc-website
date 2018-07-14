import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Container, Row, Col, Button } from 'reactstrap'
import EventForm from './EventForm'
import EventCalendar from './Calendar/EventCalendar'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { updateEvent, deleteEvent, getEvent } from '../../actions/EventsActions'
import { eventTimesToMoment } from '../../utils/utils'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { withRouter } from 'react-router-dom'

class EditEvent extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      event: null
    }
  }

  componentDidMount() {
    const { firestore } = this.context.store
    const { eventID } = this.props.match.params
    const { history, auth } = this.props

    getEvent(firestore, eventID, (snapshot) => {
      if (!snapshot.exists) {
        history.push('/events')
      } else {
        const event = eventTimesToMoment(snapshot.data())
        if(event.creator !== auth.uid) {
          history.push('/events')
        } else {
          this.setState({
            event: {
              ...event,
              venue: event.otherVenue ? "Others" : event.venue,
              otherVenue: event.otherVenue ? event.venue : '',
              id: eventID
            }
          })
        }
      }
    })
  }

  updateEvent = (event, callback) => {
    const { firebase } = this.props
    const { firestore } = this.context.store
    const originalEvent = this.state.event

    updateEvent(firestore, firebase, event, originalEvent, (event) => {
      callback(false)
    })
  }

  deleteEvent = (event, callback) => {
    const { firebase } = this.props
    const { firestore } = this.context.store

    deleteEvent(firestore, firebase, event, callback)
  }

  render() {
    const { event } = this.state
    const { history } = this.props

    return (<Container>
      <Row>
        <Col>
          <div className="d-flex">
            <h1 className="display-3">Edit Event</h1>
          </div>
        </Col>
      </Row>
      <Row>
        {
          event ?
          <Col>
            <EventForm
              submit={this.updateEvent}
              initialValues={event}
              btnText="Create Event"
              modal={{
                title: 'Event Updated!',
                body: 'Your event details have been successfully updated!',
                primaryBtnText: 'Manage Events',
                secondaryBtnText: 'Dismiss',
                link: '/manageevents'
              }}/>
            <div className="d-flex justify-content-center">
              <Button className="w-75" color="danger" block disabled={!window.gapi.client}>
                { !window.gapi.client ? <FontAwesomeIcon icon="spinner" spin /> : '' } <FontAwesomeIcon icon="trash-alt" />{' '}Delete Event
              </Button>
            </div>
            <div className="d-flex justify-content-center">
              <Button className="w-75 mt-3" color="secondary" onClick={() => history.push('/manageevents')} outline block>
                Back to Manage Events
              </Button>
            </div>
          </Col>
          : <Col><h4><FontAwesomeIcon icon="spinner" spin /> Loading...</h4></Col>
        }
      </Row>
    </Container>)
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
  }
}

export default withRouter(compose(
  firebaseConnect(),
  connect(mapStateToProps)
)(EditEvent))
