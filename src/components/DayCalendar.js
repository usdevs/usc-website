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
              <h3 className="d-inline-block mb-0" style={{overflowWrap: 'break-word'}}>
                {event.name + '    '}
                <FontAwesomeIcon className="align-middle" icon="circle" color={eventTypes[event.type].colour} size="xs" />
              </h3>
              <br/>
              <h5 className="mb-1 text-muted">{'   ' + eventTypes[event.type].name}</h5>
              <h4 className="mb-0" style={{fontWeight: 300}}>
              {
                event.fullDay ?
                  'Full Day'
                  : !event.multiDay ?
                      event.startDate.format('hh:mm a') + ' - ' + event.endDate.format('hh:mm a')
                    : selectedDate.isSame(event.original.startDate, 'day') ?
                      'starts at ' + event.startDate.format('hh:mm a')
                      : selectedDate.isSame(event.original.endDate, 'day') ?
                        'ends at ' + event.endDate.format('hh:mm a')
                        : ''
              }
              </h4>
              <h4 style={{fontWeight: 300}}>
              {
                 'at ' + (!event.otherVenueSelected ? spaces[event.venue].name : event.venue)
              }
              </h4>
              <p className="lead">{getEventStart(event).format('hh:mm a') }</p>
            </Col>
          </Row>
        ) : <h3 style={{fontWeight: 300}}>No events on this day</h3> : <h3 style={{fontWeight: 300}}><FontAwesomeIcon icon="spinner" spin /> Loading Events...</h3>
        }
      </Container>
    </div>)
  }
}

export default DayCalendar
