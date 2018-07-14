import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap'
import { getEvents, getEventsByMonth } from '../../../actions/EventsActions'
import { formatEventsByDateTimeAndVenue, formatMonthEvents,
  formatFirestoreData, formatEventsByDate } from '../../../utils/utils'
import { firebaseConnect } from 'react-redux-firebase';
import moment from 'moment'
import _ from 'lodash'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import Calendar from './Calendar'
import DayCalendar from './DayCalendar'
import DaySpaceCalendar from './DaySpaceCalendar'

class EventCalendar extends Component {
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

  legend = () => {
    const { spaces, bySpaces } = this.props

    if(!bySpaces) {
      return null
    } else {
      return _.map(spaces.data, (space, spaceID) =>
        <h4 className="d-inline-block mb-0" key={spaceID}><FontAwesomeIcon className="align-middle" icon="circle" color={space.colour} size="xs" />{'    ' + space.name + '    '}</h4>
      )
    }
  }

  calender = () => {
    const { selectedDate } = this.state
    const { events, timeslots, eventTypes, spaces, bySpaces } = this.props

    return(<Calendar
      onDayClick={(date) => this.changeSelectedDate(date)}
      selectedDate={ selectedDate }
      events={ bySpaces ? timeslots : events }
      eventTypes={eventTypes}
      spaces={spaces}
      bySpaces={bySpaces}
      loadMonth={ this.loadMonth.bind(this) }/>)
  }

  dayCalendar = () => {
    const { selectedDate } = this.state
    const { events, eventTypes, spaces, firebase } = this.props

    return(<DayCalendar
      selectedDate={ selectedDate }
      events={ events.isLoaded ? events.ordered[selectedDate.toString()] : null }
      eventTypes={eventTypes}
      spaces={spaces}
      firebase={firebase} />)
  }

  spaceCalendar = () => {
    const { selectedDate } = this.state
    const { timeslots, eventTypes, spaces, firebase } = this.props

    return(<DaySpaceCalendar
      selectedDate={ selectedDate }
      timeslots={ timeslots.isLoaded ? timeslots.ordered[selectedDate.toString()] : null }
      spaces={ spaces }
      eventTypes={ eventTypes }
      eventsUnordered={ timeslots.isLoaded ? timeslots.data : null }
      firebase={ firebase }
    />)
  }

  topComponent = () => {
    const { bySpaces, stack} = this.props
    if(bySpaces && !stack) {
      return this.spaceCalendar()
    } else {
      return this.calender()
    }
  }

  bottomComponent = () => {
    const { bySpaces, stack } = this.props
    if(bySpaces && !stack) {
      return this.calender()
    } else if (bySpaces) {
      return this.spaceCalendar()
    } else {
      return this.dayCalendar()
    }
  }

  render() {
    const { bySpaces, stack } = this.props
    return(<Container>
      <Row>
        <Col xs="12" lg={stack ? "12" : bySpaces ? "8" : "6"}>
          { this.topComponent() }
        </Col>
          <Col xs="12" lg={stack ? "12" : bySpaces ? "4" : "6"}>
            <hr className="my-2 d-block d-lg-none" />
            { this.bottomComponent() }
          </Col>
      </Row>
    </Container>)
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    events: {
      isLoaded: state.firestore.data.eventsStartInMth && state.firestore.data.eventsEndInMth,
      ordered: formatEventsByDate(state.firestore),
      data: _.merge(state.firestore.data.eventsStartInMth, state.firestore.data.eventsEndInMth)
    },
    timeslots: {
      isLoaded: state.firestore.data.eventsStartInMth && state.firestore.data.eventsEndInMth,
      ordered: formatEventsByDateTimeAndVenue(state.firestore),
      data: formatMonthEvents(state.firestore),
    },
    eventTypes: formatFirestoreData(state.firestore, 'eventTypes'),
    spaces: formatFirestoreData(state.firestore, 'spaces')
  }
}

export default compose(
  firebaseConnect(),
  connect(mapStateToProps)
)(EventCalendar)
