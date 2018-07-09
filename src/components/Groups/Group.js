import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import EventCard from '../Events/EventCard'
import UserCard from '../Users/UserCard'
import { getGroup, getFile, getGroupEvents, getUserProfile } from '../../utils/actions'
import { formatEvents } from '../../utils/utils'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { withRouter } from 'react-router-dom'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';

class Group extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      igID: this.props.match.params.igID,
      logo: null,
    }
  }

  componentWillMount() {
    const { igID } = this.state
    const { history } = this.props
    const { firestore } = this.context.store

    getGroup(firestore, igID, (snapshot) => {
      if (!snapshot.exists) {
        history.push('/')
      } else {
        const group = snapshot.data()
        getUserProfile(firestore, group.leaderID, (snapshot) => {})
        this.setState({
          group: group
        })
      }
    })

    getGroupEvents(firestore, igID)
  }

  showInterestGroup = () => {
    const { logo, group } = this.state
    const { firebase, events, eventTypes, spaces, userProfile, auth } = this.props
    const { name, description, activities } = group

    const signedIn = isLoaded(auth) && !isEmpty(auth)

    if (!logo && group.logo) {
      getFile(firebase, group.logo, (url) => {
        this.setState({
          logo: url,
        })
      })
    }

    return <Col>
      <Container>
        <Row>
          {
            logo ?
            <Col xs="12" md="3" className="pr-0">
              <img src={logo} className="mb-0" alt="Avatar" />
            </Col>
            : ''
          }
          <Col xs="12" md={logo ? "9" : "12"}>
            <h2 style={{fontWeight: 300}}>{ name }</h2>
              <p className="lead" style={{whiteSpace: 'pre-line'}}>{ description }</p>
              <p style={{whiteSpace: 'pre-line'}}>{ activities }</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <hr className="my-2" />
            {
              userProfile ?
                <h3 className="mt-3">Group Head</h3>
              : ''
            }
          </Col>
        </Row>
        <Row className="mb-3">
            {
              userProfile ?
                <Col xs="12" md="4">
                  <div>
                    <UserCard user={userProfile} hideContact={!signedIn} />
                  </div>
                </Col>
              : ''
            }
        </Row>
        <Row>
          <Col>
            <h3>Our Events</h3>
          </Col>
        </Row>
        <Row>
            {
              events ?
                events.map((event) =>
                  <Col xs="12" md="6" key={event.id}>
                    <EventCard
                      event={event}
                      eventTypes={eventTypes}
                      spaces={spaces}
                      buttonText='See More'
                      firebase={firebase}
                      hasModal={true} />
                  </Col>)
              : <h4><FontAwesomeIcon icon="frown" /> There are currently no events for this Interest Group.</h4>
            }
        </Row>
      </Container>
    </Col>
  }

  render() {
    const { group } = this.state

    return(<Container>
      <Row className="mt-3 mb-3">
        {
          group ?
            this.showInterestGroup()
          : <h4><FontAwesomeIcon icon="spinner" spin /> Loading...</h4>
        }
      </Row>
    </Container>)
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    group: state.firestore.data.group,
    groupTypes: state.firestore.data.groupTypes,
    events: formatEvents(state.firestore, 'groupEvents', true),
    eventTypes: state.firestore.data.eventTypes,
    spaces: state.firestore.data.spaces,
    userProfile: state.firestore.data.userProfile
  }
}

export default withRouter(compose(
  firebaseConnect(),
  connect(mapStateToProps)
)(Group))
