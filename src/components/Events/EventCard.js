import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import { Button, Card, CardText, Container, Row, Col } from 'reactstrap'
import EventModal from './EventModal'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { getFile } from '../../actions/FilesActions'
import { getUserProfile } from '../../actions/UsersActions'
import { config } from '../../resources/config'
import _ from 'lodash'

class EventCard extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  mounted = false
  modal = null

  constructor(props) {
    super(props)

    this.state = {
      poster: null,
      userProfile: null
    }
  }

  componentDidMount() {
    this.mounted = true

    const { firestore } = this.context.store
    const { event } = this.props
    const { poster } = event

    if (poster) {
      this.loadPoster(poster)
    }

    getUserProfile(firestore, event.creator, snapshot => {
      const leaderProfile = snapshot.data()
      this.setState({
        userProfile: {
          ...leaderProfile
        }
      })
    })
  }

  componentWillUnmount() {
    this.mounted = false
  }

  componentWillReceiveProps(newProps) {
    if (this.props.event.poster !== newProps.event.poster) {
      this.loadPoster(newProps.event.poster)
    }
  }

  loadPoster = poster => {
    const { firebase } = this.props

    if (poster) {
      getFile(firebase, poster, url => {
        if (this.mounted) {
          this.setState({
            poster: url
          })
        }
      })
    }
  }

  render() {
    const { firestore } = this.context.store
    const { poster, fullDescription, userProfile } = this.state
    const {
      event,
      eventTypes,
      spaces,
      zones,
      buttonAction,
      buttonText,
      groups,
      groupTypes,
      hasModal,
      firebase
    } = this.props

    return (
      <Card body>
        <Container className="m-0 p-0">
          <Row>
            {poster ? (
              <Col xs="12" md="4">
                <img src={poster} className="img-fluid" alt="Poster" />
              </Col>
            ) : (
              ''
            )}
            <Col xs="12" md={poster ? '8' : '12'}>
              <div className="d-flex flex-wrap">
                <div className="align-self-center mr-2">
                  <h3 className="mb-0">{event.name + '    '}</h3>
                </div>
                <div className="align-self-center mr-1">
                  <FontAwesomeIcon
                    className="align-middle"
                    icon="circle"
                    color={eventTypes.data[event.type].colour}
                  />
                </div>
                <div className="align-self-center">
                  <h4 className="mb-0" style={{ fontWeight: 300 }}>
                    {eventTypes.data[event.type].name}
                  </h4>
                </div>
              </div>
              <h4 className="mb-0" style={{ fontWeight: 300 }}>
                {event.startDate.format('Do MMMM - hh:mm a')}
              </h4>
              <h4 className="mb-0" style={{ fontWeight: 300 }}>
                {'at ' +
                  (event.otherVenue
                    ? event.venue
                    : spaces.data[event.venue].name)
                  + ' for '
                  + (event.zoneName === undefined ? "All Zones" : event.zoneName)
                }
              </h4>
              {userProfile ? <h4 className="mb-0" style={{ fontWeight: 300 }}>Booked by: {userProfile.displayName}</h4> : ''}
              {event.description ? (
                <p>
                  {fullDescription
                    ? event.description
                    : _.truncate(event.description, {
                        length: config.descriptionPreviewLength
                      })}
                  <Button
                    onClick={() =>
                      this.setState({ fullDescription: !fullDescription })
                    }
                    className="d-inline m-0 p-0"
                    color="link"
                  >
                    {fullDescription ? 'See Less' : 'See More'}
                  </Button>
                </p>
              ) : (
                ''
              )}
              <CardText>
                <Button
                  outline
                  className="mb-1"
                  color="primary"
                  onClick={
                    buttonAction ? buttonAction : () => this.modal.toggle()
                  }
                >
                  {buttonText}
                </Button>
              </CardText>
              {hasModal ? (
                <EventModal
                  key={event.id}
                  ref={element => {
                    this.modal = element
                  }}
                  firebase={firebase}
                  firestore={firestore}
                  event={event}
                  eventTypes={eventTypes}
                  spaces={spaces}
                  zones={zones}
                  groups={groups}
                  groupTypes={groupTypes}
                  userProfile={userProfile}
                />
              ) : (
                ''
              )}
            </Col>
          </Row>
        </Container>
      </Card>
    )
  }
}

const mapStateToProps = state => {
  return {
    userProfile: state.firestore.data.userProfile
  }
}

// export default compose(firebaseConnect())(EventCard)
export default compose(firebaseConnect(), connect(mapStateToProps))(EventCard)
