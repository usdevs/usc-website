import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { firebaseConnect, isLoaded } from 'react-redux-firebase';
import {
  Container,
  Row,
  Col,
  Jumbotron,
  Popover, PopoverHeader, PopoverBody
} from 'reactstrap';
import { headerEvent as header } from '../resources/images.js';
import moment from 'moment'
import { connect } from 'react-redux';
import _ from 'lodash'
import { isEmpty } from '../utils/utils'
import { getEventByDay, getEventStart, getEventEnd, getEventsBetween } from '../utils/utils'
import Calendar from './Calendar'
import { getEvents } from '../utils/actions'
require('react-calendar-timeline/lib/Timeline.css')

class Spaces extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      selectedDate: moment(),
      popoversOpen: {}
    }
  }

  componentWillMount() {
    const { firestore } = this.context.store
    getEvents(firestore, moment(), true)
  }

  setupPopovers = (events, date) => {
    var popover = {}

    if(events) {
      const dayEvents = getEventByDay(events, date)

      dayEvents.map((event) => {
        popover = {
          ...popover,
          [event.id]: false
        }

        return null
      })
    }

    return popover
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ popoversOpen: this.setupPopovers(nextProps.events, this.state.selectedDate) })
  }

  changeSelectedDate = (date) => {
    this.setState({
      ...this.state,
      selectedDate: date,
      popoversOpen: this.setupPopovers(this.props.events, date)
    })
  }

  toggle = (bookingID) => {
    const { popoversOpen } = this.state

    this.setState({
      popoversOpen: {
        ...popoversOpen,
        [bookingID]: !popoversOpen[bookingID]
      }
    });
  }

  spacesDisplay = () => {
    const { selectedDate } = this.state
    const { events, spaces } = this.props

    const dayEvents = getEventByDay(events, selectedDate)
    const hasBookings = !isEmpty(dayEvents)

    const day_start = selectedDate.clone().startOf('day')
    const day_end   = selectedDate.clone().endOf('day')
    const day = moment.range(day_start, day_end)

    //Check if this timeslot is booked in any of the spaces
    const isBooked = (time) => {
      const timeSlotEvents = getEventsBetween(dayEvents, time)

      return timeSlotEvents.length > 0
    }

    const timeslot = (time) => {
      var timeColumns = []

      const timeSlotEvents = getEventsBetween(dayEvents, time)

      spaces.map((space) => {
        var slotColor = null
        var isStart = false
        var isEnd = false
        var bookingID = null

        var timeSlotEventArr = _.filter(timeSlotEvents, (event) => {
          return event.venue === space.id
        })

        const timeSlotEvent = timeSlotEventArr[0]
        if (timeSlotEvent) {
          slotColor = space.colour
          bookingID = timeSlotEvent.id

          if(time.isSame(getEventStart(timeSlotEvent), 'minutes')){
            isStart = true
          }

          if(time.clone().add(30, 'minutes').isSame(getEventEnd(timeSlotEvent), 'minutes')) {
            isEnd = true
          }
        }

        timeColumns.push(
          <Col key={space.id + time}
               id={ isStart ? "b" + bookingID : null }
               className={(isStart ? 'rounded-top ' : '') + (isEnd ? 'rounded-bottom' : '')}
               style={slotColor ? {backgroundColor: slotColor} : {}}
               onClick={bookingID ? () => this.toggle(bookingID) : null }>
            {' '}
          </Col>
        )

        return null
      })

      return timeColumns
    }

    var hourSlots = []
    var previousIsBooked = false
    for (let hour of day.by('hour')) {
      if (isBooked(hour) || previousIsBooked) {
        previousIsBooked = isBooked(hour) ? true : !previousIsBooked
        hourSlots.push(<Col key={hour + "header"}><p className="lead">{ hour.format("HHmm")}</p></Col>)
        hourSlots.push(timeslot(hour))
        hourSlots.push(<div key={hour + "divider"} className="w-100"></div>)
      }

      const halfHour = hour.add(30, "minutes")

      if (isBooked(halfHour) || previousIsBooked) {
        previousIsBooked = isBooked(halfHour) ? true : !previousIsBooked
        hourSlots.push(<Col key={halfHour + "header"}><p className="lead">{ halfHour.format("HHmm") }</p></Col>)
        hourSlots.push(timeslot(halfHour))
        hourSlots.push(<div key={halfHour + "divider"} className="w-100"></div>)
      }
    }

    return(
      <Container>
        <Row>
          <Col><h2>{ !hasBookings ? 'No ' : '' }Bookings for { selectedDate.format('Do MMMM') }</h2></Col>
        </Row>
        {
          hasBookings ?
          <Row noGutters={true}>
            <Col>{' '}</Col>
            {
              spaces.map((space) =>
              <Col key={space.name}>
                <div className="text-center">
                  {
                    //<img src={space.image} className="embed-responsive embed-responsive-1by1 rounded-circle p-1" style={{objectFit: "cover"}} />
                  }
                  <p className="lead">{space.shortName}</p>
                </div>
              </Col>)
            }
            <div className="w-100"></div>
          { hourSlots }
        </Row> : ''
        }
      </Container>
    )
  }

  popoversDisplay = () => {
    var popovers = []
    const { selectedDate } = this.state
    const { events, spacesUnordered } = this.props

    const dayEvents = getEventByDay(events, selectedDate)

    dayEvents.map((event) => {
      popovers.push(
        <Popover key={'popover' + event.id} placement="top-start" isOpen={this.state.popoversOpen[event.id]} target={ "b" + event.id } toggle={() => this.toggle(event.id)}>
          <PopoverHeader>{event.name}</PopoverHeader>
          <PopoverBody>{ isLoaded(spacesUnordered) ? spacesUnordered[event.venue].name : '' }</PopoverBody>
        </Popover>
      )

      return null
    })

    return popovers
  }

  render() {
    const { selectedDate } = this.state;
    const { events, eventTypes } = this.props;

    return (
      <Container>
        <Row>
          <Col><img src={header} className="img-fluid" alt="header" /></Col>
        </Row>
        <Row>
          <Col><div className="p-2"><h1 className="display-3">Spaces</h1></div><hr className="my-2" /></Col>
        </Row>
        <Row>
          <Col xs="12" md="6">
            <Calendar
              onDayClick={(date) => this.changeSelectedDate(date)}
              selectedDate={ selectedDate }
              events={ events }
              eventTypes={eventTypes} />
          </Col>
          <Col xs="12" md="6">
            { this.spacesDisplay() }
            { this.popoversDisplay() }
          </Col>
        </Row>
        <br/>
        <br/>
        <Row>
          <Col>
            <Jumbotron><h6>Copyright 2018. NUS Students' University Scholars Club</h6></Jumbotron>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    events: state.firestore.ordered.events,
    eventTypes: state.firestore.data.eventTypes,
    spaces: state.firestore.ordered.spaces,
    spacesUnordered: state.firestore.data.spaces
  }
}

export default compose(
  firebaseConnect(),
  connect(mapStateToProps)
)(Spaces)
