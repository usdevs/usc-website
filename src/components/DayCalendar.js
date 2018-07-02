import React, { Component } from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { isLoaded } from 'react-redux-firebase'
import { getEventStart } from '../utils/utils'
import { Container, Row, Col } from 'reactstrap'

class DayCalendar extends Component {
  render() {
    const { selectedDate, events, eventTypes, spaces } = this.props

    return(<div>
      <h1 style={{fontWeight: 300}}><small>{ selectedDate.format('Do MMMM') }</small><small className="text-muted">{' ' + selectedDate.format('YYYY')}</small></h1>
      <Container className="pl-0 pr-0">
        {
          isLoaded(eventTypes) && isLoaded(spaces) && eventTypes && spaces ? events ?
          events.map((event) =>
          <Row key={event.id}>
            <Col>
              <h3 className="d-inline-block mb-0">{event.name + '    '}<FontAwesomeIcon className="align-middle" icon="circle" color={eventTypes[event.type].colour} size="xs" /></h3>
              <br/>
              <small className="text-muted">{eventTypes[event.type].name}</small>
              <p className="lead">{getEventStart(event).format('hh:mm a') + ' - ' + (!event.otherVenueSelected ? spaces[event.venue].name : event.venue) }</p>
            </Col>
          </Row>
        ) : <h3 style={{fontWeight: 300}}>No events on this day</h3> : <h3 style={{fontWeight: 300}}>Loading Events...</h3>
        }
      </Container>
    </div>)
  }
}

export default DayCalendar
