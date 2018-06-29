import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux';
import {
  Container,
  Row,
  Col,
  Button,
  Jumbotron
} from 'reactstrap';
import { getEvents } from '../utils/actions'
import { headerEvent as header } from '../resources/images.js'
import Calendar from './Calendar'
import DayCalendar from './DayCalendar'
import moment from 'moment'
import { firebaseConnect } from 'react-redux-firebase';

const calendarLink = "http://bit.ly/uspcalendar"

class Events extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      selectedDate: moment(),
    }
  }

  componentWillMount() {
    const { firestore } = this.context.store
    getEvents(firestore, moment())
  }

  changeSelectedDate = (date) => {
    this.setState({
      ...this.state,
      selectedDate: date,
    })
  }

  render() {
    const { selectedDate } = this.state
    const { events, eventTypes, spaces } = this.props

    return (
      <Container>
        <Row>
          <Col>
            <img src={header} className="img-fluid" alt="header" />
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="d-flex">
              <div className="p-2"><h1 className="display-3">Events</h1></div>
              <div className="d-flex ml-auto mr-3 p-2 align-items-center">
                <a href={calendarLink}>
                  <Button color="primary" className="d-none d-sm-block">Add to my Calendar</Button>
                </a>
              </div>
            </div>
            <div>
              <a href={calendarLink}>
                <Button color="primary" className="d-block d-sm-none w-100">Add to my Calendar</Button>
              </a>
            </div>
            <hr className="my-2" />
          </Col>
        </Row>
        <Row>
          <Col xs="12" lg="8">
            <Calendar
              onDayClick={(date) => this.changeSelectedDate(date)}
              selectedDate={ selectedDate }
              events={ events }
              eventTypes={eventTypes} />
          </Col>
            <Col xs="12" lg="4">
              <hr className="my-2 d-block d-lg-none" />
              <DayCalendar
                selectedDate={selectedDate}
                events={ events }
                eventTypes={eventTypes}
                spaces={spaces} />
            </Col>
        </Row>
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
  console.log(state.firestore)
  return {
    events: state.firestore.ordered.events,
    eventTypes: state.firestore.data.eventTypes,
    spaces: state.firestore.data.spaces
  }
}

export default compose(
  firebaseConnect(),
  connect(mapStateToProps)
)(Events)
