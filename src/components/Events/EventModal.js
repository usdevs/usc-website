import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, ModalBody, ModalFooter, Container, Row, Col } from 'reactstrap';
import { getFile } from '../../actions/FilesActions'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase';
import { getGroup, getGroups } from '../../actions/GroupsActions'
import { formatFirestoreData } from '../../utils/utils'
import GroupCard from '../Groups/GroupCard'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

class EventModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false,
      poster: null
    }
  }

  toggle = () => {
    const { isOpen } = this.state

    this.setState({
      isOpen: !isOpen
    })
  }

  componentDidMount() {
    const { event, firebase, groups } = this.props

    this.mounted = true

    if(event.poster) {
      getFile(firebase, event.poster, (url) => {
        if(this.mounted) {
          this.setState({
            poster: url,
          })
        }
      })
    }
  }

  componentWillUnmount() {
    this.mounted = false
  }

  dateDisplay = () => {
    const { event } = this.props

    if (event.startDate.isSame(event.endDate, 'day')) {
      return (event.startDate.format('Do MMMM hh:mm a') + ' - ' + event.endDate.format('hh:mm a'))
    } else {
      return (event.original.startDate.format('Do MMMM hh:mm a') + ' - ' + event.original.endDate.format('Do MMMM hh:mm a'))
    }
  }

  render() {
    const { poster, isOpen } = this.state
    const { event, eventTypes, spaces, group, groups, groupTypes, firebase, firestore } = this.props

    return (
      <Modal isOpen={isOpen} toggle={this.toggle} className="w-75">
          <ModalBody>
            <h3 className="d-inline-block mb-0" style={{overflowWrap: 'break-word'}}>
              {event.name + '    '}
              <FontAwesomeIcon className="align-middle" icon="circle" color={eventTypes.data[event.type].colour} size="xs" />
            </h3>
            <h5 className="mb-1 text-muted">{eventTypes.data[event.type].name}</h5>
            <h4 className="mb-0" style={{fontWeight: 300}}>
            { this.dateDisplay() }
            </h4>
            <h4 style={{fontWeight: 300}}>
            {
               'at ' + (!event.otherVenue ? spaces.data[event.venue].name : event.venue)
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
                        <p style={{whiteSpace: 'pre-line'}}>{ event.description }</p>
                        : ''
                      }
                    </Col>
                  : ''
                }
              </Row>
            </Container>
            {
              event.organisedBy && groups.isLoaded && groupTypes.isLoaded ?
                <GroupCard
                  firebase={firebase}
                  firestore={firestore}
                  group={{
                    ...groups.data[event.organisedBy],
                    id: event.organisedBy
                  }}
                  groupTypes={groupTypes}
                />
              : ''
            }
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Done</Button>
          </ModalFooter>
        </Modal>
    )
  }
}
export default EventModal
