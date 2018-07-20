import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux';
import { Container, Row, Col, Button, Badge } from 'reactstrap';
import EventCard from '../Events/EventCard'
import UserCard from '../Users/UserCard'
import { getGroup } from '../../actions/GroupsActions'
import { getGroupEvents } from '../../actions/EventsActions'
import { getFile } from '../../actions/FilesActions'
import { getUserProfile } from '../../actions/UsersActions'
import { formatEvents, formatFirestoreData } from '../../utils/utils'
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
      groupID: this.props.match.params.groupID,
      logo: null,
      userProfile: null,
    }
  }

  componentDidMount() {
    const { groupID } = this.state
    const { history, groups } = this.props
    const { firestore } = this.context.store

    if(groups.isLoaded && !groups.data[groupID]) {
      history.push('/')
    } else if (groups.isLoaded && groups.data[groupID]) {
      const group = {
        ...groups.data[groupID],
        id: groupID
      }

      this.setState({
        group: group
      })

      getUserProfile(firestore, group.leaderID, (snapshot) => {
        const leaderProfile = snapshot.data()
        this.setState({
          userProfile: {
            ...leaderProfile,
            id: group.leaderID
          }
        })
      })
    } else {
      getGroup(firestore, groupID, (snapshot) => {
        if (!snapshot.exists) {
          history.push('/')
        } else {
          const group = snapshot.data()
          this.setState({
            group: {
              ...group,
              id: groupID
            }
          })

          getUserProfile(firestore, group.leaderID, (snapshot) => {
            const leaderProfile = snapshot.data()
            this.setState({
              userProfile: {
                ...leaderProfile,
                id: group.leaderID
              }
            })
          })
        }
      })
    }

    getGroupEvents(firestore, groupID)
  }

  showInterestGroup = () => {
    const { logo, group, userProfile } = this.state
    const { firebase, events, eventTypes, spaces, auth, groups, groupTypes } = this.props
    const { name, description, activities, chat } = group

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
              { activities ? <p style={{whiteSpace: 'pre-line'}}>{ activities }</p> : ''}
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
            <Col xs="12" md={{size: 4, offset: 4}}>
              <div className="d-flex align-items-center justify-content-end">
                <div>
                  { chat ? <Button outline color="primary" className="mb-1" href={chat} disabled={!signedIn}><FontAwesomeIcon icon="comments" /> { ' ' }Join Chat Group</Button> : ''}
                  <br/>
                  {
                    /*
                    <div className="d-flex justify-content-end">
                      <Button outline color="primary" className="mt-1" disabled={!signedIn}><FontAwesomeIcon icon="sign-in-alt" />{ ' ' }Join IG</Button>
                    </div>
                    */
                  }
                  { !signedIn && chat
                    ? <div>
                        <Badge color="danger">Please Sign In</Badge>
                      </div>
                    : ''
                  }
                </div>
              </div>
            </Col>
        </Row>
        {
          events && events.length > 0 ?
            <Row>
              <Col xs="12">
                <h3>Our Events</h3>
              </Col>
              {
                events.map((event) =>
                  <Col xs="12" md="6" key={event.id}>
                    <EventCard
                      event={event}
                      eventTypes={eventTypes}
                      spaces={spaces}
                      groups={groups}
                      groupTypes={groupTypes}
                      buttonText='See More'
                      firebase={firebase}
                      hasModal={true} />
                  </Col>)
              }
            </Row>
          : ''
        }
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
    groups: formatFirestoreData(state.firestore, 'groups'),
    groupTypes: formatFirestoreData(state.firestore, 'groupTypes'),
    events: formatEvents(state.firestore, 'groupEvents', true),
    eventTypes: formatFirestoreData(state.firestore, 'eventTypes'),
    spaces: formatFirestoreData(state.firestore, 'spaces'),
    userProfile: state.firestore.data.userProfile
  }
}

export default withRouter(compose(
  firebaseConnect(),
  connect(mapStateToProps)
)(Group))
