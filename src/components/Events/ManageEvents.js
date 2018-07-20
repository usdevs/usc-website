import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux';
import {
  Container, Row, Col,
  Button,
  Input
} from 'reactstrap';
import DatePicker from 'react-datepicker'
import moment from 'moment'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import DatePickerForm from '../reusable/DatePickerForm'
import EventCard from './EventCard'
import { getUserEvents } from '../../actions/EventsActions'
import { getGroups } from '../../actions/GroupsActions'
import { formatEvents, formatFirestoreData } from '../../utils/utils'
import { config } from '../../resources/config'
import _ from 'lodash'
import { withRouter } from 'react-router-dom'

class ManageEvents extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)

    const firstUserEvent = _.head(props.userEvents)
    const lastUserEvent = _.last(props.userEvents)

    this.state = {
      filter: {
        name: '',
        startDate: firstUserEvent ? firstUserEvent.startDate : moment(),
        endDate: lastUserEvent ? lastUserEvent.endDate : moment()
      },
    }
  }

  componentDidMount() {
    const { firestore } = this.context.store
    const { auth, groups } = this.props

    if(isLoaded(auth) && !isEmpty(auth)) {
      getUserEvents(firestore, auth.uid)
    }

    if(!groups.isLoaded) {
      getGroups(firestore)
    }
  }

  componentWillReceiveProps(nextProps) {
    const { firestore } = this.context.store
    const { auth, userEvents } = this.props

    if(!isLoaded(auth) && isLoaded(nextProps.auth) && !isEmpty(nextProps.auth)) {
      getUserEvents(firestore, nextProps.auth.uid)
    }

    if(userEvents.length === 0 && nextProps.userEvents.length > 0) {
      this.resetFilter(nextProps.userEvents)
    }
  }

  resetFilter = (newUserEvents) => {
    const { filter } = this.state
    var { userEvents } = this.props

    if(newUserEvents) {
      userEvents = newUserEvents
    }

    this.setState({
      filter: {
        ...filter,
        startDate: _.head(userEvents).startDate,
        endDate: _.last(userEvents).endDate
      }
    })
  }

  handleValueChanged = (value, type) => {
    const { filter } = this.state

    switch(type) {
      case 'nameFilter':
        this.setState({
          filter: {
            ...filter,
            name: value,
          }
        })
        break
      case 'startDate':
        this.setState({
          filter: {
            ...filter,
            startDate: value,
          }
        })
        break
      case 'endDate':
        this.setState({
          filter: {
            ...filter,
            endDate: value,
          }
        })
        break
      default:
        break
    }
  }

  displayEvent = (event) => {
    const { filter } = this.state
    const { spaces, history, firebase, eventTypes } = this.props

    if(!_.startsWith(_.lowerCase(event.name), _.lowerCase(filter.name)) ||
      event.startDate.isBefore(filter.startDate) ||
      event.endDate.isAfter(filter.endDate)) {
      return ('')
    }

  }

  displayEvents = () => {
    const { userEvents, eventTypes, spaces, history, groups, groupTypes } = this.props

    const eventCards = []

    _.forEach(userEvents, (event) => {
      eventCards.push(<Col xs="12" md="4" className="mb-2" key={event.id}>
        <EventCard
          event={event}
          eventTypes={eventTypes}
          spaces={spaces}
          groups={groups}
          groupTypes={groupTypes}
          buttonAction={() => history.push('/editevent/' + event.id)}
          buttonText='Manage'
          hasModal={false} />
      </Col>)
    })

    return eventCards
  }

  render() {
    const { filter } = this.state
    const { auth, history, userEvents, eventTypes, spaces } = this.props

    if(isLoaded(auth) && isEmpty(auth)) {
      history.push('/')
    }

    return(
      <Container>
        <Row>
          <Col>
            <h1 className="display-4">Manage Events</h1>
          </Col>
        </Row>
        {
          userEvents && eventTypes.isLoaded && spaces.isLoaded ?
            <Row className="mb-2">
              <Col className="mb-2" xs="12">
                <h4 className="mb-0">Show Events With Name</h4>
                <Input type="text" value={filter.name} placeholder="Filter Name" onChange={(event) => this.handleValueChanged(event.target.value, 'nameFilter')} />
              </Col>
              {
                false ?
              <Col className="mb-2" xs="12">
                <h4 className="mb-0">Show Events Between</h4>
                <div className="d-flex flex-wrap">
                  <div className="p-2"><DatePicker
                    showTimeSelect
                    className="d-inline"
                    selected={filter.startDate}
                    customInput={<DatePickerForm placeholder="Select Start Filter" />}
                    timeFormat="HH:mm"
                    timeInterval={config.timeInterval}
                    dateFormat="LLL"
                    timeCaption="time"
                    onChange={(date) => this.handleValueChanged(date, 'startDate')} /></div>
                  <div className="p-2 align-self-center"><h4 className="mb-0">to</h4></div>
                  <div className="p-2"><DatePicker
                    showTimeSelect
                    selected={filter.endDate}
                    customInput={<DatePickerForm placeholder="Select Start Filter" />}
                    timeFormat="HH:mm"
                    timeInterval={config.timeInterval}
                    dateFormat="LLL"
                    timeCaption="time"
                    onChange={(date) => this.handleValueChanged(date, 'endDate')} /></div>
                  <div className="p-2"><Button color="link" onClick={() => this.resetFilter()}>Reset Filter</Button></div>
                </div>
              </Col>
              : ''
            }
            </Row>
          : ''
        }
        <Row>
          {
            userEvents && eventTypes.isLoaded && spaces.isLoaded ?
              userEvents.length > 0 ?
                this.displayEvents()
              : <Col><h3><FontAwesomeIcon icon="frown" /> Either you have no events or no events match your filter.</h3></Col>
            : <Col><h4><FontAwesomeIcon icon="spinner" spin /> Loading Your Events...</h4></Col>
          }
        </Row>
      </Container>)
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    userEvents: formatEvents(state.firestore, 'userEvents', true),
    eventTypes: formatFirestoreData(state.firestore, 'eventTypes'),
    spaces: formatFirestoreData(state.firestore, 'spaces'),
    groups: formatFirestoreData(state.firestore, 'groups'),
    groupTypes: formatFirestoreData(state.firestore, 'groupTypes'),
  }
}

export default withRouter(compose(
  firebaseConnect(),
  connect(mapStateToProps)
)(ManageEvents))
