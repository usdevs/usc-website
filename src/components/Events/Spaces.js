import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap';
import { headerSpaces as header } from '../../resources/images.js'
import EventCalendar from './Calendar/EventCalendar'

class Spaces extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col><img src={header} className="img-fluid" alt="header" /></Col>
        </Row>
        <Row>
          <Col><div className="p-2"><h1 className="display-3">Spaces</h1></div><hr className="my-2" /></Col>
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
