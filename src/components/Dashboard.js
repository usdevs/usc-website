import React, { Component } from 'react';
import {
  UncontrolledCarousel,
  Container,
  Row,
  Col,
  Jumbotron,
  Button,
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle
} from 'reactstrap';

class Dashboard extends Component {
  render() {
    return(
      <Container>
        <Row>
          <Col>
            <h1 className="display-4">Dashboard</h1>
          </Col>
        </Row>
        <Row>
          <Col sm="12" md="6">
            <Button href="/createevent">Create Event</Button>
          </Col>
        </Row>
        <Row>
          <br/>
        </Row>
      </Container>
    )
  }

}

export default Dashboard;
