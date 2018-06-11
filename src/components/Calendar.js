import React, { Component } from 'react';
import { Button, Container, Row, Col } from 'reactstrap';
import Moment from 'moment'
import lodash from 'lodash'
import { extendMoment } from 'moment-range';
import { getGoogleCalendarEvents, dayFormat, getDescriptionIconColor } from '../resources/gcal'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

const moment = extendMoment(Moment);

class Calendar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      date: moment()
    }
  }

  changeSelectedDate = (date) => {
    this.setState({
      ...this.state,
      date: date
    })
    this.props.onDayClick(date)
  }

  days() {
    var days = []
    var dayCounter = 0

    var { date } = this.state
    var { selectedDate, events } = this.props

    const mthDisplayRange = moment.range(
      moment(date).startOf('month').startOf('week'),
      moment(date).endOf('month').endOf('week')
    )

    for (let day of mthDisplayRange.by('day')) {
      let belongsToSameMonth = day.isSame(moment(date), 'month')

      const dayEvents = events ? events[moment(day).format(dayFormat)] : []
      const offSet = dayEvents ? Math.round((12 - dayEvents.length)/2) - 1: 0
      const sameDay = selectedDate.isSame(moment(day), 'day')

      days.push(
        <Col key={day.format('YYYYMMDD')} onClick={belongsToSameMonth ? () => this.props.onDayClick(day) : () => this.changeSelectedDate(day)}
          className={"embed-responsive embed-responsive-1by1 d-flex align-items-stretch text-center "+ (!belongsToSameMonth ? 'text-muted' : '')}>
          <Container className="h-100">
            <Row>
              <Col>
                <div className="d-flex justify-content-center">
                  <div className={"text-center w-50 "+ (sameDay ? 'text-white' : '')}>
                    <h3>{ sameDay ? <FontAwesomeIcon icon="circle" color="dodgerblue" size="lg" style={{ position: 'absolute', top: '0px', left: '32%', zIndex: -1 }} /> : '' }{day.format('D')}</h3>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                {
                  dayEvents ? dayEvents.map((event, index) =>
                    <FontAwesomeIcon icon="circle" color={getDescriptionIconColor(event)} />
                    ) : ''
                }
              </Col>
            </Row>
          </Container>
        </Col>)
    }

    return days;
  }

  dayHeaders() {
    var dayHeaders = []
    const { date } = this.state

    const wkRange = moment.range(moment(date).startOf('week'),moment(date).endOf('week'))

    for (let day of wkRange.by('day')) {
      dayHeaders.push(<Col key={day.format('YYYYMMDD')} className="dayHeader">{day.format('ddd')}</Col>)
    }

    return dayHeaders;
  }

  monthDisplay() {
    const { date } = this.state

    return (
      <Row className="text-center align-items-center">
        <Col xs="2">
          <Button color="link" onClick={() => {
            this.setState({
              ...this.state,
              date: moment(date).subtract(1, 'months')
            })
          }}><FontAwesomeIcon icon="arrow-circle-left" size="3x" /></Button>
        </Col>
        <Col>
          <h5 className="display-4">
            { moment(date).format('MMMM') }, <small className="text-muted">{ moment(date).format('YYYY') } </small>
          </h5>
        </Col>
        <Col xs="2">
          <Button color="link" onClick={() => {
            this.setState({
              ...this.state,
              date: moment(date).add(1, 'months')
            })
          }}><FontAwesomeIcon icon="arrow-circle-right" size="3x" /></Button>
        </Col>
      </Row>);
  }

  render() {
    return (
      <Container>
        {
          this.monthDisplay()
        }
        <Row className="text-center">
          {this.dayHeaders()}
        </Row>
        {
          lodash.chunk(this.days(), 7).map((week, index) =>
            <Row key={index}>
              { week }
            </Row>
          )
        }
      </Container>
    );
  }
}

export default Calendar;
