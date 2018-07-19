import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { firebaseConnect } from 'react-redux-firebase';
import { Container, Row, Col } from 'reactstrap';
import IntlProgReviewForm from './IntlProgReviewForm'
import { submitIntlProgReview } from '../../actions/IntlProgsActions'

class CreateIntlProgReview extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  submitFeedback = (review, callback) => {
    const { firestore } = this.context.store

    submitIntlProgReview(firestore, review, (snapshot) => {
      callback(true)
    })
  }

  render() {
    const { history } = this.props

    return(
      <Container>
        <Row>
          <Col>
            <h1 style={{fontWeight: 300}} className="mt-3">Review International Programme</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <IntlProgReviewForm
              btnText = "Submit REview"
              submit={this.submitFeedback}
              modal={{
                  title: 'Review Received!',
                  body: 'It will be displayed together with the International Programme!',
                  primaryBtnText: 'Dashboard',
                  secondaryBtnText: 'Dismiss',
                  onSubmit: () => history.push('/dashboard')
                }}
            />
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  }
}

export default withRouter(compose(
  firebaseConnect(),
  connect(mapStateToProps)
)(CreateIntlProgReview))
