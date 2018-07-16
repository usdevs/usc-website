import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'reactstrap'
import UserReviewCard from './UserReviewCard'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { getUserModuleReviews } from '../../actions/ModulesActions'
import { withRouter } from 'react-router-dom'

class ManageReviews extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  componentWillMount() {
    const { auth } = this.props
    const { firestore } = this.context.store

    if(isLoaded(auth) && !isEmpty(auth)) {
      getUserModuleReviews(firestore, auth.uid)
    }
  }

  componentWillReceiveProps(nextProps) {
    const { firestore } = this.context.store
    const { auth } = this.props

    if(!isLoaded(auth) && isLoaded(nextProps.auth) && !isEmpty(nextProps.auth)) {
      getUserModuleReviews(firestore, nextProps.auth.uid)
    }
  }

  render() {
    const { firestore } = this.context.store
    const { userReviews } = this.props

    return(<Container className="mb-5 mt-5">
      <Row>
        <Col>
          <h1 style={{fontWeight: 300}}>Manage Your Reviews</h1>
        </Col>
      </Row>
      <Row>
        {
          userReviews ?
            userReviews.map((review) => <Col xs="12" md="6" key={review.id}><UserReviewCard moduleReview={review} firestore={firestore} /></Col>)
          : <Col><h4><FontAwesomeIcon icon="spinner" spin /> Loading Reviews...</h4></Col>
        }
      </Row>
    </Container>)
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    userReviews: state.firestore.ordered.userReviews
  }
}

export default withRouter(compose(
  firebaseConnect(),
  connect(mapStateToProps)
)(ManageReviews))
