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
import { createInterestGroup, getInterestGroupTypes } from '../../utils/actions'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import InterestGroupForm from './InterestGroupForm'
import { withRouter } from 'react-router-dom'

class EditInterestGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false
    }
  }

  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  componentWillMount() {
    const { firestore } = this.context.store
    getInterestGroupTypes(firestore)
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
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

  submitIG = (interestGroup, callback) => {
    const { firestore } = this.context.store
    const { firebase } = this.props

    createInterestGroup(firestore, firebase, interestGroup, () => {
      this.toggle()
      callback()
    })
  }

  render() {
    const { firestore } = this.context.store
    const { auth, userProfiles, igTypes, igTypesUnordered } = this.props

    return (
    <Container>
      { this.successModal() }
      <Row>
        <Col>
          <div className="d-flex">
            <div className="p-2"><h1 className="display-3">Create Interest Group</h1></div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <Jumbotron>
            <h3>Why Create an Interest Group?</h3>
            <p>Lorem Ipsum</p>
          </Jumbotron>
        </Col>
      </Row>
      <Row>
        <Col>
          { isLoaded(auth) && isLoaded(igTypes) ?
            <InterestGroupForm
              firestore={firestore}
              auth={auth}
              userProfiles={userProfiles}
              buttonOnSubmit={(interestGroup, callback) => this.submitIG(interestGroup, callback)}
              igTypes={igTypes}
              igTypesUnordered={igTypesUnordered} />
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
    igTypes: state.firestore.ordered.igTypes,
    igTypesUnordered: state.firestore.data.igTypes
  }
}

export default withRouter(compose(
  firebaseConnect(),
  connect(mapStateToProps)
)(EditInterestGroup))
