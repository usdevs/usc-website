import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Async from 'react-promise';
import { headerAboutUs as carouselOne, headerContactUs as carouselTwo, headerDashboard as carouselThree } from '../resources/images';
import {
  UncontrolledCarousel,
  Container,
  Row,
  Col,
  Jumbotron,
  Button
} from 'reactstrap';
import BigCalendar from 'react-big-calendar'
import { calendars, getGoogleCalendarEvents } from '../resources/gcal'
BigCalendar.momentLocalizer(moment)
require('react-big-calendar/lib/css/react-big-calendar.css')


const items = [
  {
    src: carouselOne,
    altText: 'Welcome',
    caption: 'The 17th USC Committee',
    header: 'Welcome'
  },
  {
    src: carouselTwo,
    altText: 'Welcome',
    caption: 'Freshmen Orientation Project 2017',
    header: 'Aurora'
  },
  {
    src: carouselThree,
    altText: 'Welcome',
    caption: 'Cinnamon College',
    header: 'Our Home'
  }
];

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      events: []
    }
  }

  componentDidMount = () => {
    getGoogleCalendarEvents((events) => this.setState({
      events: events
    }))
  }

  render() {

    return (
      <Container>
        <Row>
          <Col sm="12" md={{ size: 10, offset: 1 }}>
            <UncontrolledCarousel items={items} />
          </Col>
        </Row>
        <Row>
          <Col sm="12" md={{ size: 10, offset: 1 }}>
            <Jumbotron>
              <h1 className="display-3">About Us</h1>
              <p className="lead">The University Scholars Club (USC) is a community of students enrolled in the National University of Singapore (NUS) University Scholars Programme (USP), which is a multidisciplinary, partially residential academic programme for NUS undergraduates.</p>
              <p className="lead">
                <Link to={`/about`}>
                  <Button color="primary">Learn More</Button>
                </Link>
              </p>
              <hr className="my-2" />
              <br />
              <h1 className="display-3">Events</h1>
              <BigCalendar
                defaultDate={new Date()}
                style={{height: '420px'}}
                events={this.state.events}
              />
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
