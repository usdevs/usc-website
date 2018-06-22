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
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

const MapWithAMarker = withScriptjs(withGoogleMap(props =>
  <GoogleMap
    defaultZoom={16}
    defaultCenter={{ lat: 1.3067028, lng: 103.7729797 }}
  >
    <Marker
      position={{ lat: 1.3067028, lng: 103.7734000 }}
    />
  </GoogleMap>
));


class ContactUs extends Component {
  render() {
    return(
      <Container>
        <Row>
          <Col sm="12" md={{ size: 5, offset: 1 }}>
            <h1 className="display-4">Contact Us</h1>
          </Col>
        </Row>
        <Row>
          <Col sm="12" md={{ size: 5, offset: 1 }}>
            <MapWithAMarker
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `400px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
          </Col>
          <Col sm="12" md={{ size: 5 }}>
            <Jumbotron className="pb-0 mb-0 h-100">
              <h4>NUS Students' University Scholars Club</h4>
              <p className="lead">National University of Singapore<br/>Cinnamon College, University Town<br/>18 College Avenue East S138593</p>
              <br/>
              <p>If you have any queries or questions regarding the University Scholars Club and would like to speak to someone,
                please email <a href="mailto:usc.hongensec@u.nus.edu">usc.hongensec@u.nus.edu</a>.</p>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <br/>
        </Row>
      </Container>
    )
  }

}

export default ContactUs;
