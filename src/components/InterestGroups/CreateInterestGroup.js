import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'reactstrap'
import InterestGroupForm from './InterestGroupForm'
import { createInterestGroup } from '../../actions/GroupsActions'
import { firebaseConnect } from 'react-redux-firebase';
import { withRouter } from 'react-router-dom'

class CreateInterestGroup extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  createIG = (interestGroup, callback) => {
    const { firestore } = this.context.store
    const { firebase } = this.props

    createInterestGroup(firestore, firebase, interestGroup, () => callback(true))
  }

  render() {
    const { history } = this.props
    
    return (<Container>
      <Row>
        <Col>
          <div className="d-flex">
            <h1 className="display-3">Create Interest Group</h1>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <InterestGroupForm
            submit={this.createIG}
            btnText="Submit Application"
            modal={{
              title: 'Application Submitted!',
              body: 'Your application has been successfully submitted! You will be contacted in future regarding it!',
              primaryBtnText: 'To Dashboard',
              secondaryBtnText: 'Dismiss',
              onSubmit: () => history.push('/dashboard')
            }}/>
        </Col>
      </Row>
    </Container>)
  }
}

export default withRouter(compose(
  firebaseConnect()
)(CreateInterestGroup))
