import React, { Component } from 'react'
import {
  Container,
  Row,
  Col,
  Button,
  Jumbotron,
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle,
  Popover, PopoverHeader, PopoverBody
} from 'reactstrap';
import { headerEvent as header } from '../resources/images.js';
import Timeline from 'react-calendar-timeline/lib'
import Moment from 'moment'
import { getGoogleCalendarEvents, dayFormat, getDescriptionIconColor } from '../resources/gcal'
import { connect } from 'react-redux';
import _ from 'lodash'
import { setGoogleEvents } from '../actions'
import { isEmpty } from '../utils/utils'
import Calendar from './Calendar'
import { extendMoment } from 'moment-range';
require('react-calendar-timeline/lib/Timeline.css')

const moment = extendMoment(Moment);

class Spaces extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedDate: moment(),
      popoversOpen: {}
    }
  }

  componentDidMount = () => {
    if (this.props.bookings.eventCal === false) {
      getGoogleCalendarEvents(this.props.setGoogleEvents)
    }
  }

  setupPopovers = (bookings, date) => {
    var popover = {}
    const dayString = date.format(dayFormat)

    if(bookings && bookings[dayString]) {
      const dayBookings = bookings[dayString]

      dayBookings.map((booking) => {
        popover = {
          ...popover,
          [booking.meta.id]: false
        }
      })
    }

    return popover
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ popoversOpen: this.setupPopovers(nextProps.bookings.events, this.state.selectedDate) })
  }

  changeSelectedDate = (date) => {
    this.setState({
      ...this.state,
      selectedDate: date,
      popoversOpen: this.setupPopovers(this.props.bookings.events, date)
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

  spacesDisplay = (bookingsBySpace) => {
    const { selectedDate } = this.state
    const { spaces } = this.props

    const dayString = selectedDate.format(dayFormat)
    const dayBookings = bookingsBySpace[dayString]
    const hasBookings = !isEmpty(dayBookings)
    console.log(dayBookings)

    const day_start = selectedDate.clone().startOf('day')
    const day_end   = selectedDate.clone().endOf('day')
    const day = moment.range(day_start, day_end)

    const isBooked = (time) => {
      var booked = false
      spaces.map((space, index) => {
        if (dayBookings && dayBookings[space.name]) {
          dayBookings[space.name].map((booking) => {
            if(time.isBetween(booking.start, booking.end) || time.isSame(booking.start)) {
              booked = true
            }
          })
        }
      })

      return booked
    }

    const timeslot = (time) => {
      var timeColumns = []
      spaces.map((space, index) => {
        var slotColor = null
        var isStart = false
        var isEnd = false
        var bookingID = null

        if (dayBookings && dayBookings[space.name]) {
          dayBookings[space.name].map((booking) => {
            if(time.isBetween(booking.start, booking.end) || time.isSame(booking.start)) {
              slotColor = booking.color
              bookingID = booking.meta.id
            }

            if(time.isSame(booking.start)) {
              isStart = true
            }

            if(time.clone().add(30, 'minutes').isSame(booking.end)) {
              isEnd = true
            }
          })
        }

        timeColumns.push(
          <Col key={index}
               id={ isStart ? "b" + bookingID : null }
               className={(isStart ? 'rounded-top' : '') + ' ' + (isEnd ? 'rounded-bottom' : '')}
               style={slotColor ? {backgroundColor: slotColor} : {}}
               onClick={bookingID ? () => this.toggle(bookingID) : null }>
            {' '}
          </Col>
        )
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
                    <img src={space.image} className="embed-responsive embed-responsive-1by1 rounded-circle p-1" style={{objectFit: "cover"}} />
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
    const { bookings } = this.props
    const dayString = this.state.selectedDate.format(dayFormat)

    if(bookings.events && bookings.events[dayString]) {
      bookings.events[dayString].map((booking) => {
        const id = booking.meta.id

        popovers.push(
          <Popover key={'popover' + id} placement="top-start" isOpen={this.state.popoversOpen[id]} target={ "b" + id } toggle={() => this.toggle(id)}>
            <PopoverHeader>{booking.title}</PopoverHeader>
            <PopoverBody>{booking.type}</PopoverBody>
          </Popover>
        )
      })
    }

    return popovers
  }

  render() {
    const { selectedDate } = this.state;
    const { bookings, bookingsBySpaces } = this.props;

    return (
      <Container>
        <Row>
          <Col><img src={header} className="img-fluid" /></Col>
        </Row>
        <Row>
          <Col><div className="p-2"><h1 className="display-3">Spaces</h1></div><hr className="my-2" /></Col>
        </Row>
        <Row>
          <Col xs="12" md="6">
            <Calendar onDayClick={(date) => this.changeSelectedDate(date)} selectedDate={ selectedDate } events={ bookings.events } />
          </Col>
          <Col xs="12" md="6">
            { this.spacesDisplay(bookingsBySpaces.events) }
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
    bookings: state.bookingsByDay,
    bookingsBySpaces: state.bookingsByDayBySpace,
    spaces: state.spaces,
  }
}

export default connect(mapStateToProps, { setGoogleEvents })(Spaces);
