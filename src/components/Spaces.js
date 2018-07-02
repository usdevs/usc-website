import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { firebaseConnect, isLoaded } from 'react-redux-firebase';
import {
  Container,
  Row,
  Col,
  Jumbotron
} from 'reactstrap';
import { headerEvent as header } from '../resources/images.js';
import moment from 'moment'
import { connect } from 'react-redux';
import _ from 'lodash'
import { isEmpty, getEventsByDateTimeAndVenue } from '../utils/utils'
import { getEventStart, getEventEnd, getEventsBetween } from '../utils/utils'
import Calendar from './Calendar'
import DaySpaceCalendar from './DaySpaceCalendar'
import { getEvents } from '../utils/actions'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
require('react-calendar-timeline/lib/Timeline.css')

class Spaces extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      selectedDate: moment().startOf('day')
    }
  }

  componentWillMount() {
    const { firestore } = this.context.store
    getEvents(firestore, () => {}, moment(), true)
  }

  changeSelectedDate = (date) => {
    this.setState({
      ...this.state,
      selectedDate: date,
    })
  }

  render() {
    const { selectedDate } = this.state;
    const { events, eventTypes, spacesUnordered } = this.props;
    return (
      <Container>
        <Row>
          <Col><img src={header} className="img-fluid" alt="header" /></Col>
        </Row>
        <Row>
          <Col><div className="p-2"><h1 className="display-3">Spaces</h1></div><hr className="my-2" /></Col>
        </Row>
        <Row>
          <Col xs="12" lg="8">
            <DaySpaceCalendar
              selectedDate={ selectedDate }
              timeslots={ events && events[selectedDate.toString()] ? events[selectedDate.toString()] : null }
              spaces={ spacesUnordered }
              isLoaded={ isLoaded(spacesUnordered) }
            />
          </Col>
          <Col xs="12" lg="4">
            <hr className="my-2 d-block d-md-none" />
            <Calendar
              onDayClick={(date) => this.changeSelectedDate(date)}
              selectedDate={ selectedDate }
              events={ events }
              eventTypes={ eventTypes }
              spaces={ spacesUnordered }
              bySpaces={ true }/>
            <Container>
              <Row>
                {
                  spacesUnordered ?
                  _.map(spacesUnordered, (space, spaceID) =>
                    <h4 className="d-inline-block mb-0" key={spaceID}><FontAwesomeIcon className="align-middle" icon="circle" color={space.colour} size="xs" />{'    ' + space.name + '    '}</h4>
                  ) : ''
                }
              </Row>
            </Container>
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
    events: getEventsByDateTimeAndVenue(state.firestore),
    eventTypes: state.firestore.data.eventTypes,
    spaces: state.firestore.ordered.spaces,
    spacesUnordered: state.firestore.data.spaces
  }
}

export default compose(
  firebaseConnect(),
  connect(mapStateToProps)
)(Spaces)
