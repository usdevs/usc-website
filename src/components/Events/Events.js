import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux';
import {
  Container,
  Row,
  Col,
  Button
} from 'reactstrap';
import { getEvents, getEventsByMonth } from '../../utils/actions'
import { formatEventsByDate } from '../../utils/utils'
import { headerEvent as header } from '../../resources/images.js'
import Calendar from './Calendar'
import DayCalendar from './DayCalendar'
import moment from 'moment'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { withRouter } from 'react-router-dom'

const calendarLink = "http://bit.ly/uspcalendar"

class Events extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      selectedDate: moment().startOf('day'),
    }
  }

  componentWillMount() {
    const { firestore } = this.context.store
    getEvents(firestore, () => {}, moment())
  }

  changeSelectedDate = (date) => {
    this.setState({
      ...this.state,
      selectedDate: date.clone(),
    })
  }

  loadMonth(month) {
    const { firestore } = this.context.store
    getEventsByMonth(firestore, () => {}, month.clone())
  }

  render() {
    const { selectedDate } = this.state
    const { events, eventTypes, spaces, firebase, history, auth } = this.props

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
              <div className="p-2"><h1 className="mb-0" style={{fontWeight: 300}}>Events</h1></div>
              <div className="d-flex ml-auto mr-3 p-2 align-items-center">
                { isLoaded(auth) && !isEmpty(auth) ? <Button color="primary" className="d-none d-sm-block mr-3" onClick={() => history.push('/createevent')} outline>Create Event</Button> : '' }
                <a href={calendarLink}>
                  <Button color="primary" className="d-none d-sm-block">Add to my Calendar</Button>
                </a>
              </div>
            </div>
            <div>
              <Button color="primary" className="d-block d-sm-none mb-3" onClick={() => history.push('/createevent')} block outline>Create Event</Button>
              <a href={calendarLink}>
                <Button color="primary" className="d-block d-sm-none" block>Add to my Calendar</Button>
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
              eventTypes={eventTypes}
              loadMonth={ this.loadMonth.bind(this) }/>
          </Col>
            <Col xs="12" lg="4">
              <hr className="my-2 d-block d-lg-none" />
              <DayCalendar
                selectedDate={ selectedDate }
                events={ events && events[selectedDate.toString()] ? events[selectedDate.toString()] : null }
                eventTypes={eventTypes}
                spaces={spaces}
                firebase={firebase} />
            </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    events: formatEventsByDate(state.firestore),
    eventTypes: state.firestore.data.eventTypes,
    spaces: state.firestore.data.spaces
  }
}

export default withRouter(compose(
  firebaseConnect(),
  connect(mapStateToProps)
)(Events))
