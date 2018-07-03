import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux';
import moment from 'moment';
import { headerAboutUs as carouselOne, headerContactUs as carouselTwo, headerDashboard as carouselThree } from '../resources/images';
import {
  UncontrolledCarousel,
  Container,
  Row,
  Col,
  Jumbotron,
  Button,
  Card, CardText, CardBody,
  CardTitle, CardSubtitle
} from 'reactstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { footerText } from '../resources/data'
import { getUpcomingEvents } from '../utils/actions'
import { formatEvents } from '../utils/utils'
import { firebaseConnect, isLoaded } from 'react-redux-firebase';
import { withRouter } from 'react-router-dom'

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
  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      events: []
    }
  }

  componentWillMount() {
    const { firestore } = this.context.store
    getUpcomingEvents(firestore, 10)
  }

  render() {
    var { upcomingEvents, spaces, eventTypes, history } = this.props
    console.log(upcomingEvents)

    return (
      <Container>
        <Row>
          <Col sm="12">
            <UncontrolledCarousel items={items} />
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            <Jumbotron className="pb-0 mb-0 h-100">
              <h1 style={{fontWeight: 300}}>About Us</h1>
              <p className="lead">The University Scholars Club (USC) is a community of students enrolled in the National University of Singapore (NUS) University Scholars Programme (USP), which is a multidisciplinary, partially residential academic programme for NUS undergraduates.</p>
              <p className="lead">
                <Button color="primary" onClick={() => history.push('/about')}>Learn More</Button>
              </p>
              <hr className="my-2" />
              <br />
                <h1 style={{fontWeight: 300}}>Upcoming Events</h1>
              <Container>
                <Row>
                  {
                    isLoaded(upcomingEvents) && isLoaded(eventTypes) ? upcomingEvents.length > 0 ? upcomingEvents.map((event)=>
                      <Col key={event.id} xs="12" md="6">
                        <Card>
                          <CardBody>
                            <h3 className="mb-0">{event.name + '    '}<FontAwesomeIcon className="align-middle" icon="circle" color={eventTypes[event.type].colour} size="xs" /></h3>
                            <h4 className="mb-0" style={{fontWeight: 300}}>{eventTypes[event.type].name}</h4>
                            <h4 className="mb-2" style={{fontWeight: 300}}>{event.startDate.format('Do MMMM - hh:mm a')}</h4>
                            <p className="lead">{ event.otherVenueSelected ? event.venue : spaces[event.venue].name  }</p>
                          </CardBody>
                        </Card>
                      </Col>
                    ) : <Col><h4>No Upcoming Events :( Stay tuned!</h4></Col> : <Col><h4><FontAwesomeIcon icon="spinner" spin /> Loading Events...</h4></Col>
                  }
                </Row>
              </Container>
              <br/>
              <p className="lead">
                <Button color="primary" onClick={() => history.push('/events')}>See More</Button>
              </p>
              <hr className="my-2" />
              <br/>
              <h6>{ footerText }</h6>
              <br/>
            </Jumbotron>
          </Col>
        </Row>
        <Row><Col><br/></Col></Row>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    upcomingEvents: formatEvents(state.firestore, 'upcomingEvents', true),
    eventTypes: state.firestore.data.eventTypes,
    spaces: state.firestore.data.spaces,
  }
}

export default withRouter(compose(
  firebaseConnect(),
  connect(mapStateToProps)
)(Home))
