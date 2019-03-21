import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { Container, Row, Col } from 'reactstrap'
import CircleForm from './CircleForm'
import { createGroup } from '../../actions/GroupsActions'
import { firebaseConnect } from 'react-redux-firebase';
import { withRouter } from 'react-router-dom'

class CreateGroup extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  createGroup = (group, callback) => {
    const { firestore } = this.context.store
    const { firebase } = this.props

    createGroup(firestore, firebase, group, () => callback(true))
  }

  render() {
    const { history } = this.props

    return (<Container>
      <Row>
        <Col>
          <div className="d-flex">
            <h1 className="display-3">Create Circle</h1>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <CircleForm
            submit={this.createGroup}
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
)(CreateGroup))
