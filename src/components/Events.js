import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Jumbotron
} from 'reactstrap';
import { connect } from 'react-redux';
import { getGoogleCalendarEvents, dayFormat } from '../resources/gcal'
import { headerEvent as header } from '../resources/images.js'
import Calendar from './Calendar'
import moment from 'moment'
import Infinite from 'react-infinite'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { setGoogleEvents } from '../actions'
import { isEmpty } from '../utils/utils'

const calendarLink = "http://bit.ly/uspcalendar"

class Events extends Component {

  constructor(props) {
    super(props);

    this.state = {
      events: [],
      selectedDate: moment(),
    }
  }

  componentDidMount = () => {
    if (isEmpty(this.props.events)) {
      getGoogleCalendarEvents(this.props.setGoogleEvents)
    }
  }

  changeSelectedDate = (date) => {
    this.setState({
      ...this.state,
      selectedDate: date
    })
  }

  render() {
    const { selectedDate } = this.state
    const { events } = this.props
    const selectedDayEvents = events ? events[moment(selectedDate).format(dayFormat)] : []

    return (
      <Container>
        <Row>
          <Col>
            <img src={header} className="img-fluid" />
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
            <Calendar onDayClick={(date) => this.changeSelectedDate(date)} selectedDate={ selectedDate } events={ events } />
          </Col>
            <Col xs="12" lg="4">
              <hr className="my-2 d-block d-lg-none" />
              <h1 className="display-4"><small>{ selectedDate.format('Do MMMM') }</small><small className="text-muted">{', ' + selectedDate.format('YYYY')}</small></h1>
              <Infinite containerHeight={400} elementHeight={40}>
                  {
                    selectedDayEvents ?
                    selectedDayEvents.map((event) =>
                      <div key={event.glink}>
                        <div>
                          <h1 className="d-inline-block mb-0">{event.title + '    '}<FontAwesomeIcon className="align-middle" icon="circle" color={event.color} size="xs" /></h1>
                          <br/>
                          <small className="text-muted">{event.type}</small>
                          <p className="lead">{moment(event.start).format('hh:mm a') + (event.venue ? ' - ' + event.venue : '') }</p>
                        </div>
                      </div>
                    ) : <h4>No events on this day</h4>
                  }
              </Infinite>
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
  return {
    events: state.googleEventsByDay
  }
}

export default connect(mapStateToProps, { setGoogleEvents })(Events);
