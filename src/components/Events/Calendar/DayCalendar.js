import React, { Component } from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { Container, Row, Col } from 'reactstrap'
import EventCard from '../EventCard'
import _ from 'lodash'

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

  showEvents = () => {
    const { events, eventTypes, spaces } = this.props

    const eventCards = []

    _.forEach(events, (event) => {
      eventCards.push(<Col key={event.id} className="mb-2" xs="12">
        <EventCard
          event={event}
          eventTypes={eventTypes}
          spaces={spaces}
          buttonText='See More'
          hasModal={true} />
      </Col>)
    })

    return eventCards
  }

  render() {
    const { selectedDate, events, eventTypes, spaces } = this.props

    return(<div>
      <h1 style={{fontWeight: 300}}><small>{ selectedDate.format('Do MMMM') }</small><small className="text-muted">{' ' + selectedDate.format('YYYY')}</small></h1>
      <Container className="pl-0 pr-0">
        <Row>
        {
          eventTypes.isLoaded && spaces.isLoaded
          ?
            !events
            ?
              <h3 style={{fontWeight: 300}}>No events on this day</h3>
            :
              this.showEvents()
          : <h3 style={{fontWeight: 300}}><FontAwesomeIcon icon="spinner" spin /> Loading Events...</h3>
        }
        </Row>
      </Container>
    </div>)
  }
}

export default DayCalendar
