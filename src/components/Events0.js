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
import BigCalendar from 'react-big-calendar'
import moment from 'moment';
import { calendars, getGoogleCalendarEvents, getVenueIconStyle } from '../resources/gcal'
require('react-big-calendar/lib/css/react-big-calendar.css')

const customToolbar = (toolbar) => {
  const goToBack = () => {
    toolbar.date.setMonth(toolbar.date.getMonth() - 1);
    toolbar.onNavigate('prev');
  };

  const goToNext = () => {
    toolbar.date.setMonth(toolbar.date.getMonth() + 1);
    toolbar.onNavigate('next');
  };

  const goToCurrent = () => {
    const now = new Date();
    toolbar.date.setMonth(now.getMonth());
    toolbar.date.setYear(now.getFullYear());
    toolbar.onNavigate('current');
  };

  const date = moment(toolbar.date);

  return (
    <div className="text-center">
      <Button color="primary" onClick={goToBack}>{'<'}</Button>
      <span><b>{'      '}{date.format('MMMM')}</b><span> {date.format('YYYY')}{'      '}</span></span>
      <Button color="primary" onClick={goToNext}>{'>'}</Button>
      <br/>
      <br/>
    </div>
  );
};

const customEventWrapper = ({ event, children }) => {
  return(
    <div>
      <div>
        <p className="d-none d-md-inline">{' '}{event.title}</p>
        <div style={getVenueIconStyle(event.location)} className="rounded-circle d-inline-block d-md-inline-block"/>
      </div>
    </div>
  );
}

moment.locale('en');
BigCalendar.momentLocalizer(moment);

class Events extends Component {

  constructor(props) {
    super(props);

    this.state = {
      events: [],
      selectedDate: Date()
    }
  }

  componentDidMount = () => {
    getGoogleCalendarEvents((events) => this.setState({
      events: events
    }))
  }

  changeSelectedDate = (date) => {
    this.setState({
      ...this.state,
      selectedDate: date.start
    })
  }

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
        <Row>
          <Col className="embed-responsive embed-responsive-4by3">
            <BigCalendar
              selectable
              defaultDate={new Date()}
              className="embed-responsive-item"
              events={this.state.events}
              onSelectSlot={this.changeSelectedDate.bind(this)}
              drilldownView={ null }
              components={{
                eventWrapper: customEventWrapper,
                toolbar: customToolbar
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <h1>{ this.state.selectedDate.toString() }</h1>
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
