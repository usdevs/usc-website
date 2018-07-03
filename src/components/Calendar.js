import React, { Component } from 'react';
import { Button, Container, Row, Col } from 'reactstrap';
import Moment from 'moment'
import _ from 'lodash'
import { extendMoment } from 'moment-range';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { isLoaded } from 'react-redux-firebase';

const moment = extendMoment(Moment);

class Calendar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      date: moment()
    }
  }

  changeSelectedDate = (date) => {
  console.log(date)
    this.setState({
      ...this.state,
      date: date
    })
    this.props.onDayClick(date)
  }

  days() {
    var days = []

    var { date } = this.state
    var { selectedDate, events, eventTypes, bySpaces, spaces } = this.props

    const mthDisplayRange = moment.range(
      moment(date).startOf('month').startOf('week'),
      moment(date).endOf('month').endOf('week')
    )

    for (let day of mthDisplayRange.by('day')) {
      let belongsToSameMonth = day.isSame(moment(date), 'month')

      const dayEvents = events && events[day.toString()] ? events[day.toString()] : []
      const sameDay = selectedDate.isSame(moment(day), 'day')

      days.push(
        <Col key={day.format('YYYYMMDD')} onClick={belongsToSameMonth ? () => this.props.onDayClick(day) : () => this.changeSelectedDate(day)}
          className={"embed-responsive embed-responsive-1by1 d-flex justify-content-center "+ (!belongsToSameMonth ? 'text-muted' : '')}>
          <Container>
            <Row>
              <Col className="d-flex justify-content-center" >
                <span className="fa-layers fa-fw" style={{marginTop: '.7em'}}>
                  {
                    sameDay ? <FontAwesomeIcon icon="circle" color="dodgerblue" transform="grow-11 up-3" /> : ''
                  }
                  <span className={"fa-layers-text " + (sameDay ? 'text-white' : '')} transform="bottom-100" style={{marginTop: '.6em'}}><h4>{day.format('D')}</h4></span>
                </span>
              </Col>
            </Row>
            <Row>
                {
                    dayEvents ?
                      !bySpaces ?
                        isLoaded(eventTypes) && eventTypes ?
                          _.chunk(dayEvents, 3).map((eventChunk) => {
                            var tags = []
                            _.forOwn(eventChunk, (event) => {
                              tags.push(<FontAwesomeIcon className="inline-block" icon="circle" color={eventTypes[event.type].colour} key={event.id} />)
                            })

                            return (<Col className="d-flex justify-content-center pt-1" key={eventChunk[0].id}>
                              { tags }
                            </Col>)
                          })
                          : ''
                      : isLoaded(spaces) && spaces ?
                        _.chunk(dayEvents.venuesUsed, 3).map((venues) => {
                          var tags = []
                          _.forOwn(venues, (venue, venueID) => {
                            tags.push(<FontAwesomeIcon className="inline-block" icon="circle" color={spaces[venue].colour} key={venueID} />)
                          })

                          return (<Col className="d-flex justify-content-center pt-1" key={venues[0]}>
                            { tags }
                          </Col>)
                        })
                        : ''
                      : ''
                }
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
      dayHeaders.push(<Col key={day.format('YYYYMMDD')} className="dayHeader">{day.format('dd')}</Col>)
    }

    return dayHeaders;
  }

  previousMonth = (date) => {
    this.props.loadMonth(date.clone())

    this.setState({
      ...this.state,
      date: moment(date).subtract(1, 'months')
    })
  }

  nextMonth = (date) => {
    this.props.loadMonth(date.clone())

    this.setState({
      ...this.state,
      date: moment(date).add(1, 'months')
    })
  }

  monthDisplay() {
    const { date } = this.state

    const previousButton = <Button color="link" onClick={() => this.previousMonth(date)}><FontAwesomeIcon icon="arrow-circle-left" size="3x" /></Button>
    const nextButton = <Button color="link" onClick={() => this.nextMonth(date)}><FontAwesomeIcon icon="arrow-circle-right" size="3x" /></Button>

    return (
      <div>
        <Row className="text-center align-items-center">
          <Col className="d-flex justify-content-between">
            { previousButton }
            <h2>
              { moment(date).format('MMMM') } <small className="text-muted">{ moment(date).format('YYYY') } </small>
            </h2>
              { nextButton }
          </Col>
        </Row>
      </div>);
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
          _.chunk(this.days(), 7).map((week, index) =>
            <Row key={index}>
              { week }
            </Row>
          )
        }
      </Container>
    );
  }
}

export default Calendar
