import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import {
  Jumbotron, Button,
  Container, Row, Col,
  Modal, ModalHeader, ModalBody, ModalFooter,
  Form, FormGroup, Label, Input, FormFeedback,
  InputGroupAddon, InputGroup,
  TabContent, TabPane, Nav, NavItem, NavLink,
  Card, CardTitle, CardText
} from 'reactstrap';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { getModules, addReview } from '../../utils/actions'
import { withRouter } from 'react-router-dom'
import ReviewForm from './ReviewForm'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import _ from 'lodash'

class AddReview extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
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
      console.log('success')
      callback()
    })
  }

  render() {
    const { firestore } = this.context.store
    const { modules, moduleTypes } = this.props

    return(<Container>
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
