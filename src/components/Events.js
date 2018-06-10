import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Row,
  Col,
  Jumbotron,
  Button
} from 'reactstrap';
import { connect } from 'react-redux';
import { headerEvent as header } from '../resources/images.js'

class Events extends Component {
  render() {
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
            <a href="http://www.nususc.com/USC_Constitution.zip">
                <Button color="primary">Add To Your Calendar</Button>
            </a>
            <br/>
            <br/>
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
