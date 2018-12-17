import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { headerEvent as header } from '../../resources/images.js'
import EventCalendar from './Calendar/EventCalendar'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import CreateEventButton from '../reusable/CreateEventButton.js';

const calendarLink = "http://bit.ly/uspcalendar";

class Events extends Component {
googleCalendarBtn = () => <Button color="primary" className="d-block d-sm-none" block><FontAwesomeIcon icon={['fab', 'google']} className="mr-2" />View on Google Calendar</Button>

  render() {
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
                <a href={calendarLink}>
                  <Button color="primary" className="d-none d-sm-block"><FontAwesomeIcon icon={['fab', 'google']} className="mr-2" />View on Google Calendar</Button>
                </a>
                <CreateEventButton/>
              </div>
            </div>
            <hr className="my-2" />
          </Col>
        </Row>
        <Row>
          <Col>
            <EventCalendar hideSpaceOnly={true}/>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Events
