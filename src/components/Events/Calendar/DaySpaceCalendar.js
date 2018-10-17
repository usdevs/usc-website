import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import _ from 'lodash'
import EventModal from '../EventModal'

class DaySpaceCalendar extends Component {
  modals = {}

  spaceBookingDisplay = () => {
    const { timeslots, eventTypes, spaces, groups, groupTypes } = this.props

    if(!eventTypes.isLoaded || !spaces.isLoaded) {
      return(<h3 style={{fontWeight: 300}}><FontAwesomeIcon icon="spinner" spin /> Loading bookings...</h3>)
    } else if (timeslots) {
      return (<div>
        <Container className="d-block d-md-none">
          <Row>
            { this.spaceBookingDisplayCols(4) }
          </Row>
        </Container>
        <Container className="d-none d-md-block">
          <Row>
            { this.spaceBookingDisplayCols(6) }
          </Row>
        </Container>
        { this.eventModals() }
      </div>)
    } else {
      return(<h3 style={{fontWeight: 300}}>No bookings on this day</h3>)
    }
  }

  spaceBookingDisplayCols = (noOfColumns) => {
    const { timeslots, spaces } = this.props

    const events = timeslots.timeslots
    const venuesUsed = timeslots.venuesUsed

    const timeslotsCol = []

    const listOfTimeslots = _.sortBy(_.keys(events));
    console.log(listOfTimeslots)

    var index = 0
    const colSize = 12/noOfColumns

    _.forEach(_.chunk(listOfTimeslots, (12-colSize)/colSize), (timeslotChunk) => {
      index += 1

      timeslotsCol.push(<Col xs={ colSize } key={"timeslotInitial" + index}/>)

      _.forEach(timeslotChunk, (timeslotString) => {
        timeslotsCol.push(<Col xs={ colSize }  key={timeslotString + index} className="d-flex justify-content-center"><small>{ events[timeslotString].displayText }</small></Col>)
      })

      timeslotsCol.push(<div key={"timeslotDivider" + index} className="w-100"></div>)

      _.forEach(venuesUsed, (venueID) => {
        timeslotsCol.push(<Col xs={ colSize }  key={venueID + index}><small>{spaces.data[venueID] ? spaces.data[venueID].shortName : ''}</small></Col>)

        _.forEach(timeslotChunk, (timeslotString) => {
          if(events[timeslotString] && events[timeslotString][venueID]){
            var spaceEvent = events[timeslotString][venueID]

            timeslotsCol.push(<Col xs={ colSize }  key={venueID + timeslotString}
                 className={(spaceEvent.isStart ? 'rounded-left ' : '') + (spaceEvent.isEnd ? 'rounded-right' : '')}
                 style={{backgroundColor: spaces.data[venueID] ? spaces.data[venueID].colour : ''}}
                 onClick={() => this.modals[events[timeslotString][venueID].event.id].toggle()}/>)
          } else {
            timeslotsCol.push(<Col xs={ colSize }  key={venueID + timeslotString}/>)
          }
        })

        timeslotsCol.push(<div key={venueID + "timeslotDivider" + index} className="w-100"></div>)
      })
    })

    return timeslotsCol
  }

  eventModals = () => {
    const { eventsUnordered, eventTypes, spaces, firebase, groups, groupTypes } = this.props

    if(eventsUnordered) {
      var eventModal = []
      _.forOwn(eventsUnordered, (event, eventID) =>{
        eventModal.push(
          <EventModal
            key={eventID}
            ref={element => { this.modals[eventID] = element }}
            firebase={firebase}
            event={event}
            eventTypes={eventTypes}
            spaces={spaces}
            groups={groups}
            groupTypes={groupTypes} />)
      })
      return eventModal
    } else {
      return ''
    }
  }

  render() {
    const { selectedDate } = this.props

    return (<div>
      <h2 style={{fontWeight: 300}}><small>{ selectedDate.format('Do MMMM') }</small><small className="text-muted">{' ' + selectedDate.format('YYYY')}</small></h2>
      { this.spaceBookingDisplay() }
    </div>)
  }
}

export default DaySpaceCalendar
