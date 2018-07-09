import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, ModalBody, ModalFooter, Container, Row, Col } from 'reactstrap';
import { getFile } from '../../utils/actions'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase';
import { getGroup } from '../../utils/actions'
import GroupCard from '../Groups/GroupCard'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

class EventModal extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      poster: null,
    }

    if(props.event.poster) {
      getFile(props.firebase, props.event.poster, (url) => {
        this.setState({
          poster: url,
        })
      })
    }
  }

  componentDidMount() {
    const { firestore } = this.context.store
    const { event } = this.props

    if(event.organisedBy) {
      getGroup(firestore, event.organisedBy, (snapshot) => {
        this.setState({
          group: {
            ...snapshot.data(),
            id: event.organisedBy
          }
        })
      })
    }
  }

  dateDisplay = () => {
    const { event } = this.props

    if (!event.multiDay) {
      return (event.startDate.format('Do MMMM hh:mm a') + ' - ' + event.endDate.format('hh:mm a'))
    } else {
      return (event.original.startDate.format('Do MMMM hh:mm a') + ' - ' + event.original.endDate.format('Do MMMM hh:mm a'))
    }
  }

  render() {
    const { firestore } = this.context.store
    const { poster, group } = this.state
    const { isOpen, toggle, event, eventTypes, spaces, groupTypes, firebase } = this.props

    return (
      <Modal isOpen={isOpen} toggle={toggle} className="w-75">
          <ModalBody>
            <h3 className="d-inline-block mb-0" style={{overflowWrap: 'break-word'}}>
              {event.name + '    '}
              <FontAwesomeIcon className="align-middle" icon="circle" color={eventTypes[event.type].colour} size="xs" />
            </h3>
            <h5 className="mb-1 text-muted">{eventTypes[event.type].name}</h5>
            <h4 className="mb-0" style={{fontWeight: 300}}>
            { this.dateDisplay() }
            </h4>
            <h4 style={{fontWeight: 300}}>
            {
               'at ' + (!event.otherVenueSelected ? spaces[event.venue].name : event.venue)
            }
            </h4>
            <Container>
              <Row>
                {
                  poster ?
                  <Col xs="12" md="6">
                    <img src={poster} className="img-fluid" alt="Poster" />
                  </Col>
                  : ''
                }
                {
                  event.regLink || event.description ?
                    <Col xs="12" md="6">
                      {
                        event.regLink ?
                        <p className="lead mb-2">Register <a href={ event.regLink }>here</a></p>
                        : ''
                      }
                      {
                        event.description ?
                        <p>{ event.description }</p>
                        : ''
                      }
                    </Col>
                  : ''
                }
              </Row>
            </Container>
            {
              event.organisedBy && group && groupTypes ?
                <GroupCard
                  firebase={firebase}
                  firestore={firestore}
                  group={group}
                  groupTypes={groupTypes}
                />
              : ''
            }
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggle}>Done</Button>
          </ModalFooter>
        </Modal>
    )
  }
}

const mapStateToProps = state => {
  return {
    group: state.firestore.data.group,
    groupTypes: state.firestore.data.groupTypes
  }
}

export default compose(
  firebaseConnect(),
  connect(mapStateToProps)
)(EventModal)
