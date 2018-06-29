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
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { withRouter } from 'react-router-dom'

class Dashboard extends Component {
  render() {
    const { auth, history } = this.props;

    if(!isLoaded(auth)) {
      return <div/>
    } else if(isEmpty(auth)) {
      console.log("test")
      history.push('/')
    }

    return(
      <Container>
        <Row>
          <Col>
            <h1 className="display-4">Dashboard</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button onClick={() => history.push('/createevent')}>Create Event</Button>
          </Col>
          <Col>
            <Button onClick={() => history.push('/createig')}>Create Interest Group</Button>
          </Col>
        </Row>
        <Row>
          <br/>
        </Row>
      </Container>
    )
  }

}


export default withRouter(compose(
  firebaseConnect(), // withFirebase can also be used
  connect(({ firebase: { auth } }) => ({ auth }))
)(Dashboard))
