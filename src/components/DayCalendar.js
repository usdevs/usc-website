import React, { Component } from 'react'
import Infinite from 'react-infinite'
import moment from 'moment'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { isLoaded } from 'react-redux-firebase';
import { getEventByDay } from '../utils/utils'

class DayCalendar extends Component {
  render() {
    const { selectedDate, events, eventTypes, spaces } = this.props
    const selectedDateEvents = events ? getEventByDay(events, selectedDate) : []

    console.log(selectedDateEvents)
    return(<div>
      <h1 className="display-4"><small>{ selectedDate.format('Do MMMM') }</small><small className="text-muted">{', ' + selectedDate.format('YYYY')}</small></h1>
      <Infinite containerHeight={400} elementHeight={40}>
          {
            isLoaded(eventTypes) && isLoaded(spaces) ? selectedDateEvents ?
            selectedDateEvents.map((event) =>
              <div key={event.name}>
                <div>
                  <h1 className="d-inline-block mb-0">{event.name + '    '}<FontAwesomeIcon className="align-middle" icon="circle" color={isLoaded(eventTypes) ? eventTypes[event.type].colour : ''} size="xs" /></h1>
                  <br/>
                  <small className="text-muted">{eventTypes[event.type].name}</small>
                  <p className="lead">{moment(event.start).format('hh:mm a') + ' - ' + (!event.otherVenueSelected ? spaces[event.venue].name : event.venue) }</p>
                </div>
              </div>
            ) : <h4>No events on this day</h4> : ''
          }
      </Infinite>
    </div>)
  }
}

export default DayCalendar
