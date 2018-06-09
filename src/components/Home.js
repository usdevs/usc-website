import React, { Component } from 'react';
import moment from 'moment';
import Async from 'react-promise';
import Calendar from 'react-google-calendar-events-list';
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
    src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa1d%20text%20%7B%20fill%3A%23555%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa1d%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22285.921875%22%20y%3D%22218.3%22%3EFirst%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
    altText: 'Slide 1',
    caption: 'Slide 1'
  },
  {
    src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa20%20text%20%7B%20fill%3A%23444%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa20%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23666%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22247.3203125%22%20y%3D%22218.3%22%3ESecond%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
    altText: 'Slide 2',
    caption: 'Slide 2'
  },
  {
    src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa21%20text%20%7B%20fill%3A%23333%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa21%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23555%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22277%22%20y%3D%22218.3%22%3EThird%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
    altText: 'Slide 3',
    caption: 'Slide 3'
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
                <Button color="primary">Learn More</Button>
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
