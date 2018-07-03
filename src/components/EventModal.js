import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col } from 'reactstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { eventTimeDisplay } from '../utils/utils'
import { firebaseConnect } from 'react-redux-firebase';

class EventModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      poster: null,
    }

    if(props.event.poster) {
      props.firebase.storage().ref(props.event.poster).getDownloadURL().then((url) => {
        this.setState({
          poster: url,
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
    const { poster } = this.state
    const { isOpen, toggle, event, eventTypes, spaces } = this.props

    console.log(poster)

    return (
      <Modal isOpen={isOpen} toggle={toggle} className="w-75">
          <ModalBody>
            <h3 className="d-inline-block mb-0" style={{overflowWrap: 'break-word'}}>
              {event.name + '    '}
              <FontAwesomeIcon className="align-middle" icon="circle" color={eventTypes[event.type].colour} size="xs" />
            </h3>
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
                  <Col>
                    <img src={poster} className="img-fluid" alt="Poster" />
                  </Col>
                  : ''
                }
                {
                  event.regLink || event.description ?
                    <Col>
                      {
                        event.regLink ?
                        <p className="lead">{ event.regLink }</p>
                        : ''
                      }
                      {
                        event.description ?
                        <p className="lead">{ event.description }</p>
                        : ''
                      }
                    </Col>
                  : ''
                }
              </Row>
            </Container>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggle}>Done</Button>
          </ModalFooter>
        </Modal>
    )
  }
}
export default EventModal
