import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { firebaseConnect } from 'react-redux-firebase';
import { Container, Row, Col } from 'reactstrap';
import FeedbackForm from './FeedbackForm'
import { submitFeedback } from '../../actions/GeneralActions'

class Feedback extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  submitFeedback = (feedback, callback) => {
    const { firestore } = this.context.store

    submitFeedback(firestore, feedback, (snapshot) => {
      callback(true)
    })
  }

  render() {
    const { history } = this.props

    return(
      <Container>
        <Row>
          <Col>
            <h1 style={{fontWeight: 300}} className="mt-3">Feedback</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <FeedbackForm
              initialValues = {{ type: 'site' }}
              btnText = "Submit Feedback"
              submit={this.submitFeedback}
              modal={{
                  title: 'Feedback Submitted!',
                  body: 'The site administrator appreciates your feedback!',
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
)(Feedback))
