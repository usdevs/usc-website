import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import {
  Container, Row, Col,
  Button, Modal, ModalBody, ModalFooter
} from 'reactstrap';
import { firebaseConnect } from 'react-redux-firebase';
import { getModules, addReview } from '../../actions/ModulesActions'
import { withRouter } from 'react-router-dom'
import ReviewForm from './ReviewForm'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

class AddReview extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      modal: false
    }
  }

  componentWillMount() {
    const { firestore } = this.context.store

    getModules(firestore)
  }

  addReview = (review, callback) => {
    const { firestore } = this.context.store
    const { auth } = this.props

    addReview(firestore, {
      ...review,
      creator: auth.uid
    }, () => {
      this.toggle()
      callback()
    })
  }

  successModal = () => {
    const { modal } = this.state
    const { history } = this.props

    return(<Modal isOpen={modal} toggle={this.toggle}>
      <ModalBody>
        <h3 style={{fontWeight: 300}}>Review Submitted!</h3>
        <p>Your review has been submitted!</p>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={() => history.push('/modules/')}>To Modules</Button>{' '}
        <Button color="secondary" onClick={() => {
          this.toggle()
        }}>Dismiss</Button>
      </ModalFooter>
    </Modal>)
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    const { modules, moduleTypes } = this.props

    return(<Container>
      { this.successModal() }
      <Row>
        <Col>
          <h1 style={{fontWeight: 300}}>Add Review</h1>
        </Col>
      </Row>
      <Row>
        {
          modules && moduleTypes ?
            <Col>
              <ReviewForm buttonText="Submit Review" buttonOnSubmit={this.addReview} modules={modules} />
            </Col>
          : <h3 className="mt-2"><FontAwesomeIcon icon="spinner" spin /> Loading Review...</h3>
        }
      </Row>
    </Container>)
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    modules: state.firestore.ordered.modules,
    moduleTypes: state.firestore.data.moduleTypes
  }
}

export default withRouter(compose(
  firebaseConnect(),
  connect(mapStateToProps)
)(AddReview))
