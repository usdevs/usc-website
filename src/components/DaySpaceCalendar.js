import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import _ from 'lodash'
import moment from 'moment'

const timeInterval = 30

class DaySpaceCalendar extends Component {
  spaceBookingDisplay = () => {
    const { timeslots, isLoaded } = this.props
    if(!isLoaded) {
      return(<h3 style={{fontWeight: 300}}>Loading bookings...</h3>)
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
      </div>)
    } else {
      return(<h3 style={{fontWeight: 300}}>No bookings on this day</h3>)
    }
  }



  spaceBookingDisplayCols = (noOfColumns) => {
    const { selectedDate, timeslots, spaces } = this.props

    const day_start = selectedDate.clone().startOf('day')
    const day_end   = selectedDate.clone().endOf('day')

    const events = timeslots.timeslots
    const venuesUsed = timeslots.venuesUsed

    const timeslotsCol = []

    const listOfTimeslots = _.sortBy(_.keys(events));

    var index = 0
    const colSize = 12/noOfColumns

    _.forEach(_.chunk(listOfTimeslots, (12-colSize)/colSize), (timeslotChunk) => {
      index += 1

      timeslotsCol.push(<Col xs={ colSize } key={"timeslotInitial" + index}/>)

      _.forEach(timeslotChunk, (timeslotString) => {
        const timeslot = moment(timeslotString)
        timeslotsCol.push(<Col xs={ colSize }  key={timeslot.toString() + index} className="d-flex justify-content-center"><small>{ timeslot.format("HHmm")}</small></Col>)
      })

      timeslotsCol.push(<div key={"timeslotDivider" + index} className="w-100"></div>)

      _.forEach(venuesUsed, (venueID) => {
        timeslotsCol.push(<Col xs={ colSize }  key={venueID + index}><small>{spaces[venueID] ? spaces[venueID].shortName : ''}</small></Col>)

        _.forEach(timeslotChunk, (timeslotString) => {
          if(events[timeslotString] && events[timeslotString][venueID]){
            var spaceEvent = events[timeslotString][venueID]

            timeslotsCol.push(<Col xs={ colSize }  key={venueID + timeslotString}
                 className={(spaceEvent.isStart ? 'rounded-left ' : '') + (spaceEvent.isEnd ? 'rounded-right' : '')}
                 style={{backgroundColor: spaces[venueID] ? spaces[venueID].colour : ''}}/>)
          } else {
            timeslotsCol.push(<Col xs={ colSize }  key={venueID + timeslotString}/>)
          }
        })

        timeslotsCol.push(<div key={venueID + "timeslotDivider" + index} className="w-100"></div>)
      })
    })

    return timeslotsCol
  }

  render() {
    const { timeslots, selectedDate } = this.props

    return (<div>
      <h2 style={{fontWeight: 300}}><small>{ selectedDate.format('Do MMMM') }</small><small className="text-muted">{' ' + selectedDate.format('YYYY')}</small></h2>
      { this.spaceBookingDisplay() }
    </div>)
  }
}

export default DaySpaceCalendar
