import React, { Component } from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { isLoaded } from 'react-redux-firebase'
import { eventTimeDisplay } from '../utils/utils'
import { Container, Row, Col, Nav, NavLink } from 'reactstrap'
import _ from 'lodash'
import EventModal from './EventModal'

class DayCalendar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      eventModals: {},
    }
  }

  toggleEventModal(eventID) {
    const { eventModals } = this.state
    this.setState({
      eventModals: {
        ...eventModals,
        [eventID]: !eventModals[eventID]
      }
    })
  }

  render() {
    const { eventModals } = this.state
    const { selectedDate, events, eventTypes, spaces, firebase } = this.props

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
              <h5 className="mb-1 text-muted">{eventTypes[event.type].name}</h5>
              <h4 className="mb-0" style={{fontWeight: 300}}>
              { eventTimeDisplay(event, selectedDate) }
              </h4>
              <h4 className="mb-1" style={{fontWeight: 300}}>
              {
                 'at ' + (!event.otherVenueSelected ? spaces[event.venue].name : event.venue)
              }
              </h4>
              {
                event.description ?
                  <small className="mt-1 mb-2">
                    { _.truncate(event.description, { 'length': 50 }) }
                  </small>
                : ''
              }
              <Nav className="ml-0">
                <NavLink className="pl-0" href="#" onClick={() => {
                  this.toggleEventModal(event.id)
                }}><small>See More...</small></NavLink>
              </Nav>
              <EventModal isOpen={eventModals[event.id]} toggle={() => this.toggleEventModal(event.id)} event={event} eventTypes={eventTypes} spaces={spaces} firebase={firebase} />
            </Col>
          </Row>
        ) : <h3 style={{fontWeight: 300}}>No events on this day</h3> : <h3 style={{fontWeight: 300}}><FontAwesomeIcon icon="spinner" spin /> Loading Events...</h3>
        }
      </Container>
    </div>)
  }
}

export default DayCalendar
