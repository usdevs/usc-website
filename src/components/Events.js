import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Button
} from 'reactstrap';
import { connect } from 'react-redux';
import { getGoogleCalendarEvents, dayFormat, getDescriptionIconColor } from '../resources/gcal'
import { headerEvent as header } from '../resources/images.js'
import Calendar from './Calendar'
import moment from 'moment'
import Infinite from 'react-infinite'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

class Events extends Component {

  constructor(props) {
    super(props);

    this.state = {
      events: [],
      selectedDate: moment()
    }
  }

  componentDidMount = () => {
    getGoogleCalendarEvents((events) => {
      this.setState({
        ...this.state,
        events: events
      })
    })
  }

  changeSelectedDate = (date) => {
    this.setState({
      ...this.state,
      selectedDate: date
    })
  }

  render() {
    const { selectedDate, events } = this.state
    const selectedDayEvents = events ? events[moment(selectedDate).format(dayFormat)] : []
    console.log(selectedDayEvents)

    return (
      <Container>
        <Row>
          <Col>
            <img src={header} className="img-fluid" />
          </Col>
        </Row>
        <Row>
          <Col>
            <h1 className="display-3">Events</h1>
            <hr className="my-2" />
          </Col>
        </Row>
        <Row>
          <Col md="4" className="d-none d-md-block">
            <h1 className="display-4"><small>{ selectedDate.format('Do MMMM') }</small><small className="text-muted">{', ' + selectedDate.format('YYYY')}</small></h1>
            <Infinite containerHeight={400} elementHeight={40}>
                {
                  selectedDayEvents ?
                  selectedDayEvents.map((event) =>
                    <div key={event.glink}>
                      <div>
                        <h1 className="d-inline-block">{event.title + '    '}<FontAwesomeIcon className="align-middle" icon="circle" color={getDescriptionIconColor(event)} size="xs" /></h1>
                        <p class="lead">{moment(event.start).format('hh:mm a') + (event.venue ? ' - ' + event.venue : '') }</p>
                      </div>
                    </div>
                  ) : ''
                }
            </Infinite>
          </Col>
          <Col xs="12" md="8">
            <Calendar onDayClick={(date) => this.changeSelectedDate(date)} selectedDate={ selectedDate } events={ events } />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
  }
}

export default connect(mapStateToProps)(Events);
