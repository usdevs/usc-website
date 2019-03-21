import React, { Component } from 'react'
import { Container, Row, Col, Button } from 'reactstrap';
import { headerSpaces as header } from '../../resources/images.js'
import EventCalendar from './Calendar/EventCalendar'
import CreateEventButton from '../reusable/CreateEventButton.js';

class Spaces extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col><img src={header} className="img-fluid" alt="header" /></Col>
        </Row>
        <Row>
          <Col>
            <div className="d-flex">
              <div className="p-2"><h1 className="mb-0" style={{fontWeight: 300}}>Spaces</h1></div>
              <div className="d-flex ml-auto mr-3 p-2 align-items-center">
                <CreateEventButton/>
              </div>
            </div>
            <hr className="my-2" />
          </Col>
        </Row>
        <Row>
        </Row>
        <Row className="mb-5">
          <Col className="d-none d-lg-block">
            <EventCalendar bySpaces={true}/>
          </Col>
          <Col className="d-block d-lg-none">
            <EventCalendar bySpaces={true} stack={true}/>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Spaces
