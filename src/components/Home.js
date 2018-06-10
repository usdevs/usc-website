import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Async from 'react-promise';
import Calendar from 'react-google-calendar-events-list';
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
import { GOOGLE_API_KEY } from '../config.js'
import GoogleCalendar from '../utils/GoogleCalendar'
// a localizer for BigCalendar
BigCalendar.momentLocalizer(moment)
require('react-big-calendar/lib/css/react-big-calendar.css')

const calendars = [
  {
    name: 'USCalendar',
    url: 'ggoope87t0hgl8u9upt44vv8bs@group.calendar.google.com'
  }
]
const dailyRecurrence = 700
const weeklyRecurrence = 100
const monthlyRecurrence = 20

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
    this.getGoogleCalendarEvents()
  }
    getGoogleCalendarEvents = () => {
      /*
       * @param {string} GOOGLE_API_KEY - your Google API key
       * @param {array} calendars - a list of key, value pairs
       *                {name: 'name of your calendar', url: 'calendar_url'}
       * @param {number} dailyRecurrence - how many times you want daily events to reoccur
       * @param {number} weeklyRecurrence - how many times you want weekly events to reoccur
       * @param {number} monthlyRecurrence - how many times you want monthly events to reoccur
       *
       * @returns {array} events - list of objects that will render on react-big-calendar
       *   e.x. event = {
       *           eventType: {string} calendar.name
       *           creator: {string}
       *           end: Datetime
       *           gLink: {string} link to event in Google Calendar,
       *           description: {string},
       *           location: {string}
       *           start: Datetime
       *           title: {string} summary
       *           meta: {object} - everything about the event Google returns
       *        }
       */
      GoogleCalendar.getAllCalendars(GOOGLE_API_KEY, calendars, dailyRecurrence, weeklyRecurrence, monthlyRecurrence)
        .then(events => this.setState({events}) )
        .catch(err => { throw new Error(err) })
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
