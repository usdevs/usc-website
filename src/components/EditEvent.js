import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import {
  Container, Row, Col
} from 'reactstrap';
import moment from 'moment'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import EventForm from './EventForm'
import { getUserEvents } from '../utils/actions'
import { formatEvents } from '../utils/utils'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';

class EditEvent extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      eventID: this.props.match.params.eventID
    }
  }

  componentWillMount() {
    const { firestore } = this.context.store
    const { auth } = this.props

    if(isLoaded(auth) && !isEmpty(auth)) {
      console.log("test")
      getUserEvents(firestore, auth.uid)
    }
  }

  componentWillReceiveProps(nextProps) {
    const { firestore } = this.context.store
    const { auth, userEvents } = this.props
    const { filter } = this.state

    if(!isLoaded(auth) && isLoaded(nextProps.auth) && !isEmpty(nextProps.auth)) {
      getUserEvents(firestore, nextProps.auth.uid)
    }
  }

  render() {
    const { eventID } = this.state
    const { eventTypes, spaces, userEvents, firebase } = this.props

    return(
    <Container>
      <Row>
        <Col>
          <h1 className="display-3">Edit Event</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          {
            isLoaded(eventTypes) && isLoaded(spaces) && userEvents[eventID] ?
            <EventForm event={userEvents[eventID]} eventTypes={eventTypes} spaces={spaces} buttonOnSubmit={(event, callback) => this.createEvent(event, callback)} firebase={firebase} />
            : <h4><FontAwesomeIcon icon="spinner" spin /> Please wait...</h4>
          }
        </Col>
      </Row>
    </Container>)
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    userEvents: formatEvents(state.firestore, 'userEvents', false),
    eventTypes: state.firestore.ordered.eventTypes,
    spaces: state.firestore.ordered.spaces,
  }
}

export default compose(
  firebaseConnect(),
  connect(mapStateToProps)
)(EditEvent)
