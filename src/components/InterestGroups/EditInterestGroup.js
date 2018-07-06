import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import {
  Jumbotron, Button,
  Container, Row, Col,
  Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { updateInterestGroup, deleteGroup, getInterestGroup } from '../../utils/actions'
import { statusColor } from '../../resources/config'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import InterestGroupForm from './InterestGroupForm'
import { withRouter } from 'react-router-dom'
import _ from 'lodash'

class EditInterestGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      successModal: false,
      deleteModal: false,
      igID: this.props.match.params.igID
    }
  }

  componentWillMount() {
    const { igID } = this.state
    const { history } = this.props
    const { firestore } = this.context.store

    getInterestGroup(firestore, igID, (snapshot) => {
      if (!snapshot.exists) {
        history.push('/manageinterestgroups')
      }
    })
  }

  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  toggle = (type) => {
    switch(type) {
      case 'success':
        this.setState({
          successModal: !this.state.successModal
        });
        break
      case 'delete':
        this.setState({
          deleteModal: !this.state.deleteModal
        });
        break
      default:
        break
    }
  }

  successModal = () => {
    const { modal } = this.state
    const { history } = this.props

    return(<Modal isOpen={modal} toggle={this.toggle}>
      <ModalBody>
        <h3 style={{fontWeight: 300}}>Application Submitted</h3>
        <p>Your application has been successfully submitted! You will be contacted in future regarding it!</p>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={() => history.push('/dashboard')}>Dashboard</Button>{' '}
        <Button color="secondary" onClick={() => {
          this.toggle()
        }}>Dismiss</Button>
      </ModalFooter>
    </Modal>)
  }

  submitIG = (interestGroup, callback, optionalCallback) => {
    const { firestore } = this.context.store
    const { firebase } = this.props

    updateInterestGroup(firestore, firebase, interestGroup, (ig) => {
      this.toggle('success')
      optionalCallback(ig)
    })
  }

  deleteGroup = (interestGroup, callback) => {
    const { firebase } = this.props
    const { firestore } = this.context.store
    const { igID } = this.props.match.params

    deleteGroup(firestore, firebase, {
      ...interestGroup,
      id: igID
    }, callback)
  }

  successModal = () => {
    const { successModal } = this.state
    const { history } = this.props

    return(<Modal isOpen={successModal} toggle={() => this.toggle('success')}>
      <ModalBody>
        <h3 style={{fontWeight: 300}}>Interest Group Updated!</h3>
        <p>Your Interest Group has been successfully updated!</p>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={() => history.push('/manageinterestgroups')}>Manage Interest Groups</Button>{' '}
        <Button color="secondary" onClick={() => {
          this.toggle('success')
        }}>Dismiss</Button>
      </ModalFooter>
    </Modal>)
  }

  deleteModal = () => {
    const { deleteModal, eventID } = this.state
    const { history, interestGroup } = this.props

    return(<Modal isOpen={deleteModal} toggle={() => this.toggle('delete')}>
      <ModalBody>
        <h3 style={{fontWeight: 300}}>Do You Want To Delete?</h3>
        <p>Please confirm that you would like to delete this Interest Group?</p>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={() => {
          this.toggle('delete')
        }}>Cancel</Button>
        <Button color="danger" onClick={() => this.deleteGroup(interestGroup, () => history.push('/manageinterestgroups'))}><FontAwesomeIcon icon="trash-alt" />{' '} Confirm Deletion</Button>{' '}
      </ModalFooter>
    </Modal>)
  }

  render() {
    const { firestore } = this.context.store
    const { auth, userProfiles, igTypes, igTypesUnordered, history, interestGroup, firebase } = this.props
    const { igID } = this.props.match.params

    return (
    <Container>
      { this.successModal() }
      { this.deleteModal() }
      <Row>
        <Col>
          <div className="d-flex">
            <div className="p-2"><h1 className="display-3">Edit Interest Group</h1></div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          { isLoaded(auth) && isLoaded(igTypes) && interestGroup ?
            <div>
              <div className={"d-flex justify-content-center" }>
                <h3 className={"p-2 align-middle border rounded border-" + statusColor[interestGroup.status] +"  text-" + statusColor[interestGroup.status]}>Status: {_.capitalize(interestGroup.status)}</h3>
              </div>
              <InterestGroupForm
                firestore={firestore}
                firebase={firebase}
                auth={auth}
                interestGroup={{
                  ...interestGroup,
                  id: igID
                }}
                userProfiles={userProfiles}
                buttonOnSubmit={(interestGroup, callback, optionalCallback) => this.submitIG(interestGroup, callback, optionalCallback)}
                igTypes={igTypes}
                igTypesUnordered={igTypesUnordered} />
              <div className="d-flex justify-content-center">
                <Button className="w-75" color="danger" onClick={() => this.toggle('delete')} block disabled={!window.gapi.client}>
                  { !window.gapi.client ? <FontAwesomeIcon icon="spinner" spin /> : '' } <FontAwesomeIcon icon="trash-alt" />{' '}Delete Interest Group
                </Button>
              </div>
              <div className="d-flex justify-content-center">
                <Button className="w-75 mt-3" color="secondary" onClick={() => history.push('/manageinterestgroups')} outline block>
                  Back to Manage Interest Groups
                </Button>
              </div>
            </div>
            : <p><FontAwesomeIcon icon="spinner" spin /> Please wait...</p>}
        </Col>
      </Row>
    </Container>)
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    userProfiles: state.firestore.data.userProfiles,
    myProfile: state.firestore.data.myProfile,
    interestGroup: state.firestore.data.interestGroup,
    igTypes: state.firestore.ordered.igTypes,
    igTypesUnordered: state.firestore.data.igTypes
  }
}

export default withRouter(compose(
  firebaseConnect(),
  connect(mapStateToProps)
)(EditInterestGroup))
