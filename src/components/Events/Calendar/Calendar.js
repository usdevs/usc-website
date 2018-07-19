import React, { Component } from 'react';
import { Button, Container, Row, Col } from 'reactstrap';
import Moment from 'moment'
import _ from 'lodash'
import { extendMoment } from 'moment-range';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

const moment = extendMoment(Moment);

class Calendar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedDate: moment(),
    }
  }

  componentDidMount() {
    const { initialDate } = this.props
    this.setState({
      selectedDate: initialDate,
    })
  }

  changeSelectedDate = (selectedDate) => {
    this.setState({
      ...this.state,
      selectedDate: selectedDate
    })
    this.props.onDayClick(selectedDate)
  }

  days() {
    var days = []

    var { selectedDate } = this.state
    var { events, eventTypes, bySpaces, spaces } = this.props

    const mthDisplayRange = moment.range(
      moment(selectedDate).startOf('month').startOf('week'),
      moment(selectedDate).endOf('month').endOf('week')
    )

    for (let day of mthDisplayRange.by('day')) {
      let belongsToSameMonth = day.isSame(moment(selectedDate), 'month')

      const dayEvents = events.isLoaded && events.ordered[day.toString()] ? events.ordered[day.toString()] : []
      const sameDay = selectedDate.isSame(moment(day), 'day')

      days.push(
        <Col key={day.format('YYYYMMDD')} onClick={() => this.changeSelectedDate(day)}
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
                        eventTypes.isLoaded ?
                          _.chunk(dayEvents, 3).map((eventChunk) => {
                            var tags = []
                            _.forOwn(eventChunk, (event) => {
                              tags.push(<FontAwesomeIcon className="inline-block" icon="circle" color={eventTypes.data[event.type].colour} key={event.id} />)
                            })

                            return (<Col className="d-flex justify-content-center pt-1" key={eventChunk[0].id}>
                              { tags }
                            </Col>)
                          })
                          : ''
                      : spaces.isLoaded ?
                        _.chunk(dayEvents.venuesUsed, 3).map((venues) => {
                          var tags = []
                          _.forOwn(venues, (venue, venueID) => {
                            tags.push(<FontAwesomeIcon className="inline-block" icon="circle" color={spaces.data[venue].colour} key={venueID} />)
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
    const { selectedDate } = this.state

    const wkRange = moment.range(moment(selectedDate).startOf('week'),moment(selectedDate).endOf('week'))

    for (let day of wkRange.by('day')) {
      dayHeaders.push(<Col key={day.format('YYYYMMDD')} className="dayHeader p-0">{day.format('dd')}</Col>)
    }

    return dayHeaders;
  }

  previousMonth = (selectedDate) => {
    this.props.loadMonth(selectedDate.clone())

    this.setState({
      ...this.state,
      selectedDate: moment(selectedDate).subtract(1, 'months')
    })
  }

  nextMonth = (selectedDate) => {
    this.props.loadMonth(selectedDate.clone())

    this.setState({
      ...this.state,
      selectedDate: moment(selectedDate).add(1, 'months')
    })
  }

  monthDisplay() {
    const { selectedDate } = this.state

    const previousButton = <Button color="link" onClick={() => this.previousMonth(selectedDate)}><FontAwesomeIcon icon="arrow-circle-left" size="3x" /></Button>
    const nextButton = <Button color="link" onClick={() => this.nextMonth(selectedDate)}><FontAwesomeIcon icon="arrow-circle-right" size="3x" /></Button>

    return (
      <div>
        <Row className="text-center align-items-center">
          <Col className="d-flex justify-content-between">
            { previousButton }
            <h2>
              { moment(selectedDate).format('MMMM') } <small className="text-muted">{ moment(selectedDate).format('YYYY') } </small>
            </h2>
              { nextButton }
          </Col>
        </Row>
      </div>);
  }

  legendDisplay = () => {
    const { eventTypes, spaces, bySpaces } = this.props

    var legendCols = []

    if(bySpaces && spaces.isLoaded){
      _.forEach(spaces.ordered, (space) => {
        legendCols.push(<Col xs="6" key={space.id}><FontAwesomeIcon className="inline-block" icon="circle" color={space.colour} />{ space.name }</Col>)
      })
    } else if (!bySpaces && eventTypes.isLoaded) {
      _.forEach(eventTypes.ordered, (type) => {
        legendCols.push(<Col xs="6" key={type.id}><FontAwesomeIcon className="inline-block" icon="circle" color={type.colour}  />{ type.name }</Col>)
      })
    }

    return legendCols
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
        {
          <Row>
            <Container className="p-0">
              <Row>
                { this.legendDisplay() }
              </Row>
            </Container>
          </Row>
        }
      </Container>
    );
  }
}

export default Calendar
