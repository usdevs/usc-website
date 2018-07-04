import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux';
import {
  Container, Row, Col,
  Card, CardText, Button,
  Input
} from 'reactstrap';
import DatePicker from 'react-datepicker'
import moment from 'moment'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import DatePickerForm from './reusable/DatePickerForm'
import EventCard from './EventCard'
import { getUserEvents } from '../utils/actions'
import { formatEvents } from '../utils/utils'
import { config } from '../resources/config'
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

  componentWillMount() {
    const { firestore } = this.context.store
    const { auth } = this.props

    if(isLoaded(auth) && !isEmpty(auth)) {
      getUserEvents(firestore, auth.uid)
    }
  }

  componentWillReceiveProps(nextProps) {
    const { firestore } = this.context.store
    const { auth, userEvents } = this.props
    const { filter } = this.state

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

    if(!_.startsWith(event.name, filter.name) ||
      event.startDate.isBefore(filter.startDate) ||
      event.endDate.isAfter(filter.endDate)) {
      return ('')
    }

    return (
    <Col xs="12" md="4" className="mb-2" key={event.id}>
      <EventCard event={event} eventTypes={eventTypes} spaces={spaces} buttonAction={() => history.push('/editevent/' + event.id)} buttonText='Manage' firebase={firebase} />
    </Col>)
  }

  render() {
    const { filter } = this.state
    const { auth, history, userEvents, eventTypes, spaces } = this.props
    console.log(this.props)

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
          isLoaded(userEvents) && isLoaded(eventTypes) && isLoaded(spaces) ?
            <Row className="mb-2">
              <Col className="mb-2" xs="12">
                <h4 className="mb-0">Show Events With Name</h4>
                <Input type="text" value={filter.name} placeholder="Filter Name" onChange={(event) => this.handleValueChanged(event.target.value, 'nameFilter')} />
              </Col>
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
            </Row>
          : ''
        }
        <Row>
            {
              isLoaded(userEvents) && isLoaded(eventTypes) && isLoaded(spaces) ?
              userEvents.map((event) => this.displayEvent(event))
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
    eventTypes: state.firestore.data.eventTypes,
    spaces: state.firestore.data.spaces,
  }
}

export default withRouter(compose(
  firebaseConnect(),
  connect(mapStateToProps)
)(ManageEvents))
